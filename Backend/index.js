require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// ====================================================================
// CORS CONFIGURATION
// ====================================================================

// NOTE: These are your trusted domains. 
// I have removed the trailing slashes ('/') because they cause errors.
const allowedOrigins = [
  "https://scenoxis01.vercel.app",
  "https://scenoxis.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(cors({
  origin: (origin, callback) => {
    // 1. Allow requests with no origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    // 2. DEBUG MODE: ALLOW EVERYTHING
    // We are currently returning 'true' for everyone to fix your error.
    // If you want to be strict later, remove the line below and uncomment the 'if' block.
    return callback(null, true); 

    /* // --- STRICT MODE (Uncomment this later when everything works) ---
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
    */
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Handle Preflight requests for all routes
// ERROR FIX: The line below causes "PathError: Missing parameter name" in newer Express/Router versions.
// Since we used 'app.use(cors())' above, preflight requests are ALREADY handled globally.
// app.options('*', cors()); 

// ====================================================================

// Debugging Middleware: Logs the exact origin of every request
app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url} | Origin: ${req.headers.origin}`);
  next();
});

// JSON Middleware (Must be before routes)
app.use(express.json());

// Sanity Check Route (Test this in browser first!)
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Connect to Database
connectDB();

// API Routes
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));