import express from 'express'
import { body, validationResult } from 'express-validator'
import Subscriber from '../models/Subscriber.js'

const router = express.Router()

// POST /api/newsletter/subscribe
router.post('/subscribe', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

  const { email, name } = req.body
  try {
    const existing = await Subscriber.findOne({ email })
    if (existing) {
      if (!existing.active) {
        existing.active = true
        existing.unsubscribedAt = null
        await existing.save()
        return res.json({ success: true, message: 'Welcome back! You\'ve been re-subscribed.' })
      }
      return res.json({ success: true, message: 'You\'re already subscribed. Thank you!' })
    }
    await Subscriber.create({ email, name, source: 'website' })
    res.status(201).json({ success: true, message: 'Subscribed successfully! Thank you for joining our community.' })
  } catch (err) {
    res.status(500).json({ message: 'Subscription failed. Please try again.' })
  }
})

// POST /api/newsletter/unsubscribe
router.post('/unsubscribe', [
  body('email').isEmail().normalizeEmail(),
], async (req, res) => {
  await Subscriber.findOneAndUpdate(
    { email: req.body.email },
    { active: false, unsubscribedAt: new Date() }
  )
  res.json({ success: true, message: 'You have been unsubscribed.' })
})

export default router
