import type { Question } from '../components/student/ExamRunnerScreen';

export const initialPscQuestionBank: Question[] = [];

/**
 * Returns stored questions or empty pool.
 */
export function getExpandedQuestionBank(requestedCount: number = 0): Question[] {
  if (requestedCount <= 0) return [];
  return initialPscQuestionBank.slice(0, requestedCount);
}
