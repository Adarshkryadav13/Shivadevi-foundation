import express from 'express'
import { body, validationResult } from 'express-validator'
import rateLimit from 'express-rate-limit'
import Contact from '../models/Contact.js'
import { sendContactNotification, sendContactAutoReply } from '../config/email.js'

const router = express.Router()

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many messages sent. Please try again in an hour.' },
})

const validation = [
  body('firstName').notEmpty().trim().escape().withMessage('First name required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('message').notEmpty().trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10–2000 characters'),
]

// POST /api/contact
router.post('', contactLimiter, validation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

  const { firstName, lastName, email, phone, interest, message } = req.body

  try {
    const contact = await Contact.create({
      firstName, lastName, email, phone, interest, message,
      ipAddress: req.ip,
    })

    // Fire-and-forget emails
    sendContactNotification({ firstName, email, interest, message })
      .catch(err => console.error('Admin email failed:', err.message))
    sendContactAutoReply({ to: email, firstName })
      .catch(err => console.error('Auto-reply failed:', err.message))

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We\'ll respond within 24 hours.',
      id: contact._id,
    })
  } catch (err) {
    console.error('Contact save error:', err)
    res.status(500).json({ message: 'Failed to send message. Please email us directly.' })
  }
})
//update
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("PATCH ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});
// ✅ DELETE contact
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router
