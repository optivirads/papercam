import React, { useState } from 'react';
import {
  Award,
  Clock,
  CheckCircle2,
  FileQuestion,
  ChevronRight,
  Search,
  FileText
} from 'lucide-react';
import type { NavTab } from '../../types';
import { BottomNav } from '../common/BottomNav';

interface MockTestsScreenProps {
  onStartFullMockExam: (testTitle: string, questionCount: number) => void;
  onNavigateTab: (tab: NavTab) => void;
}

export interface FullMockTest {
  id: string;
  category: 'Topic-Wise' | 'PYQ Paper' | '10th Prelims' | 'VFA Special' | '12th Prelims' | 'Degree Level';
  title: string;
  description: string;
  totalQuestions: number;
  durationMinutes: number;
  maxMarks: number;
  negativeMarking: string;
  isAttempted: boolean;
  userScore?: number;
  userRank?: string;
  accuracyPercent?: number;
  sourcePdfName?: string;
}

export const mockFullExamSeries: FullMockTest[] = [
  {
    id: 'exam-topic-1',
    category: 'Topic-Wise',
    title: 'Malayalam Sandhi Rules - Topic Test',
    description: 'Topic-specific test focusing on Aadesa, Lopama, Aagama, and Vikaara sandhi question patterns.',
    totalQuestions: 30,
    durationMinutes: 25,
    maxMarks: 30,
    negativeMarking: '-0.33 per wrong answer',
    isAttempted: true,
    userScore: 28,
    userRank: '42 / 3k+',
    accuracyPercent: 93
  },
  {
    id: 'exam-topic-2',
    category: 'Topic-Wise',
    title: 'Indian Constitution Preamble & Articles Test',
    description: 'Topic-wise test covering fundamental rights, duties, and constitutional amendments.',
    totalQuestions: 40,
    durationMinutes: 30,
    maxMarks: 40,
    negativeMarking: '-0.33 per wrong answer',
    isAttempted: false
  },
  {
    id: 'exam-topic-3',
    category: 'Topic-Wise',
    title: 'Kerala Renaissance Reformers Speed Quiz',
    description: 'Topic test on Chattampi Swamikal, Sree Narayana Guru, Ayyankali, and Vaikom Satyagraha.',
    totalQuestions: 25,
    durationMinutes: 20,
    maxMarks: 25,
    negativeMarking: '-0.33 per wrong answer',
    isAttempted: false
  },
  {
    id: 'exam-pdf-1',
    category: 'PYQ Paper',
    title: 'LDC 2023 Official Question Paper (PYQ Set A)',
    description: 'Official Previous Year Question Paper (PYQ). Contains 100 questions with AI researched answer keys.',
    totalQuestions: 100,
    durationMinutes: 75,
    maxMarks: 100,
    negativeMarking: '-0.33 per wrong answer',
    isAttempted: true,
    userScore: 85,
    userRank: '124 / 5k+',
    accuracyPercent: 88,
    sourcePdfName: 'Kerala_PSC_LDC_2023_QuestionPaper.pdf'
  },
  {
    id: 'exam-pdf-2',
    category: 'PYQ Paper',
    title: 'VFA 2022 Previous Year Solved PYQ Paper',
    description: 'Official VFA PYQ paper grouped together with detailed step-by-step solutions.',
    totalQuestions: 50,
    durationMinutes: 45,
    maxMarks: 50,
    negativeMarking: '-0.33 per wrong answer',
    isAttempted: false,
    sourcePdfName: 'VFA_2022_Official_Paper.pdf'
  },
  {
    id: 'exam-10th-1',
    category: '10th Prelims',
    title: '10th Level Preliminary Full Mock Test #1',
    description: 'Complete 100-question model examination based on latest Kerala PSC 10th level prelims syllabus.',
    totalQuestions: 100,
    durationMinutes: 75,
    maxMarks: 100,
    negativeMarking: '-0.33 per wrong answer',
    isAttempted: false
  },
  {
    id: 'exam-vfa-1',
    category: 'VFA Special',
    title: 'VFA (Village Field Assistant) Special Speed Test',
    description: 'Targeted high-yield model paper for upcoming VFA recruitment exam with detailed solutions.',
    totalQuestions: 50,
    durationMinutes: 45,
    maxMarks: 50,
    negativeMarking: '-0.33 per wrong answer',
    isAttempted: false
  },
  {
    id: 'exam-12th-1',
    category: '12th Prelims',
    title: '12th Level Preliminary (CPO / Fireman) Mock Test',
    description: 'Intermediate level model paper covering Science, Technology, Geography, and Mental Ability.',
    totalQuestions: 100,
    durationMinutes: 75,
    maxMarks: 100,
    negativeMarking: '-0.33 per wrong answer',
    isAttempted: false
  },
  {
    id: 'exam-degree-1',
    category: 'Degree Level',
    title: 'Degree Level Preliminary Grand Mock Test',
    description: 'Advanced level exam for Secretariat Assistant, University Assistant, and SI preliminary screening.',
    totalQuestions: 100,
    durationMinutes: 75,
    maxMarks: 100,
    negativeMarking: '-0.33 per wrong answer',
    isAttempted: false
  }
];

