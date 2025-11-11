import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();

// ------------------------------------
// 🌍 CORS Configuration
// ------------------------------------
const allowedOrigins = [
  "https://scenoxis01.vercel.app",
  "https://scenoxis01-1.onrender.com",
  "http://localhost:5173",,
  "http://localhost:5174",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());

// ------------------------------------
// ⚙️ MongoDB Connection
// ------------------------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err.message));

// ------------------------------------
// 🧩 Schema & Model
// ------------------------------------
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// ------------------------------------
// ✉️ Mail Transporter Configuration
// ------------------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.OWNER_EMAIL,
    pass: (process.env.OWNER_PASS || "").replace(/\s+/g, ""),
  },
  pool: true,
});

// ------------------------------------
// 📮 Contact Form Route
// ------------------------------------
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ error: "All fields are required!" });

    // Save contact in DB
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Owner Notification Email
    const ownerMail = {
      from: `"Portfolio Contact" <${process.env.OWNER_EMAIL}>`,
      to: process.env.OWNER_EMAIL,
      subject: `📩 New Message from ${name}`,
      html: `
      <div style="font-family:'Poppins',Arial,sans-serif; background:#f9f9fb; padding:20px;">
        <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:30px;box-shadow:0 5px 15px rgba(0,0,0,0.08);">
          <h2 style="color:#7b2ff7;margin-bottom:8px;">New Message from ${name}</h2>
          <p style="margin:8px 0;font-size:15px;"><b>Email:</b> ${email}</p>
          <div style="background:#faf6ff;border-left:4px solid #7b2ff7;padding:12px 18px;margin:20px 0;border-radius:6px;font-style:italic;">
            ${message}
          </div>
          <p style="font-size:13px;color:#777;margin-top:25px;">Sent via Portfolio Contact Form</p>
        </div>
      </div>
      `,
    };

    // User Acknowledgment Email
    const userMail = {
      from: `"Kunal Dhangar" <${process.env.OWNER_EMAIL}>`,
      to: email,
      subject: "Thanks for reaching out! 🚀",
      html: `
      <div style="font-family:'Poppins',Arial,sans-serif;background:linear-gradient(135deg,#7b2ff7,#f107a3);padding:40px;text-align:center;">
        <div style="background:#fff;border-radius:16px;padding:30px;max-width:600px;margin:auto;">
          <h2 style="color:#7b2ff7;">Hey ${name} 👋</h2>
          <p style="font-size:16px;margin-bottom:20px;">Thanks for sliding into my inbox 😎</p>
          <div style="background:#f8f3ff;border-left:4px solid #7b2ff7;padding:12px 16px;border-radius:6px;font-style:italic;margin:20px auto;width:80%;">
            “${message}”
          </div>
          <p style="font-size:15px;margin-top:15px;">I’ll reach out to you soon 💫</p>
          <div style="margin-top:30px;">
            <a href="https://kunaldhangar.vercel.app"
              style="background:#7b2ff7;color:#fff;text-decoration:none;padding:12px 30px;border-radius:30px;font-weight:600;display:inline-block;">
              Visit My Portfolio 🚀
            </a>
          </div>
          <p style="margin-top:40px;font-size:13px;color:#666;">Cheers,<br/><b style="color:#7b2ff7;">Kunal Dhangar</b><br/>Full Stack Developer • Scenoxis</p>
        </div>
      </div>
      `,
    };

    // Send both mails sequentially
    await transporter.sendMail(ownerMail);
    await transporter.sendMail(userMail);

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });

  } catch (error) {
    console.error("❌ Contact Form Error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Something went wrong while sending your message.",
      details: error.message,
    });
  }
});

// ------------------------------------
// 🚀 Start Server
// ------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
