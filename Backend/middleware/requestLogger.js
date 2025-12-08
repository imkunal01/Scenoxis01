import crypto from 'crypto'
import logger from '../config/logger.js'

export default function requestLogger(req, res, next) {
  const id = crypto.randomUUID()
  req.id = id
  const start = process.hrtime.bigint()

  logger.info('Request start', {
    id,
    method: req.method,
    url: req.originalUrl || req.url,
    ip: req.ip,
    ua: req.headers['user-agent'],
  })

  res.on('finish', () => {
    const durationMs = Number((process.hrtime.bigint() - start) / 1000000n)
    logger.info('Request end', {
      id,
      method: req.method,
      url: req.originalUrl || req.url,
      status: res.statusCode,
      durationMs,
      length: res.getHeader('content-length') || 0,
    })
  })

  next()
}

