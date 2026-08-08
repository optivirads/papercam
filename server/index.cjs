const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const db = require('./db.cjs');

const app = express();
const PORT = process.env.PORT || 5000;
const IS_PROD = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json());

// ─── Nodemailer transporter setup ────────────────────────────────────────────
// Configure via .env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
// For Gmail: enable "Less Secure Apps" or use an App Password
let transporter = null;
try {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log(`📧 Email transport ready using: ${process.env.SMTP_USER}`);
  } else {
    console.warn('⚠️  No SMTP credentials found — email OTP will run in console-only mode.');
  }
} catch (e) {
  console.error('Email transport setup failed:', e.message);
}

// ─── Shared OTP Store (phone & email) ────────────────────────────────────────
const otpStore = new Map(); // key: phone_digits or email
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PSC Master Cloud REST API',
    timestamp: new Date().toISOString(),
    emailEnabled: !!transporter,
  });
});

// ─── Auth: Legacy login endpoint ──────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { email, phone } = req.body;
  const adminEmails = ['admin@papercam.app', 'abhinav@papercam.app', 'pscmaster.admin@gmail.com'];
  const adminPhones = ['9876543210', '9995550000'];
  const role =
    (email && adminEmails.includes(email.toLowerCase())) ||
    (phone && adminPhones.includes(phone))
      ? 'admin'
      : 'student';
  res.json({
    success: true,
    user: { id: `usr-${Date.now()}`, email: email || '', phone: phone || '', role, token: `jwt-token-${Date.now()}` },
  });
});

// ─── Auth: Send OTP to Phone ──────────────────────────────────────────────────
app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.replace(/\D/g, '').length < 10) {
    return res.status(400).json({ success: false, error: 'Invalid phone number.' });
  }
  const digits = phone.replace(/\D/g, '');
  const otp = generateOtp();
  otpStore.set(`phone:${digits}`, { otp, expiresAt: Date.now() + OTP_TTL_MS });

  console.log(`📱 [PHONE OTP] +91 ${digits} → ${otp}`);

  res.json({
    success: true,
    message: `OTP sent to +91 ${digits}.`,
    _devOtp: !IS_PROD ? otp : undefined, // show only in dev
  });
});

// ─── Auth: Verify OTP (Phone) ─────────────────────────────────────────────────
app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ success: false, error: 'Phone and OTP are required.' });

  const digits = phone.replace(/\D/g, '');
  const key = `phone:${digits}`;
  const stored = otpStore.get(key);

  if (!stored) return res.status(400).json({ success: false, error: 'No OTP found. Please request a new one.' });
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(key);
    return res.status(400).json({ success: false, error: 'OTP has expired. Please request a new one.' });
  }
  if (stored.otp !== otp.trim()) return res.status(400).json({ success: false, error: 'Incorrect OTP. Please try again.' });

  otpStore.delete(key);

  const adminPhones = ['9876543210', '9995550000', '9895000000'];
  const role = adminPhones.includes(digits) ? 'admin' : 'student';

  res.json({ success: true, role, token: `p-jwt-${Date.now()}`, message: 'OTP verified.' });
});

// ─── Auth: Send OTP to Email ──────────────────────────────────────────────────
app.post('/api/auth/send-email-otp', async (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const otp = generateOtp();
  otpStore.set(`email:${normalizedEmail}`, { otp, expiresAt: Date.now() + OTP_TTL_MS });

  console.log(`📧 [EMAIL OTP] ${normalizedEmail} → ${otp}`);

  // Try to send real email if SMTP is configured
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"PSC Master Portal" <${process.env.SMTP_USER}>`,
        to: email,
        subject: '🔐 Your PSC Master Login OTP',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0d1322; color: #fff; border-radius: 16px; padding: 32px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <div style="background: #ffc000; display: inline-block; padding: 10px 20px; border-radius: 12px; font-weight: 900; font-size: 20px; color: #0d1322;">PSC Master</div>
            </div>
            <h2 style="color: #ffc000; font-size: 20px; margin: 0 0 8px;">Your Login OTP</h2>
            <p style="color: #94a3b8; font-size: 14px; margin: 0 0 24px;">Use the code below to log in to your PSC Master account. It expires in <strong>5 minutes</strong>.</p>
            <div style="background: #141c2e; border: 2px solid #ffc000; border-radius: 12px; padding: 24px; text-align: center; letter-spacing: 12px; font-size: 36px; font-weight: 900; color: #ffc000;">${otp}</div>
            <p style="color: #475569; font-size: 12px; margin: 24px 0 0; text-align: center;">If you didn't request this OTP, please ignore this email.</p>
          </div>
        `,
      });
      console.log(`📧 Email sent successfully to ${normalizedEmail}`);
      return res.json({ success: true, message: `OTP sent to ${email}. Check your inbox.` });
    } catch (err) {
      console.error('Email send failed:', err.message);
      // Fall through to dev mode response
    }
  }

  // Dev mode / no SMTP: return OTP in response
  res.json({
    success: true,
    message: `OTP generated for ${email}.`,
    _devOtp: !IS_PROD ? otp : undefined,
    _devNote: !IS_PROD ? 'Configure SMTP_USER and SMTP_PASS in .env to send real emails.' : undefined,
  });
});

