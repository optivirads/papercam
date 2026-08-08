import React, { useState, useEffect } from 'react';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Trophy,
  Target,
  FileEdit,
  TrendingUp,
  Landmark,
  Calculator,
  Globe,
  Languages
} from 'lucide-react';

import { apiService } from '../../services/api';
import { getExpandedQuestionBank } from '../../services/pscQuestionBank';

interface ExamRunnerScreenProps {
  questionCount: number;
  testTitle?: string;
  onFinishExam?: () => void;
  onExitExam: () => void;
}

export interface Question {
  id: number;
  text: string;
  textMl?: string;
  optionA: string;
  optionAMl?: string;
  optionB: string;
  optionBMl?: string;
  optionC: string;
  optionCMl?: string;
  optionD: string;
  optionDMl?: string;
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  explanationMl?: string;
  relatedFacts?: string[];
}

export const ExamRunnerScreen: React.FC<ExamRunnerScreenProps> = ({
  questionCount,
  testTitle = 'Kerala Administrative Service - Pre-lims Mock 4',
  onExitExam
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(questionCount * 45);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showReviewList, setShowReviewList] = useState<boolean>(false);

  const [examLanguage, setExamLanguage] = useState<'en' | 'ml'>('en');

  useEffect(() => {
    async function loadQuestions() {
      const targetCount = questionCount > 0 ? questionCount : 20;
      setSecondsLeft(targetCount * 45);

      let fetchedFromApi: Question[] = [];

      try {
        fetchedFromApi = await apiService.getQuestions(targetCount);
      } catch {
        // Fallback
      }

      // If we don't have enough local/cached questions, dynamically fetch from the Internet!
      if (fetchedFromApi.length < targetCount) {
        try {
          const internetQ = await apiService.fetchQuestionsFromInternet(targetCount);
          if (internetQ && internetQ.length > 0) {
            fetchedFromApi = [...fetchedFromApi, ...internetQ];
          }
        } catch {
          // Fallback to procedural generator if internet is offline
        }
      }

      if (fetchedFromApi.length >= targetCount) {
        const selected = [...fetchedFromApi].sort(() => 0.5 - Math.random()).slice(0, targetCount);
        setQuestions(selected);
        return;
      }

      // Guaranteed fallback: generate exactly targetCount questions procedurally
      const expanded = getExpandedQuestionBank(targetCount);
      setQuestions(expanded);
    }
    loadQuestions();
  }, [questionCount]);

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: option
    });
  };

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((q, idx) => {
      const userAns = selectedAnswers[idx];
      if (!userAns) {
        unanswered++;
      } else if (userAns === q.correctOption) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const calculatedAcc = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
    const pscScore = Math.max(0, Number((correct - (incorrect * 0.33)).toFixed(2)));

    return { accuracy: calculatedAcc, score: pscScore, correct, incorrect, unanswered };
  };

  const handleSubmitExam = async () => {
    const stats = calculateScore();
    setIsSubmitted(true);

    const timeSpent = (questionCount * 60) - secondsLeft;

    await apiService.recordExamSession({
      id: `exam-${Date.now()}`,
      testTitle,
      timestamp: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      totalQuestions: questions.length,
      correctAnswers: stats.correct,
      wrongAnswers: stats.incorrect,
      unanswered: stats.unanswered,
      score: stats.score,
      percentage: stats.accuracy,
      timeSpentSeconds: timeSpent > 0 ? timeSpent : 30
    });
  };

  if (questions.length === 0) return null;
  const currentQuestion = questions[currentIndex];
  const { accuracy, score } = calculateScore();

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-65px)] pb-24 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onExitExam}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                Mock Test Analysis
              </h1>
              <p className="text-xs font-medium text-slate-400 mt-0.5">
                {testTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center bg-[#141c2e] border border-slate-800 rounded-xl p-1 text-[11px] font-bold">
            <button
              onClick={() => setExamLanguage('en')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                examLanguage === 'en'
                  ? 'bg-[#ffc000] text-[#0d1322]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setExamLanguage('ml')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                examLanguage === 'ml'
                  ? 'bg-[#ffc000] text-[#0d1322]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ML
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-[#141c2e] border border-slate-800/80 p-6 shadow-xl text-center space-y-5">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block text-left">
            Overall Score
          </span>

          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#1e293b"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#ffc000"
                strokeWidth="8"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 * (1 - score / 100)}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-[#ffc000]">{score}</span>
              <span className="text-xs font-bold text-slate-400 mt-0.5">/ 100</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#2ed573]">
            <TrendingUp className="w-4 h-4" />
            <span>Top 5% Performance</span>
          </div>
        </div>

        <div className="rounded-2xl bg-[#141c2e] border border-slate-800/80 p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              State Rank
            </span>
            <div className="text-2xl font-extrabold text-white">
              124 <span className="text-xs font-bold text-slate-400">/ 5,000</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center text-amber-400 border border-slate-700/60">
            <Trophy className="w-6 h-6" />
          </div>
        </div>

        <div className="rounded-2xl bg-[#141c2e] border border-slate-800/80 p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Accuracy
            </span>
            <div className="text-2xl font-extrabold text-white">
              {accuracy}%
            </div>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center text-teal-400 border border-slate-700/60">
            <Target className="w-6 h-6" />
          </div>
        </div>

        <button
          onClick={() => setShowReviewList(!showReviewList)}
          className="w-full py-3.5 px-4 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#ffc000]/20"
        >
          <FileEdit className="w-4 h-4 stroke-[2.5]" />
          <span>{showReviewList ? 'Hide Detailed Solutions' : 'Review Questions & Solutions'}</span>
        </button>

        {!showReviewList && (
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-extrabold text-white">
              Sectional Breakdown
            </h2>

            <div className="rounded-2xl bg-[#141c2e] border border-slate-800/80 p-4 space-y-2.5 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold text-white">Kerala History</h3>
                </div>
                <span className="text-xs font-extrabold text-[#2ed573]">95%</span>
              </div>
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                <div className="bg-[#2ed573] h-full rounded-full" style={{ width: '95%' }} />
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Strong performance. Focus maintained.</p>
            </div>

            <div className="rounded-2xl bg-[#141c2e] border border-slate-800/80 p-4 space-y-2.5 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Calculator className="w-4 h-4 text-[#ffc000]" />
                  <h3 className="text-xs font-bold text-white">Math</h3>
                </div>
                <span className="text-xs font-extrabold text-[#ffc000]">80%</span>
              </div>
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                <div className="bg-[#ffc000] h-full rounded-full" style={{ width: '80%' }} />
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Room for improvement in algebra.</p>
            </div>

            <div className="rounded-2xl bg-[#141c2e] border border-slate-800/80 p-4 space-y-2.5 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-rose-400" />
                  <h3 className="text-xs font-bold text-white">English</h3>
                </div>
                <span className="text-xs font-extrabold text-rose-400">65%</span>
              </div>
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                <div className="bg-[#f87171] h-full rounded-full" style={{ width: '65%' }} />
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Review grammar and vocabulary.</p>
            </div>
          </div>
        )}

        {showReviewList && (
          <div className="space-y-3.5 pt-2 animate-fade-in">
            <h3 className="text-sm font-extrabold text-white">
              Detailed Question Solutions & Related Facts
            </h3>

            {questions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isRight = userAns === q.correctOption;

              const textToDisplay = examLanguage === 'ml' && q.textMl ? q.textMl : q.text;
              const optionAText = examLanguage === 'ml' && q.optionAMl ? q.optionAMl : q.optionA;
              const optionBText = examLanguage === 'ml' && q.optionBMl ? q.optionBMl : q.optionB;
              const optionCText = examLanguage === 'ml' && q.optionCMl ? q.optionCMl : q.optionC;
              const optionDText = examLanguage === 'ml' && q.optionDMl ? q.optionDMl : q.optionD;
              const explanationText = examLanguage === 'ml' && q.explanationMl ? q.explanationMl : q.explanation;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border ${
                    isRight
                      ? 'bg-[#141c2e] border-emerald-500/30'
                      : userAns
                      ? 'bg-[#141c2e] border-rose-500/30'
                      : 'bg-[#141c2e] border-amber-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-400">
                      Q{idx + 1}.
                    </span>
                    {isRight ? (
                      <span className="text-[10px] font-extrabold text-[#2ed573] bg-[#2ed573]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Correct
                      </span>
                    ) : userAns ? (
                      <span className="text-[10px] font-extrabold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Incorrect
                      </span>
                    ) : (
                      <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        Skipped
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-bold text-white mb-3 leading-relaxed">
                    {textToDisplay}
                  </p>

                  <div className="space-y-1.5 text-xs">
                    <div className={`p-2 rounded-lg ${q.correctOption === 'A' ? 'bg-[#2ed573]/20 text-[#2ed573] font-bold' : userAns === 'A' ? 'bg-rose-500/20 text-rose-300' : 'bg-[#0e1422] text-slate-300'}`}>
                      A) {optionAText}
                    </div>
                    <div className={`p-2 rounded-lg ${q.correctOption === 'B' ? 'bg-[#2ed573]/20 text-[#2ed573] font-bold' : userAns === 'B' ? 'bg-rose-500/20 text-rose-300' : 'bg-[#0e1422] text-slate-300'}`}>
                      B) {optionBText}
                    </div>
                    <div className={`p-2 rounded-lg ${q.correctOption === 'C' ? 'bg-[#2ed573]/20 text-[#2ed573] font-bold' : userAns === 'C' ? 'bg-rose-500/20 text-rose-300' : 'bg-[#0e1422] text-slate-300'}`}>
                      C) {optionCText}
                    </div>
                    <div className={`p-2 rounded-lg ${q.correctOption === 'D' ? 'bg-[#2ed573]/20 text-[#2ed573] font-bold' : userAns === 'D' ? 'bg-rose-500/20 text-rose-300' : 'bg-[#0e1422] text-slate-300'}`}>
                      D) {optionDText}
                    </div>
                  </div>

                  <div className="mt-3 p-3 rounded-xl bg-[#0e1422] border border-slate-800 text-xs text-slate-300 space-y-2">
                    <div>
                      <strong className="text-[#ffc000] block text-[11px] uppercase mb-0.5">Explanation:</strong>
                      <p className="leading-relaxed text-slate-300">{explanationText}</p>
                    </div>

                    {q.relatedFacts && q.relatedFacts.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/80">
                        <strong className="text-[#2ed573] flex items-center gap-1 text-[11px] uppercase mb-1 font-extrabold">
                          💡 Related PSC Facts & Extra Points:
                        </strong>
                        <ul className="space-y-1 pl-1 text-[11px] text-slate-300">
                          {q.relatedFacts.map((fact, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-1.5">
                              <span className="text-[#ffc000] font-bold">•</span>
                              <span className="leading-relaxed">{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    );
  }

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  const questionTextToDisplay = examLanguage === 'ml' && currentQuestion.textMl ? currentQuestion.textMl : currentQuestion.text;
  const optionA = examLanguage === 'ml' && currentQuestion.optionAMl ? currentQuestion.optionAMl : currentQuestion.optionA;
  const optionB = examLanguage === 'ml' && currentQuestion.optionBMl ? currentQuestion.optionBMl : currentQuestion.optionB;
  const optionC = examLanguage === 'ml' && currentQuestion.optionCMl ? currentQuestion.optionCMl : currentQuestion.optionC;
  const optionD = examLanguage === 'ml' && currentQuestion.optionDMl ? currentQuestion.optionDMl : currentQuestion.optionD;

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-24 px-2 sm:px-5 pt-4 space-y-4 max-w-full mx-auto animate-fade-in text-slate-100">
      
      <div className="flex items-center justify-between bg-[#141c2e] border border-slate-800 rounded-2xl p-3.5 shadow-md">
        <div>
          <span className="text-[10px] font-bold text-[#ffc000] uppercase">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
            {testTitle}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#0e1422] border border-slate-800 rounded-xl p-1 text-[11px] font-bold">
            <button
              onClick={() => setExamLanguage('en')}
              className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                examLanguage === 'en'
                  ? 'bg-[#ffc000] text-[#0d1322] shadow-sm font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
            <button
              onClick={() => setExamLanguage('ml')}
              className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                examLanguage === 'ml'
                  ? 'bg-[#ffc000] text-[#0d1322] shadow-sm font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇮🇳</span>
              <span>ML</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-[#0e1422] px-3 py-1.5 rounded-xl border border-slate-800 text-amber-400 font-extrabold text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(secondsLeft)}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#141c2e] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
            <Languages className="w-3 h-3 text-[#ffc000]" />
            <span>Medium: {examLanguage === 'en' ? 'English' : 'മലയാളം'}</span>
          </span>

          <span className="text-[10px] text-slate-400 font-bold">
            PSC Exam Medium
          </span>
        </div>

        <h3 className="text-sm font-extrabold text-white leading-relaxed">
          {questionTextToDisplay}
        </h3>

        <div className="space-y-2.5 pt-1">
          {(['A', 'B', 'C', 'D'] as const).map((optionKey) => {
            const isSelected = selectedAnswers[currentIndex] === optionKey;
            const optionText =
              optionKey === 'A'
                ? optionA
                : optionKey === 'B'
                ? optionB
                : optionKey === 'C'
                ? optionC
                : optionD;

            return (
              <button
                key={optionKey}
                onClick={() => handleSelectOption(optionKey)}
                className={`w-full p-3.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#ffc000] text-[#0d1322] border-[#ffc000] shadow-md font-extrabold'
                    : 'bg-[#0e1422] text-slate-200 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>
                  <strong className="mr-2">{optionKey}.</strong> {optionText}
                </span>

                {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0d1322] shrink-0" />}
              </button>
            );
          })}
        </div>

      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 disabled:opacity-40 text-xs font-bold cursor-pointer hover:bg-slate-700"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmitExam}
            className="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-[#2ed573] text-[#0d1322] text-xs font-extrabold cursor-pointer hover:brightness-110 shadow-md"
          >
            <span>Submit Examination</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-[#ffc000] text-[#0d1322] text-xs font-extrabold cursor-pointer hover:brightness-110 shadow-md"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};
