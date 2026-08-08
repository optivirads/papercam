const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data.json');

const initialQuestions = [];

class CloudDatabase {
  constructor() {
    this.data = {
      questions: [],
      examResults: [],
      students: [],
      profiles: {}
    };
    this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(raw);
        if (!this.data.questions) {
          this.data.questions = [];
        }
      } else {
        this.saveData();
      }
    } catch (e) {
      console.error('Error reading database file:', e);
    }
  }

  saveData() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (e) {
      console.error('Error writing database file:', e);
    }
  }

  getQuestions(requestedCount = 0) {
    const list = [...this.data.questions];
    if (requestedCount <= 0 || list.length === 0) {
      return list;
    }
    return list.slice(0, requestedCount);
  }

  saveQuestion(question) {
    const idx = this.data.questions.findIndex((q) => String(q.id) === String(question.id));
    if (idx >= 0) {
      this.data.questions[idx] = { ...this.data.questions[idx], ...question };
    } else {
      this.data.questions.unshift(question);
    }
    this.saveData();
    return question;
  }

  deleteQuestion(id) {
    this.data.questions = this.data.questions.filter((q) => String(q.id) !== String(id));
    this.saveData();
    return true;
  }

  clearAllQuestions() {
    this.data.questions = [];
    this.saveData();
    return true;
  }

  getExamResults() {
    return this.data.examResults;
  }

  saveExamResult(result) {
    this.data.examResults.unshift(result);
    this.saveData();
    return result;
  }

  getProfile(key) {
    return this.data.profiles ? this.data.profiles[key] || null : null;
  }

  saveProfile(profile) {
    if (!this.data.profiles) this.data.profiles = {};
    const key = profile.mobileNumber || profile.email || 'default';
    this.data.profiles[key] = profile;
    this.saveData();
    return profile;
  }

  getLeaderboard() {
    return [
      { rank: 1, name: 'Anjali Nair', avgScore: 98.5, percentile: '99%' },
      { rank: 2, name: 'Suresh Kumar', avgScore: 97.2, percentile: '98%' },
      { rank: 3, name: 'Deepa Nambiar', avgScore: 96.1, percentile: '96%' }
    ];
  }
}

module.exports = new CloudDatabase();
