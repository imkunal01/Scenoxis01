const nodemailer = require("nodemailer");

const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = Number(process.env.SMTP_PORT || 465);
const secure = (process.env.SMTP_SECURE || "").toLowerCase() === "true" ? true : port === 465;

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: {
    user: process.env.OWNER_EMAIL,
    pass: (process.env.OWNER_PASS || "").replace(/\s+/g, "")
  },
  requireTLS: true,
  connectionTimeout: Number(process.env.SMTP_CONN_TIMEOUT || 15000),
  socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT || 15000),
  greetingTimeout: Number(process.env.SMTP_GREET_TIMEOUT || 15000),
  pool: true,
  maxConnections: Number(process.env.SMTP_MAX_CONNECTIONS || 2),
  maxMessages: Number(process.env.SMTP_MAX_MESSAGES || 50)
});

module.exports = transporter;
