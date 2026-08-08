import { dbService, type ExamResultRecord } from './db';
import type { Question } from '../components/student/ExamRunnerScreen';
import type { StudentProfileForm } from '../types';
import type { AdminStudentRecord } from '../components/admin/AdminStudentRecordsScreen';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiService = {
  // Questions API
  async getQuestions(count?: number): Promise<Question[]> {
    try {
      const url = count ? `${API_BASE_URL}/questions?count=${count}` : `${API_BASE_URL}/questions`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
          return data.questions;
        }
      }
    } catch (e) {
      // Cloud API offline -> Fallback to local IndexedDB
    }
    return await dbService.getQuestions(count);
  },

  async fetchQuestionsFromInternet(amount: number = 20): Promise<Question[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/questions/fetch-internet?amount=${amount}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
          return data.questions;
        }
      }
    } catch (e) {
      // Fallback to direct client-side Internet fetch
    }
    const { InternetQuestionFetcher } = await import('./internetQuestionFetcher');
    return await InternetQuestionFetcher.fetchQuestionsFromInternet(amount);
  },

  async saveQuestion(question: Question): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question)
      });
    } catch (e) {
      // Offline fallback
    }
    await dbService.saveQuestion(question);
  },

  async deleteQuestion(id: number | string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/questions/${id}`, { method: 'DELETE' });
    } catch (e) {
      // Offline fallback
    }
    await dbService.deleteQuestion(id);
  },

  // Student Profile API
  async getProfile(): Promise<StudentProfileForm | null> {
    return await dbService.getProfile();
  },


  async updateProfile(profile: StudentProfileForm): Promise<void> {
    await dbService.saveProfile(profile);
  },

  // Exam Results & History API
  async getExamResults(): Promise<ExamResultRecord[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/exam-results`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.results) && data.results.length > 0) {
          return data.results;
        }
      }
    } catch (e) {
      // Fallback
    }
    return await dbService.getExamResults();
  },

  async recordExamSession(result: ExamResultRecord): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/exam-results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      });
    } catch (e) {
      // Fallback
    }
    await dbService.saveExamResult(result);
  },

  // Admin Student Records API
  async getAdminStudents(): Promise<AdminStudentRecord[]> {
    return await dbService.getAdminStudents();
  },

  async saveAdminStudent(student: AdminStudentRecord): Promise<void> {
    await dbService.saveAdminStudent(student);
  }
};
