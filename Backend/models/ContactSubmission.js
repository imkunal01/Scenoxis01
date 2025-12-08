import mongoose from 'mongoose'

const ContactSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    service: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('ContactSubmission', ContactSubmissionSchema)
