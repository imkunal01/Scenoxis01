require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const transporter = require("./config/mail");
const logger = require("./config/logger");

const app = express();

// ====================================================================
// 1. DEBUG LOGGER (MOVED TO TOP)
// ====================================================================
// This is now the FIRST thing that runs.
// We will see 'OPTIONS' requests here, which are critical for CORS.
app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url} | Origin: ${req.headers.origin || 'undefined'}`);
  next();
});

// ====================================================================
// 2. CORS CONFIGURATION (Configurable via ALLOWED_ORIGINS)
// ====================================================================
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const corsOrigin = allowedOrigins.length
  ? function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  : true; // Fallback to allow all in development if not configured

app.use(cors({
  origin: corsOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

// ====================================================================

// JSON Middleware
app.use(express.json());

// Sanity Check Route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Env validation
const requiredEnv = ["MONGO_URI", "OWNER_EMAIL", "OWNER_PASS"];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  logger.error(`Missing required env vars: ${missing.join(", ")}`);
}

// Connect to Database
connectDB();

// SMTP Transporter Verification
transporter.verify().then(() => {
  logger.info("✅ Email server is ready to send messages");
}).catch((err) => {
  logger.error(`❌ SMTP verification failed: ${err.message}`);
});

// API Routes
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
