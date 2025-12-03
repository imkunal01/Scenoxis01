const express = require("express");
const router = express.Router();
const { submitContact, health, testEmail } = require("../controllers/contactController");

router.post("/contact", submitContact);
router.get("/health", health);
router.get("/test-email", testEmail);

module.exports = router;
