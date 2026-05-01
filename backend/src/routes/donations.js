import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import { body, validationResult } from 'express-validator'
import Donation from '../models/Donation.js'
import { sendDonationReceipt } from '../config/email.js'

const router = express.Router()

// Initialize Razorpay
const getRazorpay = () => {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret || keyId.includes('YOUR_KEY')) {
    return null
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret })
}

// Validation rules
const createOrderValidation = [
  body('amount').isInt({ min: 100 }).withMessage('Minimum donation is ₹100'),
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('phone').matches(/^[6-9]\d{9}$/).withMessage('Valid Indian mobile number required'),
]

// POST /api/donations/create-order
router.post('/create-order', createOrderValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

  const { amount, name, email, phone, cause, recurring } = req.body
  const amountInPaise = Math.round(amount * 100)

  const razorpay = getRazorpay()
  if (!razorpay) {
    // DEV MODE: return mock order when Razorpay not configured
    const mockOrderId = `order_DEMO_${Date.now()}`
    const donation = await Donation.create({
      donorName: name, email, phone, amount, cause, recurring,
      razorpayOrderId: mockOrderId, status: 'pending',
    }).catch(() => null)
    return res.json({
      orderId: mockOrderId,
      amount: amountInPaise,
      currency: 'INR',
      donationId: donation?._id,
      demo: true,
      message: 'Demo mode — configure RAZORPAY_KEY_ID in .env to go live',
    })
  }

  try {
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { donorName: name, cause: cause || 'General Fund', recurring: String(recurring) },
    })

    // Save pending donation
    await Donation.create({
      donorName: name, email, phone, amount, cause, recurring,
      razorpayOrderId: order.id, status: 'pending',
    }).catch(err => console.error('DB save failed:', err.message))

    res.json({ orderId: order.id, amount: order.amount, currency: order.currency })
  } catch (err) {
    console.error('Razorpay error:', err)
    res.status(500).json({ message: 'Failed to create payment order. Please try again.' })
  }
})

// POST /api/donations/verify-payment
router.post('/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, name, email, cause } = req.body

  if (!razorpay_order_id || !razorpay_payment_id) {
    return res.status(400).json({ message: 'Missing payment details' })
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET
  const isDemoMode = !keySecret || keySecret.includes('YOUR_SECRET')

  if (!isDemoMode) {
    // Verify signature
    const expectedSig = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expectedSig !== razorpay_signature) {
      // Mark as failed in DB
      await Donation.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: 'failed' }
      ).catch(() => {})
      return res.status(400).json({ message: 'Payment signature verification failed' })
    }
  }

  // Update donation status
  const donation = await Donation.findOneAndUpdate(
    { razorpayOrderId: razorpay_order_id },
    {
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: 'completed',
    },
    { new: true }
  ).catch(() => null)

  // Send receipt email
  if (donation && email) {
    sendDonationReceipt({
      to: email,
      name: name || donation.donorName,
      amount: amount || donation.amount,
      receiptNumber: donation.receiptNumber,
      paymentId: razorpay_payment_id,
      cause: cause || donation.cause,
    }).catch(err => console.error('Receipt email failed:', err.message))
  }

  res.json({
    success: true,
    message: 'Payment verified successfully',
    receiptNumber: donation?.receiptNumber,
    donationId: donation?._id,
  })
})

// GET /api/donations/stats — public impact stats
router.get('/stats', async (req, res) => {
  try {
    const [totalResult, donorCount] = await Promise.all([
      Donation.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
      ]),
      Donation.countDocuments({ status: 'completed' }),
    ])
    res.json({
      totalRaised: totalResult[0]?.total || 0,
      totalDonations: totalResult[0]?.count || 0,
      donorCount,
    })
  } catch {
    res.json({ totalRaised: 0, totalDonations: 0, donorCount: 0 })
  }
})

export default router
