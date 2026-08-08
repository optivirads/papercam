const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data.json');

const initialQuestions = [
  {
    id: 1,
    text: 'Which Constitutional Amendment Act added the terms "Socialist", "Secular", and "Integrity" to the Preamble of the Indian Constitution?',
    textMl: 'ഇന്ത്യൻ ഭരണഘടനയുടെ ആമുഖത്തിലേക്ക് "സോഷ്യലിസ്റ്റ്", "സെക്യുലർ", "അഖണ്ഡത" എന്നീ വാക്കുകൾ കൂട്ടിച്ചേർത്ത ഭരണഘടനാ ഭേദഗതി ആക്റ്റ് ഏതാണ്?',
    optionA: '44th Amendment Act 1978',
    optionAMl: '44-ാം ഭേദഗതി ആക്റ്റ് 1978',
    optionB: '42nd Amendment Act 1976',
    optionBMl: '42-ാം ഭേദഗതി ആക്റ്റ് 1976',
    optionC: '86th Amendment Act 2002',
    optionCMl: '86-ാം ഭേദഗതി ആക്റ്റ് 2002',
    optionD: '73rd Amendment Act 1992',
    optionDMl: '73-ാം ഭേദഗതി ആക്റ്റ് 1992',
    correctOption: 'B',
    explanation: 'The 42nd Constitutional Amendment Act of 1976 added three new words—Socialist, Secular, and Integrity—to the Preamble of the Indian Constitution.',
    explanationMl: '1976 ലെ 42-ാം ഭരണഘടനാ ഭേദഗതി ആക്റ്റ് ആണ് ഇന്ത്യൻ ഭരണഘടനയുടെ ആമുഖത്തിലേക്ക് സോഷ്യലിസ്റ്റ്, സെക്യുലർ, അഖണ്ഡത എന്നീ മൂന്ന് പുതിയ വാക്കുകൾ കൂട്ടിച്ചേർത്തത്.'
  },
  {
    id: 2,
    text: 'Who founded the Advaita Ashram at Aluva in 1913?',
    textMl: '1913-ൽ ആലുവയിൽ അദ്വൈതാശ്രമം സ്ഥാപിച്ചത് ആരാണ്?',
    optionA: 'Chattampi Swamikal',
    optionAMl: 'ചട്ടമ്പി സ്വാമികൾ',
    optionB: 'Sree Narayana Guru',
    optionBMl: 'ശ്രീ നാരായണ ഗുരു',
    optionC: 'Vagbhatananda',
    optionCMl: 'വാഗ്ഭടാനന്ദൻ',
    optionD: 'Brahmananda Sivayogi',
    optionDMl: 'ബ്രഹ്മാനന്ദ ശിവയോഗി',
    correctOption: 'B',
    explanation: 'Sree Narayana Guru established the Advaita Ashram at Aluva in 1913 with the motto "One Caste, One Religion, One God for Man".',
    explanationMl: '1913-ൽ ശ്രീ നാരായണ ഗുരുവാണ് ആലുവ അദ്വൈതാശ്രമം സ്ഥാപിച്ചത്.'
  },
  {
    id: 3,
    text: 'Identify the Malayalam Sandhi type in the word "കൺപീലി" (കൺ + പീലി)?',
    textMl: '"കൺപീലി" (കൺ + പീലി) എന്ന പദത്തിലെ സന്ധി ഏതാണ്?',
    optionA: 'ആദേശസന്ധി (Aadesa Sandhi)',
    optionAMl: 'ആദേശസന്ധി',
    optionB: 'ലോപസന്ധി (Lopa Sandhi)',
    optionBMl: 'ലോപസന്ധി',
    optionC: 'ആഗമസന്ധി (Aagama Sandhi)',
    optionCMl: 'ആഗമസന്ധി',
    optionD: 'ദ്വിത്വസന്ധി (Dwitwa Sandhi)',
    optionDMl: 'ദ്വിത്വസന്ധി',
    correctOption: 'A',
    explanation: 'In Aadesa Sandhi, one letter is replaced by another letter.',
    explanationMl: 'ഒരു വർണ്ണത്തിന് പകരം വേറൊരു വർണ്ണം വരുന്നതാണ് ആദേശസന്ധി.'
  },
  {
    id: 4,
    text: 'What is the minimum age required for election as the President of India under Article 58?',
    textMl: 'ആർട്ടിക്കിൾ 58 പ്രകാരം ഇന്ത്യൻ രാഷ്ട്രപതിയായി തിരഞ്ഞെടുക്കപ്പെടുന്നതിന് വേണ്ട കുറഞ്ഞ പ്രായം എത്രയാണ്?',
    optionA: '25 Years', optionAMl: '25 വയസ്സ്',
    optionB: '30 Years', optionBMl: '30 വയസ്സ്',
    optionC: '35 Years', optionCMl: '35 വയസ്സ്',
    optionD: '21 Years', optionDMl: '21 വയസ്സ്',
    correctOption: 'C',
    explanation: 'Under Article 58, a candidate must be at least 35 years of age.',
    explanationMl: 'ഭരണഘടനയുടെ ആർട്ടിക്കിൾ 58 പ്രകാരം രാഷ്ട്രപതി സ്ഥാനാർത്ഥിക്ക് കുറഞ്ഞത് 35 വയസ്സ് തികഞ്ഞിരിക്കണം.'
  },
  {
    id: 5,
    text: 'Which is the highest peak in South India?',
    textMl: 'ദക്ഷിണേന്ത്യയിലെ ഏറ്റവും ഉയരം കൂടിയ കൊടുമുടി ഏതാണ്?',
    optionA: 'Doddabetta', optionAMl: 'ദൊഡ്ഡബെട്ട',
    optionB: 'Anamudi', optionBMl: 'ആനമുടി',
    optionC: 'Agasthyarkoodam', optionCMl: 'അഗസ്ത്യാർകൂടം',
    optionD: 'Mullayanagiri', optionDMl: 'മുളളയ്യനഗിരി',
    correctOption: 'B',
    explanation: 'Anamudi (2,695m) in Idukki, Kerala is the highest peak in South India.',
    explanationMl: 'ഇടുക്കി ജില്ലയിലെ ആനമുടിയാണ് ദക്ഷിണേന്ത്യയിലെ ഏറ്റവും ഉയരം കൂടിയ കൊടുമുടി.'
  }
];

