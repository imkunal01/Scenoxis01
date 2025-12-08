import express from 'express'
import jwt from 'jsonwebtoken'
import ContactSubmission from '../models/ContactSubmission.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/admin/login', (req, res) => {
  const { username, password } = req.body || {}
  const envUser = process.env.ADMIN_USERNAME
  const envPass = process.env.ADMIN_PASSWORD
  const secret = process.env.JWT_SECRET
  if (!envUser || !envPass || !secret) {
    return res.status(500).json({ success: false })
  }
  if (username === envUser && password === envPass) {
    const token = jwt.sign({ role: 'admin', username }, secret, { expiresIn: '7d' })
    return res.json({ success: true, token })
  }
  return res.status(401).json({ success: false })
})

router.get('/admin/forms', authMiddleware, async (req, res) => {
  try {
    const items = await ContactSubmission.find().sort({ createdAt: -1 })
    return res.json({ success: true, data: items })
  } catch (e) {
    return res.status(500).json({ success: false })
  }
})

router.get('/admin/forms/:id', authMiddleware, async (req, res) => {
  try {
    const item = await ContactSubmission.findById(req.params.id)
    if (!item) return res.status(404).json({ success: false })
    return res.json({ success: true, data: item })
  } catch (e) {
    return res.status(500).json({ success: false })
  }
})

router.delete('/admin/forms/:id', authMiddleware, async (req, res) => {
  try {
    const item = await ContactSubmission.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ success: false })
    return res.json({ success: true })
  } catch (e) {
    return res.status(500).json({ success: false })
  }
})

export default router
