import mongoose from 'mongoose'
import logger from './logger.js'

export async function connectDB() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    logger.error('MONGO_URI not set')
    return
  }
  try {
    await mongoose.connect(uri)
    logger.info('MongoDB connected')
  } catch (err) {
    logger.error('MongoDB connection error', { message: err.message })
  }
}
