// config/mail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.OWNER_EMAIL,
    pass: (process.env.OWNER_PASS || "").replace(/\s+/g, "")
  }
});

module.exports = transporter;
