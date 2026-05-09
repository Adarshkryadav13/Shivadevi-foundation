// 
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import Donation from '../models/Donation.js'
import Contact from '../models/Contact.js'
import Volunteer from '../models/Volunteer.js'
import Subscriber from '../models/Subscriber.js'
import Post from '../models/Post.js'
import Program from '../models/Program.js'
import UpcomingEvent from '../models/UpcomingEvent.js'
import upload from "../middleware/upload.js";

const router = express.Router()
const buildSlug = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
const normalizePost = (postDoc) => {
  const post = postDoc.toObject ? postDoc.toObject() : postDoc
  const images = Array.isArray(post.images)
    ? post.images
    : post.images
    ? [post.images]
    : post.image
    ? [post.image]
    : []

  return {
    ...post,
    images,
    image: post.image || images[0] || '',
  }
}

// ================= AUTH MIDDLEWARE =================
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

// ================= LOGIN =================
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'shivadevifoundation@gmail.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Shivadevi@2020!'

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { email, role: 'admin' },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '7d' }
  )

  res.json({ token, email, role: 'admin' })
})

// ================= DASHBOARD =================
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const [
      donationStats,
      recentDonations,
      newContacts,
      volunteers,
      subscribers,
      postCount,
      programCount
    ] = await Promise.all([
      Donation.aggregate([
        { $match: { status: 'completed' } },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' },
            count: { $sum: 1 },
            avgAmount: { $avg: '$amount' }
          }
        },
      ]),
      Donation.find({ status: 'completed' }).sort({ createdAt: -1 }).limit(10).lean(),
      Contact.countDocuments({ status: 'new' }),
      Volunteer.countDocuments({ status: 'pending' }),
      Subscriber.countDocuments({ active: true }),
      Post.countDocuments(),
      Program.countDocuments()
    ])

    res.json({
      donations: {
        totalRaised: donationStats[0]?.total || 0,
        totalCount: donationStats[0]?.count || 0,
        avgAmount: Math.round(donationStats[0]?.avgAmount || 0),
        recent: recentDonations,
      },
      contacts: { newCount: newContacts },
      volunteers: { pendingCount: volunteers },
      newsletter: { subscriberCount: subscribers },
      posts: { count: postCount },
      programs: { count: programCount }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load dashboard data' })
  }
})


// ================= POSTS =================

// ✅ GET all posts (FIXED)
router.get('/posts', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts.map(normalizePost));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// ✅ CREATE post (ONLY ONE ROUTE)

router.post(
  '/posts',
  authMiddleware,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "pdf", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, category } = req.body;
      const files = req.files || {};
      const slug = buildSlug(title || `post-${Date.now()}`)

      const images = files.images
        ? files.images.map((file) => `/uploads/${file.filename}`)
        : [];

      const pdf = files.pdf
        ? `/uploads/${files.pdf[0].filename}`
        : "";

      const post = await Post.create({
        title,
        category,
        slug,
        images,
        pdf,
      });

      res.json(post);

    } catch (err) {
      console.error("ERROR:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

// UPDATE post
router.put('/posts/:id', authMiddleware, async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
});

// DELETE post
router.delete('/posts/:id', authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ================= PROGRAMS =================

// GET all programs
router.get('/programs', authMiddleware, async (req, res) => {
  const programs = await Program.find().sort({ createdAt: -1 })
  res.json(programs)
})

// CREATE program
router.post('/programs', authMiddleware, async (req, res) => {
  const program = await Program.create(req.body)
  res.json(program)
})

// UPDATE program
router.put('/programs/:id', authMiddleware, async (req, res) => {
  const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(program)
})

// DELETE program
router.delete('/programs/:id', authMiddleware, async (req, res) => {
  await Program.findByIdAndDelete(req.params.id)
  res.json({ message: 'Program deleted' })
})


// ================= EXISTING ROUTES =================

// Donations
router.get('/donations', authMiddleware, async (req, res) => {
  const { page = 1, limit = 20 } = req.query

  const [donations, total] = await Promise.all([
    Donation.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(+limit),
    Donation.countDocuments()
  ])

  res.json({ donations, total })
})

// Contacts
router.get('/contacts', authMiddleware, async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 })
  res.json(contacts)
})

// Volunteers
router.get('/volunteers', authMiddleware, async (req, res) => {
  const volunteers = await Volunteer.find().sort({ createdAt: -1 })
  res.json(volunteers)
})

// Subscribers
router.get('/subscribers', authMiddleware, async (req, res) => {
  const subscribers = await Subscriber.find().sort({ createdAt: -1 })
  res.json(subscribers)
})
// ================= EVENTS =================
router.get('/events', authMiddleware, async (req, res) => {
  try {
    const events = await UpcomingEvent.find().sort({ startDate: 1, createdAt: -1 })
    res.json(events)
  } catch (err) {
    console.error('EVENT FETCH ERROR:', err)
    res.status(500).json({ error: 'Failed to fetch events' })
  }
})

router.post(
  '/events',
  authMiddleware,
  upload.array('images', 10),
  async (req, res) => {
    try {
      const images = req.files?.map((file) => `/uploads/${file.filename}`) || []

      const event = await UpcomingEvent.create({
        title: req.body.title,
        description: req.body.description || '',
        startDate: req.body.startDate || req.body.date,
        endDate: req.body.endDate || null,
        date: req.body.startDate || req.body.date,
        time: req.body.time || '',
        location: req.body.location || '',
        category: req.body.category || '',
        images,
      })

      res.json(event)
    } catch (err) {
      console.error('EVENT CREATE ERROR:', err)
      res.status(500).json({ message: err.message })
    }
  }
)

router.put(
  '/events/:id',
  authMiddleware,
  upload.array('images', 10),
  async (req, res) => {
    try {
      const existing = await UpcomingEvent.findById(req.params.id)
      if (!existing) return res.status(404).json({ message: 'Event not found' })

      const nextImages = req.files?.length
        ? req.files.map((file) => `/uploads/${file.filename}`)
        : existing.images

      const updated = await UpcomingEvent.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title ?? existing.title,
          description: req.body.description ?? existing.description,
          startDate: req.body.startDate ?? req.body.date ?? existing.startDate ?? existing.date,
          endDate: req.body.endDate ?? existing.endDate ?? null,
          date: req.body.startDate ?? req.body.date ?? existing.startDate ?? existing.date,
          time: req.body.time ?? existing.time,
          location: req.body.location ?? existing.location,
          category: req.body.category ?? existing.category,
          images: nextImages,
        },
        { new: true }
      )

      res.json(updated)
    } catch (err) {
      console.error('EVENT UPDATE ERROR:', err)
      res.status(500).json({ message: err.message })
    }
  }
)

router.delete('/events/:id', authMiddleware, async (req, res) => {
  try {
    await UpcomingEvent.findByIdAndDelete(req.params.id)
    res.json({ message: 'Event deleted' })
  } catch (err) {
    console.error('EVENT DELETE ERROR:', err)
    res.status(500).json({ message: err.message })
  }
})

export default router

