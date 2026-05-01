import express from 'express'
import { body, validationResult } from 'express-validator'
import Volunteer from '../models/Volunteer.js'

const router = express.Router()

// POST /api/volunteers
router.post('/', [
  body('name').notEmpty().trim().withMessage('Name required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

  try {
    const existing = await Volunteer.findOne({ email: req.body.email })
    if (existing) return res.status(409).json({ message: 'You\'re already registered as a volunteer!' })

    const volunteer = await Volunteer.create(req.body)
    res.status(201).json({ success: true, message: 'Thank you for volunteering! We\'ll be in touch soon.', id: volunteer._id })
  } catch (err) {
    res.status(500).json({ message: 'Registration failed. Please try again.' })
  }
})

export default router
