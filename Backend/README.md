Backend Service (Scenox)

Overview
- Express server with MongoDB and Nodemailer (Gmail SMTP).
- Exposes `POST /api/contact` and `GET /api/test-email`.

Environment Variables
- `MONGO_URI`: MongoDB connection string.
- `PORT`: Port to run the server (Render sets this automatically).
- `OWNER_EMAIL`: Gmail address used to send and receive emails.
- `OWNER_PASS`: Gmail App Password (16 characters, no spaces).

Gmail Setup
- Enable 2-Step Verification on the Gmail account.
- Create an App Password for “Mail”.
- Copy the 16-character password and REMOVE spaces before storing:
  - Example shown by Google: `uvqf pxab ckoc pubb`
  - Store as: `uvqfpxabckocpubb`

Render Deployment Checklist
- Add environment variables in Render Dashboard ➜ Environment:
  - `MONGO_URI`, `OWNER_EMAIL`, `OWNER_PASS` (no spaces), optionally `PORT`.
- Redeploy after changes.
- Check logs for transporter verification:
  - Success: `✅ Email server is ready to send messages`
  - Failure: Look for `Invalid login` (wrong email/app password), or network errors.

Vercel Frontend Configuration
- Set `VITE_BACKEND_URL` to your Render URL (e.g., `https://<service>.onrender.com`).
- Ensure the backend CORS `allowedOrigins` includes your Vercel domain.

Testing
- Call `GET /api/test-email` on the backend to validate SMTP.
- Submit the contact form to verify both owner and user emails.

Troubleshooting
- 535 Invalid login: Verify `OWNER_EMAIL` and `OWNER_PASS` (no spaces) and App Password exists.
- ETIMEDOUT / ECONNRESET: Temporary network issues; retry or check Render status.
- CORS errors: Ensure frontend origin is listed in backend `allowedOrigins`.