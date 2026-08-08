import type { Question } from '../components/student/ExamRunnerScreen';
import { apiService } from './api';

function decodeHtmlEntities(str: string): string {
  if (typeof document !== 'undefined') {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&deg;/g, '°');
}

export class InternetQuestionFetcher {
  /**
   * Dynamically fetches live quiz & Trivia questions from internet APIs (OpenTDB)
   */
  public static async fetchQuestionsFromInternet(amount: number = 20): Promise<Question[]> {
    try {
      const targetAmount = Math.min(Math.max(amount, 5), 50);
      const response = await fetch(`https://opentdb.com/api.php?amount=${targetAmount}&type=multiple`);
      
      if (!response.ok) return [];

      const data = await response.json();
      if (!data.results || !Array.isArray(data.results)) return [];

      const questions: Question[] = data.results.map((item: any, index: number) => {
        const text = decodeHtmlEntities(item.question);
        const correctAnswer = decodeHtmlEntities(item.correct_answer);
        const incorrectAnswers = item.incorrect_answers.map((ans: string) => decodeHtmlEntities(ans));

        // Combine and shuffle options
        const allOptions = [correctAnswer, ...incorrectAnswers].sort(() => 0.5 - Math.random());
        const correctIndex = allOptions.indexOf(correctAnswer);
        const optionKeys: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
        const correctOption = optionKeys[correctIndex] || 'A';

        const categoryTag = item.category ? decodeHtmlEntities(item.category) : 'General Knowledge';

        return {
          id: Date.now() + index + Math.floor(Math.random() * 10000),
          text: text,
          textMl: `[ഇന്റർനെറ്റ് ചോദ്യബാങ്ക് - ${categoryTag}] ${text}`,
          optionA: allOptions[0] || '',
          optionAMl: allOptions[0] || '',
          optionB: allOptions[1] || '',
          optionBMl: allOptions[1] || '',
          optionC: allOptions[2] || '',
          optionCMl: allOptions[2] || '',
          optionD: allOptions[3] || '',
          optionDMl: allOptions[3] || '',
          correctOption: correctOption,
          explanation: `Correct Answer: "${correctAnswer}". Category: ${categoryTag}. Difficulty: ${item.difficulty || 'medium'}.`,
          explanationMl: `ശരിയായ ഉത്തരം: "${correctAnswer}". വിഭാഗം: ${categoryTag}.`,
          relatedFacts: [
            `Category: ${categoryTag}`,
            `Source: Open Trivia DB (Internet Live API)`,
            `Difficulty: ${item.difficulty || 'Medium'}`
          ]
        };
      });

      // Save newly fetched questions to local database and backend
      for (const q of questions) {
        apiService.saveQuestion(q).catch(() => {});
      }

      return questions;
    } catch (error) {
      console.warn('Internet question fetch failed or offline:', error);
      return [];
    }
  }
}
