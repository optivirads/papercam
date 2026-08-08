import React, { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  HelpCircle,
  Download,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Clock,
  Play
} from 'lucide-react';

interface TopicWorkspaceScreenProps {
  courseId: string;
  topicId: string;
  onBackToCourse: () => void;
  onStartExam: (questionCount: number) => void;
}

export const TopicWorkspaceScreen: React.FC<TopicWorkspaceScreenProps> = ({
  onBackToCourse,
  onStartExam
}) => {
  const [activeTab, setActiveTab] = useState<'description' | 'materials' | 'quiz'>('description');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isPdfDownloaded, setIsPdfDownloaded] = useState<boolean>(true);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);
  const [pdfPage, setPdfPage] = useState<number>(1);

  const questionCountOptions = [10, 20, 30, 50];

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-24 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      {/* Top Header Bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBackToCourse}
          className="p-1.5 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-extrabold text-[#ffc000] tracking-wider uppercase font-sans">
          PSC GOLD
        </h1>
      </div>

      {/* Breadcrumbs & Lesson Titles */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <span className="bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
            Indian Polity
          </span>
          <span>•</span>
          <span className="text-emerald-400">Module 2: Constitution</span>
        </div>

        <h2 className="text-2xl font-extrabold text-white leading-snug tracking-tight">
          Indian Constitution - Preamble & Basic Structure
        </h2>

        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          Master the fundamental philosophy of the Indian Constitution. Crucial for Degree Level Prelims and KAS examinations.
        </p>
      </div>

      {/* Video Lesson Player Container */}
      <div className="relative w-full aspect-video rounded-2xl bg-black overflow-hidden border border-slate-800 shadow-2xl group">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80"
          alt="Indian Constitution Lesson"
          className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        <button
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          aria-label="Play Lesson Video"
        >
          <div className="w-14 h-14 rounded-full bg-[#ffc000] flex items-center justify-center text-[#0d1322] shadow-2xl hover:scale-110 active:scale-95 transition-transform">
            <Play className="w-6 h-6 fill-current ml-1" />
          </div>
        </button>

        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800/80">
          <div className="bg-[#ffc000] h-full w-[45%]" />
        </div>
      </div>

      {/* Duration & Mark as Completed Card */}
      <div className="rounded-2xl bg-[#141c2e] border border-slate-800 p-4 space-y-3.5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
            <Clock className="w-5 h-5 text-[#2ed573]" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Duration: 45 Minutes</div>
            <div className="text-[11px] font-medium text-slate-400">Recommended Study Time</div>
          </div>
        </div>

        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
            isCompleted
              ? 'bg-[#2ed573] text-[#0d1322] shadow-[#2ed573]/20'
              : 'bg-[#ffc000] text-[#0d1322] hover:brightness-110 shadow-[#ffc000]/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          <span>{isCompleted ? 'Completed ✔️' : 'Mark as Completed'}</span>
        </button>
      </div>

      {/* Segmented Tabs Navigation */}
      <div className="flex border-b border-slate-800 pt-1">
        <button
          onClick={() => setActiveTab('description')}
          className={`pb-3 px-4 font-bold text-xs transition-all relative cursor-pointer ${
            activeTab === 'description'
              ? 'text-[#ffc000]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Description</span>
          {activeTab === 'description' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffc000] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('materials')}
          className={`pb-3 px-4 font-bold text-xs transition-all relative cursor-pointer ${
            activeTab === 'materials'
              ? 'text-[#ffc000]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Materials (2)</span>
          {activeTab === 'materials' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffc000] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`pb-3 px-4 font-bold text-xs transition-all relative cursor-pointer ${
            activeTab === 'quiz'
              ? 'text-[#ffc000]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Practice Quiz</span>
          {activeTab === 'quiz' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffc000] rounded-full" />
          )}
        </button>
      </div>

      {/* TAB CONTENT 1: DESCRIPTION */}
      {activeTab === 'description' && (
        <div className="space-y-4 pt-1 animate-fade-in">
          <h3 className="text-lg font-extrabold text-white">
            Key Takeaways for PSC Exams
          </h3>

          <div className="space-y-3 text-xs leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="text-[#ffc000] font-bold text-sm shrink-0 mt-0.5">▸</span>
              <div>
                <strong className="text-white font-bold">Objective Resolution:</strong> Drafted by Jawaharlal Nehru in 1946, it forms the basis of the Preamble. Frequently asked in LDC exams.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="text-[#ffc000] font-bold text-sm shrink-0 mt-0.5">▸</span>
              <div>
                <strong className="text-white font-bold">42nd Amendment (1976):</strong> Added three new words: <i>Socialist, Secular, and Integrity</i>. Known as the 'Mini Constitution'.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="text-[#ffc000] font-bold text-sm shrink-0 mt-0.5">▸</span>
              <div>
                <strong className="text-white font-bold">Kesavananda Bharati Case (1973):</strong> Supreme Court held that the Preamble is a part of the Constitution and established the 'Basic Structure Doctrine'. Essential for KAS mains.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0e1422] border-l-4 border-[#2ed573] border-y border-r border-slate-800 space-y-1.5 shadow-md">
            <span className="text-[10px] font-extrabold text-[#2ed573] uppercase tracking-wider block">
              Previous Year Question Alert
            </span>
            <p className="text-xs text-slate-200 font-medium italic leading-relaxed">
              "The ideals of Liberty, Equality, and Fraternity in our Preamble have been taken from which revolution?" — <strong className="not-italic text-[#ffc000] font-bold">(Ans: French Revolution)</strong>
            </p>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: MATERIALS */}
      {activeTab === 'materials' && (
        <div className="space-y-4 pt-1 animate-fade-in">
          <div className="flex items-center justify-between bg-[#141c2e] border border-slate-800 rounded-2xl p-3.5 shadow-md">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#ffc000]" />
              <div>
                <div className="text-xs font-bold text-white">Polity_Topic01_Notes.pdf</div>
                <div className="text-[10px] text-slate-400">2.4 MB • Offline View Enabled</div>
              </div>
            </div>

            <button
              onClick={() => setIsPdfDownloaded(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isPdfDownloaded
                  ? 'bg-[#2ed573]/20 text-[#2ed573] border border-[#2ed573]/40'
                  : 'bg-[#ffc000] text-[#0d1322]'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isPdfDownloaded ? 'Downloaded' : 'Download PDF'}</span>
            </button>
          </div>

          <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-5 min-h-[350px] shadow-inner flex flex-col justify-between">
            <div className="space-y-3 text-slate-300 text-xs leading-relaxed font-sans">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
                <span className="font-extrabold text-[#ffc000] uppercase text-[11px]">
                  Kerala PSC Study Notes • Page {pdfPage} of 6
                </span>
                <Bookmark className="w-4 h-4 text-slate-400 hover:text-[#ffc000] cursor-pointer" />
              </div>

              <h4 className="text-base font-extrabold text-white mt-2">
                1. The Preamble of the Indian Constitution
              </h4>
              <p>
                The Preamble serves as the introduction to the Constitution. It is based on the <strong>'Objective Resolution'</strong> drafted and moved by Pandit Jawaharlal Nehru on 13 December 1946.
              </p>
              <div className="bg-[#141c2e] p-3 rounded-xl border border-slate-800 text-slate-200 font-semibold text-xs my-2">
                <strong>Key Words in Preamble:</strong> SOVEREIGN, SOCIALIST, SECULAR, DEMOCRATIC, REPUBLIC, JUSTICE, LIBERTY, EQUALITY, FRATERNITY.
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <button
                disabled={pdfPage === 1}
                onClick={() => setPdfPage(pdfPage - 1)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-40 text-xs font-bold cursor-pointer"
              >
                Previous Page
              </button>
              <span className="text-xs font-bold text-slate-400">
                Page {pdfPage} / 6
              </span>
              <button
                disabled={pdfPage === 6}
                onClick={() => setPdfPage(pdfPage + 1)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-40 text-xs font-bold cursor-pointer"
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: PRACTICE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-[#141c2e] border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#ffc000]/15 border border-[#ffc000]/30 text-[#ffc000] flex items-center justify-center">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-[#2ed573] uppercase">
                Practice Exam Launcher
              </span>
              <h3 className="text-base font-extrabold text-white leading-tight">
                Topic Question Bank: 35 Questions
              </h3>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2.5">
              Select Number of Questions to Attempt:
            </label>

            <div className="grid grid-cols-4 gap-2">
              {questionCountOptions.map((count) => (
                <button
                  key={count}
                  onClick={() => setSelectedQuestionCount(count)}
                  className={`py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                    selectedQuestionCount === count
                      ? 'bg-[#ffc000] text-[#0d1322] border-[#ffc000] shadow-md'
                      : 'bg-[#0e1422] text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {count} Qs
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onStartExam(selectedQuestionCount)}
            className="w-full py-3.5 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-sm hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#ffc000]/20 flex items-center justify-center gap-2"
          >
            <span>Start Practice Exam ({selectedQuestionCount} Questions)</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* FOOTER */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold">
        <button
          onClick={onBackToCourse}
          className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-slate-400" />
          <span>Prev</span>
        </button>

        <button
          onClick={onBackToCourse}
          className="flex items-center gap-1 text-[#ffc000] hover:underline transition-all cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4 text-[#ffc000]" />
        </button>
      </div>

    </div>
  );
};
