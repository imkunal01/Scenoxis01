require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// CORS config
const allowedOrigins = [
  "https://scenoxis01.vercel.app/",
  "https://scenoxis.onrender.com",
  "0.0.0.0/0",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
