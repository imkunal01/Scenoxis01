import express from 'express'
import ContactSubmission from '../models/ContactSubmission.js'
import { sendUserConfirmation, sendAdminAlert } from '../services/mailService.js'

const router = express.Router()

router.post('/contact', async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body || {}
    if (!name || !email || !message) {
      return res.status(400).json({ success: false })
    }

    const formattedMessage = String(message).trim()
    const doc = await ContactSubmission.create({ name, email, company, service, message: formattedMessage })

    await sendUserConfirmation(name, email)
    await sendAdminAlert({ name, email, company, service, message: formattedMessage, id: doc._id })

    return res.json({ success: true, message: 'Form submitted successfully' })
  } catch (e) {
    return res.status(500).json({ success: false })
  }
})

export default router
