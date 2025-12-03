const Contact = require("../models/contact");
const transporter = require("../config/mail");
const logger = require("../config/logger");
const mongoose = require("mongoose");

const escapeHtml = (unsafe = "") => unsafe
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

// 🎨 THEME CONFIGURATION (Riot/Valorant Style)
const theme = {
  bg: "#0f1923",         // Deep dark blue-grey
  cardBg: "#18242e",     // Slightly lighter card background
  text: "#ece8e1",       // Off-white text
  accent: "#ff4655",     // Signature Red (Valorant/Riot style)
  secondaryText: "#8b9bb4", // Muted blue-grey for secondary text
  border: "#334155"      // Subtle border color
};

// 🛠️ SHARED STYLES
const mainStyle = `
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: ${theme.bg};
  padding: 40px 0;
  color: ${theme.text};
`;

const containerStyle = `
  max-width: 600px;
  margin: 0 auto;
  background-color: ${theme.cardBg};
  border: 1px solid ${theme.border};
  border-top: 4px solid ${theme.accent};
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
`;

const headerStyle = `
  background-color: ${theme.cardBg};
  padding: 30px 40px;
  border-bottom: 1px solid ${theme.border};
  text-align: center;
`;

const headerTextStyle = `
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
`;

const bodyStyle = `
  padding: 40px;
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.text};
`;

const labelStyle = `
  font-size: 12px;
  text-transform: uppercase;
  color: ${theme.secondaryText};
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 5px;
  display: block;
`;

const messageBoxStyle = `
  background-color: #0f1923;
  border: 1px solid ${theme.border};
  border-left: 3px solid ${theme.accent};
  padding: 20px;
  margin: 20px 0;
  color: #ffffff;
  font-family: monospace;
`;

const buttonStyle = `
  background-color: ${theme.accent};
  color: #ffffff;
  padding: 14px 28px;
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
  display: inline-block;
  letter-spacing: 1px;
`;

const footerStyle = `
  background-color: #0b1219;
  padding: 20px;
  text-align: center;
  font-size: 12px;
  color: ${theme.secondaryText};
  border-top: 1px solid ${theme.border};
`;

/**
 * 📨 TEMPLATE: Admin/Owner Notification
 */
const getOwnerEmailTemplate = (name, email, message) => {
  return `
    <div style="${mainStyle}">
      <div style="${containerStyle}">
        <div style="${headerStyle}">
          <h1 style="${headerTextStyle}">New Mission Intel</h1>
        </div>
        <div style="${bodyStyle}">
          <p style="margin-top: 0;"><strong>Agent, you have a new inquiry.</strong></p>
          
          <div style="margin-bottom: 20px; margin-top: 30px;">
            <span style="${labelStyle}">FROM OPERATIVE</span>
            <div style="font-size: 18px; color: white; font-weight: bold;">${name}</div>
            <a href="mailto:${email}" style="color: ${theme.accent}; text-decoration: none; font-size: 14px;">${email}</a>
          </div>

          <span style="${labelStyle}">TRANSMISSION</span>
          <div style="${messageBoxStyle}">
            ${message}
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}" style="${buttonStyle}">INITIATE REPLY</a>
          </div>
        </div>
        <div style="${footerStyle}">
          SECURE TRANSMISSION VIA PORTFOLIO PROTOCOL
        </div>
      </div>
    </div>
  `;
};

/**
 * 📨 TEMPLATE: User Auto-Reply
 */
const getUserEmailTemplate = (name, message) => {
  return `
    <div style="${mainStyle}">
      <div style="${containerStyle}">
        <div style="${headerStyle}">
          <h1 style="${headerTextStyle}">Message Received</h1>
        </div>
        <div style="${bodyStyle}">
          <p style="margin-top: 0;">Greetings <strong>${name}</strong>,</p>
          <p>Your transmission has been successfully uploaded to my server. I am currently reviewing your request and will deploy a response shortly.</p>
          
          <span style="${labelStyle}">YOUR LOGGED MESSAGE</span>
          <div style="${messageBoxStyle}">
            ${message}
          </div>
          
          <p style="color: ${theme.secondaryText}; font-size: 14px;">
            Stand by for further communication.
          </p>

          <div style="margin-top: 30px; border-top: 1px solid ${theme.border}; padding-top: 20px;">
            <strong style="color: white;">Kunal Dhangar</strong><br>
            <span style="color: ${theme.secondaryText}; font-size: 14px;">Software Developer // Portfolio</span>
          </div>
        </div>
        <div style="${footerStyle}">
          &copy; ${new Date().getFullYear()} KUNAL DHANGAR. ALL RIGHTS RESERVED.
        </div>
      </div>
    </div>
  `;
};

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Save to Database
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Format for HTML
    const formattedMessage = escapeHtml(message).replace(/\n/g, "<br>");

    // Generate Emails
    const ownerMail = {
      from: `"Mission Control" <${process.env.OWNER_EMAIL}>`,
      to: process.env.OWNER_EMAIL,
      replyTo: email,
      subject: `🛑 New Contact: ${name}`,
      html: getOwnerEmailTemplate(name, email, formattedMessage),
    };

    const userMail = {
      from: `"Kunal Dhangar" <${process.env.OWNER_EMAIL}>`,
      to: email,
      subject: "Confirmation: Message Received 🚀",
      html: getUserEmailTemplate(name, formattedMessage),
    };

    // Send
    const [ownerSend, userSend] = await Promise.all([
      transporter.sendMail(ownerMail),
      transporter.sendMail(userMail)
    ]);

    logger.info(`Owner mail sent | ID: ${ownerSend.messageId}`);
    logger.info(`User mail sent | ID: ${userSend.messageId}`);

    return res.json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (err) {
    logger.error(`Mail sending failed: ${err.message}`);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.health = async (req, res) => {
  try {
    const smtpOk = await transporter.verify().then(() => true).catch(() => false);
    const dbState = mongoose.connection.readyState; // 0 = disconnected, 1 = connected
    const requiredEnv = ["MONGO_URI", "OWNER_EMAIL", "OWNER_PASS"];
    const envMissing = requiredEnv.filter((k) => !process.env[k]);

    return res.json({
      ok: smtpOk && dbState === 1 && envMissing.length === 0,
      smtp: smtpOk,
      db: dbState === 1 ? "connected" : "disconnected",
      envMissing,
    });
  } catch (err) {
    logger.error(`Health check failed: ${err.message}`);
    res.status(500).json({ error: "Health check failed" });
  }
};

exports.testEmail = async (req, res) => {
  try {
    const mail = {
      from: `"Scenox Backend" <${process.env.OWNER_EMAIL}>`,
      to: process.env.OWNER_EMAIL,
      subject: "SMTP Test",
      text: "This is a test email from Scenox backend.",
    };
    const sent = await transporter.sendMail(mail);
    logger.info(`Test mail sent | ID: ${sent.messageId}`);
    return res.json({ success: true, messageId: sent.messageId });
  } catch (err) {
    logger.error(`Test mail failed: ${err.message}`);
    res.status(500).json({ error: "Test mail failed", details: err.message });
  }
};
