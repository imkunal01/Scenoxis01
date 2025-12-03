Backend Service (Scenox)

Overview
- Express server with MongoDB and Nodemailer (Gmail SMTP).
- Exposes `POST /api/contact`, `GET /api/test-email`, and `GET /api/health`.

Environment Variables
- `MONGO_URI`: MongoDB connection string.
- `PORT`: Port to run the server (Render sets this automatically).
- `OWNER_EMAIL`: Gmail address used to send and receive emails.
- `OWNER_PASS`: Gmail App Password (16 characters, no spaces).
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins for CORS (production).
 - `SMTP_HOST`: SMTP host (default `smtp.gmail.com`).
 - `SMTP_PORT`: SMTP port (use `465` or `587`).
 - `SMTP_SECURE`: `true` for 465, `false` for 587.
 - `SMTP_CONN_TIMEOUT` / `SMTP_SOCKET_TIMEOUT` / `SMTP_GREET_TIMEOUT`: optional timeouts in ms.

Gmail Setup
- Enable 2-Step Verification on the Gmail account.
- Create an App Password for “Mail”.
- Copy the 16-character password and REMOVE spaces before storing:
  - Example shown by Google: `uvqf pxab ckoc pubb`
  - Store as: `uvqfpxabckocpubb`

Render Deployment Checklist
- Add environment variables in Render Dashboard ➜ Environment:
  - `MONGO_URI`, `OWNER_EMAIL`, `OWNER_PASS` (no spaces), optionally `PORT`, and `ALLOWED_ORIGINS`.
- Redeploy after changes.
- Check logs for transporter verification:
  - Success: `✅ Email server is ready to send messages`
  - Failure: Look for `Invalid login` (wrong email/app password), or network errors.

Vercel Frontend Configuration
- Set `VITE_BACKEND_URL` to your Render URL (e.g., `https://<service>.onrender.com`).
- Ensure the backend CORS `ALLOWED_ORIGINS` includes your Vercel domain.

Testing
- Call `GET /api/health` to validate environment and connectivity (SMTP, DB, env vars).
- Call `GET /api/test-email` on the backend to validate SMTP.
- Submit the contact form to verify both owner and user emails.

Troubleshooting
- 535 Invalid login: Verify `OWNER_EMAIL` and `OWNER_PASS` (no spaces) and App Password exists.
- ETIMEDOUT / ECONNRESET: Temporary network issues; retry or check Render status.
- CORS errors: Ensure frontend origin is included in `ALLOWED_ORIGINS`.
 - Connection timeout: Try `SMTP_PORT=587` and `SMTP_SECURE=false`; ensure provider allows outbound SMTP.
