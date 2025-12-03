require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

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
// 2. CORS CONFIGURATION (ALLOW ALL)
// ====================================================================
app.use(cors({
  // "origin: true" means "Allow whatever origin is requesting access".
  // It effectively reflects the request origin back to the client.
  // This allows ALL domains while still supporting 'credentials: true'.
  origin: true, 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// ====================================================================

// JSON Middleware
app.use(express.json());

// Sanity Check Route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Connect to Database
connectDB();

// API Routes
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));