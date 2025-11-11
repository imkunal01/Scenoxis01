import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
// CORS configuration for multiple origins
const allowedOrigins = [
  "https://scenoxis01.vercel.app",
  "https://scenoxis01-1.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174"
];

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const Contact = mongoose.model("Contact", contactSchema);

// Setup mail transporter with better error handling
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.OWNER_EMAIL,
    pass: process.env.OWNER_PASS,
  },
  debug: true, // Enable debug output
  logger: true  // Enable logging
});

// Test transporter connection
transporter.verify(function (error, success) {
  if (error) {
    console.log("❌ Email transporter verification failed:", error);
    console.log("Email config:", {
      email: process.env.OWNER_EMAIL ? "Set" : "Not set",
      pass: process.env.OWNER_PASS ? "Set" : "Not set"
    });
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

// POST route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ error: "All fields are required!" });

    // Save to DB
    const contact = new Contact({ name, email, message });
    await contact.save();

    // 📩 Send notification email to YOU
    console.log('📧 Sending notification email to owner...');
    const ownerMailResult = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.OWNER_EMAIL}>`,
      to: process.env.OWNER_EMAIL,
      subject: `New Message from ${name}`,
      text: `You got a new message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    console.log('✅ Owner notification sent:', ownerMailResult.messageId);

    // 📤 Send custom thank-you email to USER
    console.log('📧 Sending confirmation email to user...');
    const userMailResult = await transporter.sendMail({
      from: `"Kunal's Portfolio" <${process.env.OWNER_EMAIL}>`,
      to: email,
      subject: "Thanks for reaching out! 🙌",
      html: `
  <div style="
    font-family: 'Poppins', Arial, sans-serif;
    background: linear-gradient(135deg, #7b2ff7, #f107a3);
    color: #fff;
    padding: 40px 25px;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    text-align: center;
  ">
    <div style="
      background: #fff;
      color: #2d0349;
      padding: 30px 20px;
      border-radius: 12px;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    ">
      <h2 style="color: #7b2ff7; margin-bottom: 10px;">Hey ${name} 👋</h2>
      <p style="font-size: 16px; margin-bottom: 20px;">
        Thanks for sliding into my inbox 😎 — your message just made my day.
      </p>
      <div style="
        border-left: 4px solid #7b2ff7;
        background: #f8f3ff;
        color: #4a0072;
        margin: 20px auto;
        padding: 12px 16px;
        border-radius: 6px;
        font-style: italic;
        width: 80%;
      ">
        “${message}”
      </div>
      <p style="margin-top: 25px; font-size: 15px;">
        I’ll hit you back real soon with something even cooler 💫
      </p>
      <div style="margin-top: 35px;">
        <a href="https://kunaldhangar.vercel.app" 
          style="
            background: #7b2ff7;
            color: #fff;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 30px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(123,47,247,0.4);
            transition: 0.3s;
          "
        >
          Visit My Portfolio 🚀
        </a>
      </div>
      <p style="margin-top: 40px; font-size: 14px; color: #666;">
        Cheers,<br/>
        <span style="font-weight: bold; color: #7b2ff7;">Kunal Dhangar</span><br/>
        <span style="font-size: 13px;">Full Stack Developer • Scenoxis</span>
      </p>
    </div>
  </div>
`,
    });
    console.log('✅ User confirmation sent:', userMailResult.messageId);

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Contact form error:", err);
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    if (err.code) console.error("Error code:", err.code);
    if (err.response) console.error("Error response:", err.response);
    
    res.status(500).json({ 
      error: "Server error, try again later.", 
      details: err.message,
      type: err.name 
    });
  }
});

// Test email endpoint for debugging
app.get("/api/test-email", async (req, res) => {
  try {
    console.log("🧪 Testing email functionality...");
    console.log("📧 Email config check:");
    console.log("  - OWNER_EMAIL:", process.env.OWNER_EMAIL ? "Set" : "Not set");
    console.log("  - OWNER_PASS:", process.env.OWNER_PASS ? "Set" : "Not set");
    
    // Test notification email
    console.log("📤 Attempting to send test email...");
    const result = await transporter.sendMail({
      from: `"Test Contact" <${process.env.OWNER_EMAIL}>`,
      to: process.env.OWNER_EMAIL,
      subject: `Test Email from Backend`,
      text: `This is a test email to verify email functionality is working.\n\nTime: ${new Date().toISOString()}\nBackend: ${process.env.PORT || 5000}`,
    });
    
    console.log("✅ Test email sent successfully!");
    console.log("📧 Message ID:", result.messageId);
    res.json({ success: true, message: "Test email sent successfully", messageId: result.messageId });
  } catch (error) {
    console.error("❌ Test email failed:", error);
    console.error("📋 Error details:");
    console.error("  - Name:", error.name);
    console.error("  - Message:", error.message);
    console.error("  - Code:", error.code);
    console.error("  - Response:", error.response);
    res.status(500).json({ 
      success: false, 
      error: "Test email failed", 
      details: error.message,
      name: error.name,
      code: error.code
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server up on port ${PORT}`));
