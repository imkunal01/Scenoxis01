import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next) {
  const header = req.headers['authorization']
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false })
  }
  const token = header.substring(7)
  try {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET not set')
    const payload = jwt.verify(token, secret)
    req.user = payload
    next()
  } catch (e) {
    return res.status(401).json({ success: false })
  }
}