export const MockTestsScreen: React.FC<MockTestsScreenProps> = ({
  onStartFullMockExam,
  onNavigateTab
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Topic-Wise', 'PYQ Papers', '10th Prelims', 'VFA Special', '12th Prelims', 'Degree Level'];

  const filteredExams = mockFullExamSeries.filter((exam) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'PYQ Papers' && exam.category === 'PYQ Paper') ||
      exam.category === selectedCategory;

    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-24 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      <div>
        <span className="text-[11px] font-bold text-[#ffc000] uppercase tracking-wider">
          Exam Series & Question Papers
        </span>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Kerala PSC Mock Tests
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-0.5">
          Attempt topic-wise exams, uploaded PDF question papers, or full preliminary model tests.
        </p>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search topic tests, LDC 2023 PDF, VFA mock tests..."
          className="w-full bg-[#141c2e] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ffc000] transition-colors"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#ffc000] text-[#0d1322] shadow-md shadow-[#ffc000]/20'
                : 'bg-[#141c2e] text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4 pt-1">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className={`rounded-2xl border p-5 transition-all shadow-lg ${
              exam.isAttempted
                ? 'bg-[#141c2e] border-emerald-500/30'
                : 'bg-[#141c2e] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-extrabold text-[#ffc000] bg-[#ffc000]/10 px-2.5 py-0.5 rounded-full inline-block">
                    {exam.category}
                  </span>

                  {exam.sourcePdfName && (
                    <span className="text-[10px] font-extrabold text-[#2ed573] bg-[#2ed573]/10 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#2ed573]/20">
                      <FileText className="w-3 h-3" /> PDF Grouped Set
                    </span>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-white leading-snug">
                  {exam.title}
                </h3>
              </div>

              {exam.isAttempted && (
                <span className="text-[10px] font-extrabold text-[#2ed573] bg-[#2ed573]/10 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3 h-3" /> Attempted
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {exam.description}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 p-3 bg-[#0e1422] rounded-xl border border-slate-800/60 text-[11px] font-semibold text-slate-300">
              <div className="flex items-center gap-1.5">
                <FileQuestion className="w-3.5 h-3.5 text-[#ffc000]" />
                <span>{exam.totalQuestions} Qs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>{exam.durationMinutes} Mins</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#2ed573]" />
                <span>{exam.maxMarks} Marks</span>
              </div>
            </div>

            {exam.isAttempted && exam.userScore !== undefined && (
              <div className="mt-3 flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Your Score</span>
                  <span className="text-base font-extrabold text-[#2ed573]">{exam.userScore} / {exam.maxMarks}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">State Rank</span>
                  <span className="text-sm font-extrabold text-[#ffc000]">{exam.userRank}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Accuracy</span>
                  <span className="text-sm font-extrabold text-[#2ed573]">{exam.accuracyPercent}%</span>
                </div>
              </div>
            )}

            <button
              onClick={() => onStartExamOrRetake(exam)}
              className={`w-full mt-4 py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                exam.isAttempted
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  : 'bg-[#ffc000] text-[#0d1322] hover:brightness-110 shadow-[#ffc000]/15'
              }`}
            >
              <span>{exam.isAttempted ? 'Retake Exam / Review Solutions' : 'Start Examination'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>
        ))}
      </div>

      <BottomNav activeTab="tests" onNavigateTab={onNavigateTab} />
    </div>
  );

  function onStartExamOrRetake(exam: FullMockTest) {
    onStartFullMockExam(exam.title, 10);
  }
};
