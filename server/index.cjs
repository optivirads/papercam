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

app.listen(PORT, () => {
  console.log(`🚀 PSC Master Cloud REST API Server listening on port ${PORT}`);
});
