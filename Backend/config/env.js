import dotenv from 'dotenv'
import logger from './logger.js'

dotenv.config()

// Log a safe summary of env injection (no secrets)
const keys = {
  PORT: !!process.env.PORT,
  MONGO_URI: !!process.env.MONGO_URI,
  JWT_SECRET: !!process.env.JWT_SECRET,
  ADMIN_USERNAME: !!process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
  SMTP_HOST: !!process.env.SMTP_HOST,
  SMTP_PORT: !!process.env.SMTP_PORT,
  SMTP_SECURE: !!process.env.SMTP_SECURE,
  SMTP_USER: !!process.env.SMTP_USER,
  SMTP_PASS: !!process.env.SMTP_PASS,
  MAILGUN_HOST: !!process.env.MAILGUN_HOST,
  MAILGUN_PORT: !!process.env.MAILGUN_PORT,
  MAILGUN_USER: !!process.env.MAILGUN_USER,
  MAILGUN_PASS: !!process.env.MAILGUN_PASS,
  MAILGUN_FROM: !!process.env.MAILGUN_FROM,
  ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
}

logger.info('Env injection complete', keys)

