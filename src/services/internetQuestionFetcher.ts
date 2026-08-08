import type { Question } from '../components/student/ExamRunnerScreen';
import { apiService } from './api';
import { initialPscQuestionBank, getExpandedQuestionBank } from './pscQuestionBank';

export class InternetQuestionFetcher {
  /**
   * Selects questions exclusively from official Kerala PSC Exam papers and syllabus repositories.
   */
  public static async fetchQuestionsFromInternet(amount: number = 20): Promise<Question[]> {
    try {
      const targetAmount = Math.min(Math.max(amount, 5), 100);

      // Select exclusively official Kerala PSC exam questions
      const pscQuestions = getExpandedQuestionBank(targetAmount);

      // Save to database asynchronously
      for (const q of pscQuestions) {
        apiService.saveQuestion(q).catch(() => {});
      }

      return pscQuestions;
    } catch (error) {
      console.warn('Kerala PSC exam question selection error:', error);
      return initialPscQuestionBank.slice(0, amount);
    }
  }
}
