import transporter from '../config/mail.js'

export async function sendUserConfirmation(name, email) {
  const from = process.env.MAILGUN_FROM
  if (!from) throw new Error('MAILGUN_FROM not set')

  const mailOptions = {
    from,
    to: email,
    subject: 'Thanks for reaching out',
    text: `Hi ${name},\n\nThanks for contacting us. We will get back to you soon.`,
  }

  return transporter.sendMail(mailOptions)
}

export async function sendAdminAlert(formData) {
  const from = process.env.MAILGUN_FROM
  const adminEmail = process.env.ADMIN_EMAIL
  if (!from || !adminEmail) throw new Error('MAILGUN_FROM or ADMIN_EMAIL not set')

  const { name, email, company, service, message } = formData
  const mailOptions = {
    from,
    to: adminEmail,
    subject: 'New Contact Submission',
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${service}\nMessage: ${message}`,
  }

  return transporter.sendMail(mailOptions)
}
