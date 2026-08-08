const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db.cjs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'PSC Master Cloud REST API', timestamp: new Date().toISOString() });
});

// Authentication Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, phone, authMethod } = req.body;
  const adminEmails = ['admin@papercam.app', 'abhinav@papercam.app', 'pscmaster.admin@gmail.com'];
  const adminPhones = ['9876543210', '9995550000'];

  const role = (email && adminEmails.includes(email.toLowerCase())) || (phone && adminPhones.includes(phone)) ? 'admin' : 'student';

  res.json({
    success: true,
    user: {
      id: `usr-${Date.now()}`,
      email: email || '',
      phone: phone || '',
      role,
      token: `jwt-token-${Date.now()}`
    }
  });
});

// ─── OTP Authentication ──────────────────────────────────────────────────────
// In-memory OTP store: { phone -> { otp, expiresAt } }
const otpStore = new Map();
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes

app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.replace(/\D/g, '').length < 10) {
    return res.status(400).json({ success: false, error: 'Invalid phone number.' });
  }
  const digits = phone.replace(/\D/g, '');
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  otpStore.set(digits, { otp, expiresAt: Date.now() + OTP_TTL_MS });

  // In production, integrate an SMS gateway (Twilio / MSG91 / Fast2SMS) here.
  // For now, log the OTP to the server console for local testing.
  console.log(`📱 OTP for +91 ${digits}: ${otp} (expires in 5 min)`);

  res.json({
    success: true,
    message: `OTP sent to +91 ${digits}. (Check server console for OTP in test mode.)`,
    // DEVELOPMENT ONLY — remove in production:
    _devOtp: process.env.NODE_ENV !== 'production' ? otp : undefined
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ success: false, error: 'Phone and OTP are required.' });
  }
  const digits = phone.replace(/\D/g, '');
  const stored = otpStore.get(digits);

  if (!stored) {
    return res.status(400).json({ success: false, error: 'No OTP found for this number. Please request a new one.' });
  }
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(digits);
    return res.status(400).json({ success: false, error: 'OTP has expired. Please request a new one.' });
  }
  if (stored.otp !== otp.trim()) {
    return res.status(400).json({ success: false, error: 'Incorrect OTP. Please try again.' });
  }

  // Valid OTP — delete from store after use
  otpStore.delete(digits);

  const adminPhones = ['9876543210', '9995550000', '9895000000'];
  const role = adminPhones.includes(digits) ? 'admin' : 'student';

  res.json({
    success: true,
    role,
    token: `p-jwt-${Date.now()}`,
    message: 'OTP verified successfully.'
  });
});

// Question Bank API Endpoints
app.get('/api/questions', (req, res) => {
  const questions = db.getQuestions();
  res.json({ success: true, questions });
});

app.post('/api/questions', (req, res) => {
  const question = req.body;
  if (!question.text || !question.optionA || !question.optionB) {
    return res.status(400).json({ success: false, error: 'Missing question text or options' });
  }
  const saved = db.saveQuestion(question);
  res.json({ success: true, question: saved });
});

app.delete('/api/questions/:id', (req, res) => {
  const { id } = req.params;
  db.deleteQuestion(id);
  res.json({ success: true, id });
});

// Exam Results & Scoring API Endpoints
app.get('/api/exam-results', (req, res) => {
  const results = db.getExamResults();
  res.json({ success: true, results });
});

app.post('/api/exam-results', (req, res) => {
  const result = req.body;
  const saved = db.saveExamResult(result);
  res.json({ success: true, result: saved });
});

// Statewide Leaderboard Endpoint
app.get('/api/leaderboard', (req, res) => {
  const leaderboard = db.getLeaderboard();
  res.json({ success: true, leaderboard });
});

// Student profiles (cloud sync)
app.get('/api/profile/:phone', (req, res) => {
  const profile = db.getProfile(req.params.phone);
  if (!profile) return res.status(404).json({ success: false, error: 'Profile not found' });
  res.json({ success: true, profile });
});

app.post('/api/profile', (req, res) => {
  const profile = db.saveProfile(req.body);
  res.json({ success: true, profile });
});

app.listen(PORT, () => {
  console.log(`🚀 PSC Master Cloud REST API Server listening on port ${PORT}`);
  console.log(`   OTP mode: ${process.env.NODE_ENV !== 'production' ? 'DEV (OTP logged to console)' : 'PRODUCTION (SMS gateway required)'}`);
});
