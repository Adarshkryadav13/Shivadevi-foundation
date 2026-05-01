import mongoose from 'mongoose'

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  amount: { type: Number, required: true, min: 100 },
  currency: { type: String, default: 'INR' },
  cause: { type: String, default: 'General Fund' },
  recurring: { type: Boolean, default: false },

  // Razorpay fields
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },

  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },

  receiptSent: { type: Boolean, default: false },
  receiptNumber: { type: String },
  notes: { type: String },
}, { timestamps: true })

// Auto-generate receipt number
donationSchema.pre('save', function (next) {
  if (this.isNew) {
    const year = new Date().getFullYear()
    const rand = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
    this.receiptNumber = `BE-${year}-${rand}`
  }
  next()
})

// Indexes
donationSchema.index({ email: 1 })
donationSchema.index({ razorpayOrderId: 1 })
donationSchema.index({ status: 1 })
donationSchema.index({ createdAt: -1 })

export default mongoose.model('Donation', donationSchema)
