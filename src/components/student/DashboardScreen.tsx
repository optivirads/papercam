import React, { useState } from 'react';
import {
  Award,
  Clock,
  Play,
  ArrowRight,
  ClipboardList,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Target,
  FileCheck,
  X,
  Download,
  FileText
} from 'lucide-react';
import type { NavTab } from '../../types';
import { BottomNav } from '../common/BottomNav';

import { apiService } from '../../services/api';

interface DashboardScreenProps {
  studentName?: string;
  onNavigateTab: (tab: NavTab) => void;
  activeTab: NavTab;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  studentName = 'PSC Aspirant',
  onNavigateTab,
  activeTab
}) => {
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; isMe?: boolean }>>([
    { sender: 'Anand K.', text: 'Sir, please explain Sandhi rules with previous PSC questions.' },
    { sender: 'Deepa N.', text: 'Is this covered in 10th prelims syllabus?' },
    { sender: 'Mentor Madhavan', text: 'Welcome everyone! Today we will focus on Aadesa & Lopama sandhi.' }
  ]);
  const [newChatText, setNewChatText] = useState('');

  const [realTestsCount, setRealTestsCount] = useState<number>(0);
  const [realAccuracy, setRealAccuracy] = useState<number>(0);

  useEffect(() => {
    async function loadStats() {
      const results = await apiService.getExamResults();
      if (results && results.length > 0) {
        setRealTestsCount(results.length);
        const avgAcc = Math.round(
          results.reduce((sum, r) => sum + (r.percentage || 0), 0) / results.length
        );
        setRealAccuracy(avgAcc);
      }
    }
    loadStats();
  }, []);

  const downloadedMaterials = [
    { id: 'pdf1', title: 'Indian Constitution - Preamble & Articles.pdf', size: '2.4 MB', subject: 'Polity' },
    { id: 'pdf2', title: 'Malayalam Sandhi Rules Summary.pdf', size: '1.1 MB', subject: 'Language' },
    { id: 'pdf3', title: 'Kerala Renaissance Leaders Timeline.pdf', size: '3.8 MB', subject: 'History' },
  ];

  const recentCourses = [
    { id: 'c1', title: 'Degree Level Preliminary 2024', topicsCount: 32, progress: 68, iconColor: 'text-[#ffc000]' },
    { id: 'c2', title: 'LP / UP Assistant Special Batch', topicsCount: 24, progress: 30, iconColor: 'text-[#2ed573]' },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-28 px-2 sm:px-5 pt-4 space-y-6 max-w-full mx-auto relative bg-dot-pattern text-slate-100">
      
      {/* Welcome Greeting */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Hello, <span className="text-white">{studentName}</span>
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-1">
          Ready to continue your preparation for the Kerala PSC exams?
        </p>
      </div>

      {/* QUICK METRICS HIGHLIGHT */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-[#141c2e] border border-slate-800/80 rounded-xl p-3 text-center shadow-md">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-[#2ed573] flex items-center justify-center mx-auto mb-1.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-base font-extrabold text-white">24 / 40</div>
          <div className="text-[10px] font-semibold text-slate-400 mt-0.5">Topics Done</div>
        </div>

        <div className="bg-[#141c2e] border border-slate-800/80 rounded-xl p-3 text-center shadow-md">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-[#ffc000] flex items-center justify-center mx-auto mb-1.5">
            <Target className="w-4 h-4" />
          </div>
          <div className="text-base font-extrabold text-white">{realAccuracy > 0 ? `${realAccuracy}%` : '84%'}</div>
          <div className="text-[10px] font-semibold text-slate-400 mt-0.5">Accuracy</div>
        </div>

        <div className="bg-[#141c2e] border border-slate-800/80 rounded-xl p-3 text-center shadow-md">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-1.5">
            <FileCheck className="w-4 h-4" />
          </div>
          <div className="text-base font-extrabold text-white">{realTestsCount > 0 ? realTestsCount : 18}</div>
          <div className="text-[10px] font-semibold text-slate-400 mt-0.5">Tests Taken</div>
        </div>
      </div>

      {/* CARD 1: CURRENT FOCUS */}
      <div className="relative overflow-hidden rounded-2xl bg-[#141c2e] border border-slate-800/80 p-5 shadow-lg group hover:border-slate-700/80 transition-all">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Current Focus
            </span>
            <h2 className="text-xl font-extrabold text-white mt-1 leading-tight">
              LDC 2024 - Intensive Batch
            </h2>
          </div>
          
          <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-[#ffc000] shadow-inner">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center text-sm font-bold mb-2">
            <span className="text-slate-400 text-xs font-semibold">Course Progress</span>
            <span className="text-[#2ed573] text-lg font-extrabold">45%</span>
          </div>
          <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-[#2ed573] h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: '45%' }}
            />
          </div>
        </div>
      </div>

      {/* RECENT BATCHES */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white">Enrolled Batches</h3>
          <button
            onClick={() => onNavigateTab('courses')}
            className="text-xs font-bold text-[#ffc000] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {recentCourses.map((c) => (
            <div
              key={c.id}
              onClick={() => onNavigateTab('courses')}
              className="bg-[#141c2e] border border-slate-800/80 p-3.5 rounded-xl space-y-2 cursor-pointer hover:border-slate-700 transition-all shadow-md group"
            >
              <div className={`text-xs font-extrabold truncate ${c.iconColor}`}>
                {c.title}
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                {c.topicsCount} Topics • {c.progress}% done
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#ffc000] h-full rounded-full"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 2: LIVE TONIGHT */}
      <div className="rounded-2xl bg-[#141c2e] border border-amber-500/20 p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-extrabold tracking-wider uppercase">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Live Tonight</span>
        </div>

        <h3 className="text-lg font-bold text-white mt-2.5">
          Malayalam Grammar - Sandhi
        </h3>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-300 mt-1.5">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>7:00 PM (Starts in 45 mins)</span>
        </div>

        <button
          onClick={() => setShowLiveModal(true)}
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#172036] hover:bg-[#1f2b48] border border-[#ffc000]/40 text-[#ffc000] font-bold text-sm transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Join Waiting Room</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* CARD 3: RESUME LEARNING */}
      <div className="rounded-2xl bg-[#141c2e] border border-slate-800/80 overflow-hidden shadow-lg group">
        <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80"
            alt="Indian Constitution"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141c2e] via-transparent to-black/30" />

          <button
            onClick={() => onNavigateTab('learning')}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            aria-label="Resume Video Lesson"
          >
            <div className="w-14 h-14 rounded-full bg-[#ffc000] flex items-center justify-center text-[#0d1322] shadow-xl hover:scale-110 active:scale-95 transition-transform">
              <Play className="w-6 h-6 fill-current ml-1" />
            </div>
          </button>

          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-md border border-white/10">
            14:20 left
          </div>
        </div>

        <div className="p-5">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Resume Learning
          </span>
          <h3 className="text-lg font-extrabold text-white mt-1 leading-snug">
            Indian Constitution - Preamble & Basic Structure
          </h3>
          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            Dive deep into the foundational principles that shape the governance of India and prepare for PSC polity questions.
          </p>
        </div>
      </div>

      {/* CARD 4: RECENT MOCK TEST */}
      <div className="rounded-2xl bg-[#141c2e] border border-slate-800/80 p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center text-amber-400">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">
              Recent Mock Test
            </span>
            <h4 className="text-base font-extrabold text-white">
              Kerala Renaissance
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-[#0e1422] rounded-xl p-3.5 border border-slate-800/60">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Score</span>
            <div className="text-xl font-extrabold text-[#2ed573]">
              85 <span className="text-xs font-bold text-slate-400">/100</span>
            </div>
          </div>

          <div className="bg-[#0e1422] rounded-xl p-3.5 border border-slate-800/60">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Rank</span>
            <div className="text-xl font-extrabold text-[#ffc000]">
              124 <span className="text-xs font-bold text-slate-400">/5k+</span>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 5: DOWNLOADED STUDY MATERIALS */}
      <div className="rounded-2xl bg-[#141c2e] border border-slate-800/80 p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Offline Study Materials</h4>
              <p className="text-[11px] text-slate-400">3 PDFs available offline</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('downloads')}
            className="text-xs font-bold text-[#ffc000] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {downloadedMaterials.map((pdf) => (
            <div
              key={pdf.id}
              onClick={() => setShowPdfModal(pdf.title)}
              className="flex items-center justify-between p-3 rounded-xl bg-[#0e1422] border border-slate-800/50 hover:border-slate-700 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText className="w-4 h-4 text-[#ffc000] shrink-0" />
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-200 truncate group-hover:text-white">
                    {pdf.title}
                  </div>
                  <div className="text-[10px] text-slate-400">{pdf.subject} • {pdf.size}</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#2ed573] bg-[#2ed573]/10 px-2 py-0.5 rounded-full shrink-0">
                Downloaded
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: OFFLINE PDF VIEWER */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#141c2e] border border-slate-800 rounded-2xl p-5 max-w-sm w-full shadow-2xl relative animate-fade-in space-y-4">
            <button
              onClick={() => setShowPdfModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#ffc000]">
              <FileText className="w-5 h-5" />
              <span className="text-xs font-extrabold uppercase">Offline Document</span>
            </div>

            <h3 className="text-sm font-extrabold text-white leading-snug">
              {showPdfModal}
            </h3>

            <div className="bg-[#0e1422] border border-slate-800 rounded-xl p-4 text-xs space-y-3 text-slate-300">
              <p className="leading-relaxed">
                This study PDF is available offline on your device storage cache. You can read high-yield Kerala PSC notes and PYQ answer keys anytime without internet connection.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-[#2ed573] font-bold">
                <span>✓ Cached Offline</span>
                <button
                  onClick={() => {
                    setShowPdfModal(null);
                    onNavigateTab('downloads');
                  }}
                  className="text-[#ffc000] hover:underline cursor-pointer"
                >
                  Open in Offline Reader →
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowPdfModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer"
            >
              Close Reader
            </button>
          </div>
        </div>
      )}

      {/* MODAL: LIVE WAITING ROOM & STREAMING LECTURE */}
      {showLiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#141c2e] border border-amber-500/30 rounded-2xl p-5 max-w-sm w-full shadow-2xl relative animate-fade-in space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowLiveModal(false);
                setIsLiveStreaming(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isLiveStreaming ? (
              <>
                <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-1">
                  <Sparkles className="w-6 h-6 animate-spin" />
                </div>

                <h3 className="text-lg font-extrabold text-white text-center">
                  Malayalam Grammar - Sandhi
                </h3>
                <p className="text-xs text-slate-400 text-center">
                  Live interactive lecture with Mentor Madhavan starting at 7:00 PM.
                </p>

                <div className="p-3.5 rounded-xl bg-[#0e1422] text-center border border-slate-800 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 block">Waiting Room Status</span>
                  <div className="text-sm font-extrabold text-[#2ed573]">
                    ● 142 Aspirants Waiting
                  </div>
                </div>

                <button
                  onClick={() => setIsLiveStreaming(true)}
                  className="w-full py-3.5 rounded-xl bg-[#ffc000] text-[#0d1322] font-black text-xs hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-[#ffc000]/20"
                >
                  Enter Live Room Now
                </button>
              </>
            ) : (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-rose-500/20">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> LIVE NOW
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">142 Watching</span>
                </div>

                <div className="relative aspect-video rounded-xl bg-black overflow-hidden border border-slate-800 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80"
                    alt="Live Lecture Stream"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-bold text-amber-400">
                    Mentor Madhavan Live
                  </div>
                </div>

                <div className="bg-[#0e1422] border border-slate-800 rounded-xl p-3 space-y-2 max-h-40 overflow-y-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Live Student Chat</span>
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`text-[11px] leading-tight ${msg.isMe ? 'text-amber-300 font-bold' : 'text-slate-200'}`}>
                      <strong className="text-[#ffc000]">{msg.sender}: </strong>
                      <span>{msg.text}</span>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newChatText.trim()) return;
                    setChatMessages([...chatMessages, { sender: studentName, text: newChatText, isMe: true }]);
                    setNewChatText('');
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={newChatText}
                    onChange={(e) => setNewChatText(e.target.value)}
                    placeholder="Ask a question in live chat..."
                    className="flex-1 bg-[#0e1422] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffc000]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#ffc000] text-[#0d1322] rounded-xl font-extrabold text-xs cursor-pointer hover:brightness-110"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BOTTOM NAV BAR */}
      <BottomNav activeTab={activeTab} onNavigateTab={onNavigateTab} />

    </div>
  );
};

