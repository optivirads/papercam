import { initialPscQuestionBank } from './pscQuestionBank';
import type { Question } from '../components/student/ExamRunnerScreen';
import type { StudentProfileForm } from '../types';
import type { AdminStudentRecord } from '../components/admin/AdminStudentRecordsScreen';

const DB_NAME = 'papercam_psc_master_db';
const DB_VERSION = 1;

export interface ExamResultRecord {
  id: string;
  testTitle: string;
  timestamp: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
}

export interface CourseRecord {
  id: string;
  title: string;
  examTag: string;
  totalTopics: number;
  completedTopics: number;
  thumbnailUrl: string;
}

// No hardcoded default profiles — profiles are created during onboarding.

class IndexedDbManager {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private initDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result as IDBDatabase;

        if (!db.objectStoreNames.contains('questions')) {
          db.createObjectStore('questions', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('student_profile')) {
          db.createObjectStore('student_profile', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('exam_results')) {
          db.createObjectStore('exam_results', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('student_records')) {
          db.createObjectStore('student_records', { keyPath: 'id' });
        }
      };

      request.onsuccess = (event: any) => {
        const db = event.target.result as IDBDatabase;
        this.seedInitialData(db).then(() => resolve(db));
      };

      request.onerror = (event: any) => {
        console.warn('IndexedDB failed to open, falling back to localStorage:', event.target.error);
        reject(event.target.error);
      };
    });

    return this.dbPromise;
  }

  private async seedInitialData(db: IDBDatabase): Promise<void> {
    // Seed question bank only — no fake profiles or student records
    const transaction = db.transaction(['questions'], 'readwrite');
    const questionStore = transaction.objectStore('questions');
    const countReq = questionStore.count();
    countReq.onsuccess = () => {
      if (countReq.result === 0) {
        initialPscQuestionBank.forEach((q) => questionStore.put(q));
      }
    };
  }

  // --- Questions Methods ---
  async getQuestions(): Promise<Question[]> {
    try {
      const db = await this.initDB();
      return new Promise((resolve) => {
        const tx = db.transaction('questions', 'readonly');
        const store = tx.objectStore('questions');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || initialPscQuestionBank);
        req.onerror = () => resolve(this.getLocalStorage('questions', initialPscQuestionBank));
      });
    } catch {
      return this.getLocalStorage('questions', initialPscQuestionBank);
    }
  }

  async saveQuestion(question: Question): Promise<void> {
    try {
      const db = await this.initDB();
      const tx = db.transaction('questions', 'readwrite');
      tx.objectStore('questions').put(question);
    } catch {
      const list = this.getLocalStorage('questions', initialPscQuestionBank);
      const updated = [question, ...list.filter((q: Question) => q.id !== question.id)];
      this.setLocalStorage('questions', updated);
    }
  }

  async deleteQuestion(id: number | string): Promise<void> {
    try {
      const db = await this.initDB();
      const tx = db.transaction('questions', 'readwrite');
      tx.objectStore('questions').delete(id);
    } catch {
      const list = this.getLocalStorage('questions', initialPscQuestionBank);
      this.setLocalStorage('questions', list.filter((q: Question) => q.id !== id));
    }
  }

  // --- Profile Methods ---
  async getProfile(): Promise<StudentProfileForm | null> {
    try {
      const db = await this.initDB();
      return new Promise((resolve) => {
        const tx = db.transaction('student_profile', 'readonly');
        const req = tx.objectStore('student_profile').get('main');
        req.onsuccess = () => {
          if (req.result) {
            const { id, ...profileData } = req.result;
            resolve(profileData as StudentProfileForm);
          } else {
            resolve(this.getLocalStorage<StudentProfileForm | null>('student_profile', null));
          }
        };
        req.onerror = () => resolve(this.getLocalStorage<StudentProfileForm | null>('student_profile', null));
      });
    } catch {
      return this.getLocalStorage<StudentProfileForm | null>('student_profile', null);
    }
  }

  async saveProfile(profile: StudentProfileForm): Promise<void> {
    try {
      const db = await this.initDB();
      const tx = db.transaction('student_profile', 'readwrite');
      tx.objectStore('student_profile').put({ id: 'main', ...profile });
    } catch {
      this.setLocalStorage('student_profile', profile);
    }
  }

  // --- Exam Results Methods ---
  async getExamResults(): Promise<ExamResultRecord[]> {
    try {
      const db = await this.initDB();
      return new Promise((resolve) => {
        const tx = db.transaction('exam_results', 'readonly');
        const req = tx.objectStore('exam_results').getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve(this.getLocalStorage('exam_results', []));
      });
    } catch {
      return this.getLocalStorage('exam_results', []);
    }
  }

  async saveExamResult(result: ExamResultRecord): Promise<void> {
    try {
      const db = await this.initDB();
      const tx = db.transaction('exam_results', 'readwrite');
      tx.objectStore('exam_results').put(result);
    } catch {
      const list = this.getLocalStorage('exam_results', []);
      this.setLocalStorage('exam_results', [result, ...list]);
    }
  }

  // --- Admin Student Records Methods ---
  async getAdminStudents(): Promise<AdminStudentRecord[]> {
    try {
      const db = await this.initDB();
      return new Promise((resolve) => {
        const tx = db.transaction('student_records', 'readonly');
        const req = tx.objectStore('student_records').getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve(this.getLocalStorage('student_records', []));
      });
    } catch {
      return this.getLocalStorage('student_records', []);
    }
  }

  async saveAdminStudent(student: AdminStudentRecord): Promise<void> {
    try {
      const db = await this.initDB();
      const tx = db.transaction('student_records', 'readwrite');
      tx.objectStore('student_records').put(student);
    } catch {
      const list = this.getLocalStorage('student_records', []);
      const updated = [student, ...list.filter((s: AdminStudentRecord) => s.id !== student.id)];
      this.setLocalStorage('student_records', updated);
    }
  }

  // LocalStorage Fallback Helpers
  private getLocalStorage<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(`papercam_${key}`);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  private setLocalStorage<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`papercam_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage write failed:', e);
    }
  }
}

export const dbService = new IndexedDbManager();
