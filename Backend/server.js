import './config/env.js'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import contactRoutes from './routes/contactRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import './config/mail.js'
import { createCorsConfig } from './config/cors.js'
import logger from './config/logger.js'
import requestLogger from './middleware/requestLogger.js'

const app = express()

app.use(requestLogger)
app.use(express.json())
app.use(createCorsConfig())
await connectDB()

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api', contactRoutes)
app.use('/', adminRoutes)


app.use((err, req, res, next) => {
  const status = err.status || 500
  logger.error('Unhandled error', { id: req.id, status, message: err.message })
  res.status(status).json({ success: false })
})

const port = process.env.PORT
if (!port) {
  throw new Error('PORT environment variable is required')
}

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})