// ─── Auth: Verify OTP (Email) ─────────────────────────────────────────────────
app.post('/api/auth/verify-email-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ success: false, error: 'Email and OTP are required.' });

  const normalizedEmail = email.trim().toLowerCase();
  const key = `email:${normalizedEmail}`;
  const stored = otpStore.get(key);

  if (!stored) return res.status(400).json({ success: false, error: 'No OTP found. Please request a new one.' });
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(key);
    return res.status(400).json({ success: false, error: 'OTP has expired. Please request a new one.' });
  }
  if (stored.otp !== otp.trim()) return res.status(400).json({ success: false, error: 'Incorrect OTP. Please try again.' });

  otpStore.delete(key);

  const adminEmails = ['admin@papercam.app', 'abhinav@papercam.app', 'pscmaster.admin@gmail.com'];
  const role = adminEmails.includes(normalizedEmail) ? 'admin' : 'student';

  res.json({ success: true, role, token: `e-jwt-${Date.now()}`, email: normalizedEmail, message: 'Email OTP verified.' });
});

app.get('/api/questions', (req, res) => {
  const count = parseInt(req.query.count || '0', 10);
  const questions = db.getQuestions(count);
  res.json({ success: true, questions });
});

// Dynamic Kerala PSC Exam Question Fetcher Endpoint
app.get('/api/questions/fetch-internet', async (req, res) => {
  const amount = Math.min(Math.max(parseInt(req.query.amount || '20', 10), 5), 100);
  const questions = db.getQuestions(amount);
  res.json({ success: true, count: questions.length, questions });
});

app.post('/api/questions', (req, res) => {
  const question = req.body;
  if (!question.text || !question.optionA || !question.optionB) {
    return res.status(400).json({ success: false, error: 'Missing question text or options.' });
  }
  const saved = db.saveQuestion(question);
  res.json({ success: true, question: saved });
});

app.delete('/api/questions/all', (req, res) => {
  db.clearAllQuestions();
  res.json({ success: true, message: 'All questions cleared.' });
});

app.delete('/api/questions/:id', (req, res) => {
  db.deleteQuestion(req.params.id);
  res.json({ success: true, id: req.params.id });
});

// ─── Exam Results ──────────────────────────────────────────────────────────────
app.get('/api/exam-results', (req, res) => {
  res.json({ success: true, results: db.getExamResults() });
});

app.post('/api/exam-results', (req, res) => {
  const saved = db.saveExamResult(req.body);
  res.json({ success: true, result: saved });
});

// ─── Leaderboard ───────────────────────────────────────────────────────────────
app.get('/api/leaderboard', (req, res) => {
  res.json({ success: true, leaderboard: db.getLeaderboard() });
});

// ─── Student Profile ───────────────────────────────────────────────────────────
app.get('/api/profile/:key', (req, res) => {
  const profile = db.getProfile(req.params.key);
  if (!profile) return res.status(404).json({ success: false, error: 'Profile not found.' });
  res.json({ success: true, profile });
});

app.post('/api/profile', (req, res) => {
  const profile = db.saveProfile(req.body);
  res.json({ success: true, profile });
});

// ─── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 PSC Master API running on port ${PORT}`);
  console.log(`   Email OTP: ${transporter ? 'SMTP configured ✅' : 'Dev mode (console only) ⚠️'}`);
  console.log(`   Environment: ${IS_PROD ? 'PRODUCTION' : 'DEVELOPMENT'}`);
});
