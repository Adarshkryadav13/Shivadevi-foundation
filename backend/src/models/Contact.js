import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  interest: { type: String, default: 'General Question' },
  message: { type: String, required: true, maxlength: 2000 },
  status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  ipAddress: { type: String },
}, { timestamps: true })

contactSchema.index({ email: 1 })
contactSchema.index({ status: 1 })
contactSchema.index({ createdAt: -1 })

export default mongoose.model('Contact', contactSchema)