class CloudDatabase {
  constructor() {
    this.data = {
      questions: initialQuestions,
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
        if (!this.data.questions || this.data.questions.length < initialQuestions.length) {
          this.data.questions = initialQuestions;
          this.saveData();
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
    if (requestedCount <= 0 || list.length >= requestedCount) {
      return list;
    }

    // Procedurally extend list if requested count exceeds stored questions
    let nextId = list.length + 1;
    while (list.length < requestedCount) {
      const i = list.length;
      const p = (i + 1) * 2500;
      const r = 5 + (i % 6);
      const n = 2 + (i % 3);
      const si = (p * r * n) / 100;

      list.push({
        id: nextId++,
        text: `[Q${i + 1}] Calculate Simple Interest on ₹${p} at ${r}% per annum for ${n} years:`,
        textMl: `[ചോദ്യം ${i + 1}] ₹${p} ന് പ്രതിവർഷം ${r}% നിരക്കിൽ ${n} വർഷത്തേക്ക് ലഭിക്കുന്ന സാധാരണ പലിശ എത്ര?`,
        optionA: `₹${si}`, optionAMl: `₹${si}`,
        optionB: `₹${si + 100}`, optionBMl: `₹${si + 100}`,
        optionC: `₹${si - 50}`, optionCMl: `₹${si - 50}`,
        optionD: `₹${si + 200}`, optionDMl: `₹${si + 200}`,
        correctOption: 'A',
        explanation: `Simple Interest = (P × R × N) / 100 = (${p} × ${r} × ${n}) / 100 = ₹${si}.`,
        explanationMl: `സാധാരണ പലിശ = (P × R × N) / 100 = ₹${si}.`
      });
    }

    return list;
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
