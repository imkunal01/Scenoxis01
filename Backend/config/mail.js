import nodemailer from 'nodemailer'
import logger from './logger.js'

const host = process.env.MAILGUN_HOST || process.env.SMTP_HOST || 'smtp.gmail.com'
const port = process.env.MAILGUN_PORT
  ? parseInt(process.env.MAILGUN_PORT, 10)
  : process.env.SMTP_PORT
  ? parseInt(process.env.SMTP_PORT, 10)
  : 465
const user = process.env.MAILGUN_USER || process.env.SMTP_USER || process.env.OWNER_EMAIL
const pass = process.env.MAILGUN_PASS || process.env.SMTP_PASS || process.env.OWNER_PASS

const secureEnv = process.env.SMTP_SECURE
const secure = typeof secureEnv === 'string' ? secureEnv.toLowerCase() === 'true' : port === 465

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: user && pass ? { user, pass } : undefined,
  requireTLS: true,
  connectionTimeout: process.env.SMTP_CONN_TIMEOUT ? parseInt(process.env.SMTP_CONN_TIMEOUT, 10) : 15000,
  socketTimeout: process.env.SMTP_SOCKET_TIMEOUT ? parseInt(process.env.SMTP_SOCKET_TIMEOUT, 10) : 15000,
  greetingTimeout: process.env.SMTP_GREET_TIMEOUT ? parseInt(process.env.SMTP_GREET_TIMEOUT, 10) : 15000,
})

logger.info('Mail transporter config', {
  host: host || null,
  port: port || null,
  secure,
  authUser: user || null,
})

try {
  await transporter.verify()
  logger.info('Mail transporter verified')
} catch (e) {
  logger.error('Mail transporter verification failed', { message: e?.message })
}

export default transporter
