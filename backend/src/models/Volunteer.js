import mongoose from 'mongoose'

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  city: { type: String, trim: true },
  skills: [{ type: String }],
  availability: { type: String, enum: ['weekdays', 'weekends', 'both', 'remote-only'], default: 'weekends' },
  interests: [{ type: String }],
  message: { type: String, maxlength: 1000 },
  status: { type: String, enum: ['pending', 'contacted', 'active', 'inactive'], default: 'pending' },
}, { timestamps: true })

volunteerSchema.index({ email: 1 }, { unique: true })
volunteerSchema.index({ status: 1 })

export default mongoose.model('Volunteer', volunteerSchema)
