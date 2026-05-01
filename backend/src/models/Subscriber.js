import mongoose from 'mongoose'

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, trim: true },
  active: { type: Boolean, default: true },
  source: { type: String, default: 'website' },
  unsubscribedAt: { type: Date },
}, { timestamps: true })

subscriberSchema.index({ email: 1 }, { unique: true })
subscriberSchema.index({ active: 1 })

export default mongoose.model('Subscriber', subscriberSchema)
