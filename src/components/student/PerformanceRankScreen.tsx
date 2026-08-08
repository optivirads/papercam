import React, { useState, useEffect } from 'react';
import {
  Trophy,
  ArrowRight,
  Clock
} from 'lucide-react';
import type { NavTab } from '../../types';
import { BottomNav } from '../common/BottomNav';
import { apiService } from '../../services/api';
import type { ExamResultRecord } from '../../services/db';

interface PerformanceRankScreenProps {
  onNavigateTab: (tab: NavTab) => void;
  onViewAnalysis: () => void;
  onRetakeExam: () => void;
}

export const PerformanceRankScreen: React.FC<PerformanceRankScreenProps> = ({
  onNavigateTab,
  onViewAnalysis,
  onRetakeExam
}) => {
  const [activeSegment, setActiveSegment] = useState<'history' | 'leaderboard'>('history');
  const [examHistory, setExamHistory] = useState<ExamResultRecord[]>([]);

  useEffect(() => {
    async function loadHistory() {
      const history = await apiService.getExamResults();
      setExamHistory(history);
    }
    loadHistory();
  }, []);

  const topAspirants = [
    {
      rank: 1,
      name: 'Anjali Nair',
      avgScore: 98.5,
      percentile: '99%',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      rank: 2,
      name: 'Suresh Kumar',
      avgScore: 97.2,
      percentile: '98%',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      rank: 3,
      name: 'Deepa Nambiar',
      avgScore: 96.1,
      percentile: '96%',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-28 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Performance & Rank
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-0.5 leading-relaxed">
          Track your mock test history and see where you stand.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1 bg-[#141c2e] border border-slate-800 p-1.5 rounded-2xl shadow-md text-xs font-extrabold">
        <button
          onClick={() => setActiveSegment('history')}
          className={`py-2.5 rounded-xl transition-all cursor-pointer ${
            activeSegment === 'history'
              ? 'bg-[#1f2b45] text-white shadow-sm border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          History ({examHistory.length})
        </button>

        <button
          onClick={() => setActiveSegment('leaderboard')}
          className={`py-2.5 rounded-xl transition-all cursor-pointer ${
            activeSegment === 'leaderboard'
              ? 'bg-[#1f2b45] text-white shadow-sm border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Leaderboard
        </button>
      </div>

      {activeSegment === 'history' && (
        <div className="space-y-4 animate-fade-in">
          
          {examHistory.length > 0 ? (
            examHistory.map((item) => (
              <div key={item.id} className="rounded-3xl bg-[#141c2e] border border-slate-800 p-5 space-y-4 shadow-2xl relative">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold text-[#2ed573] bg-[#2ed573]/10 px-2.5 py-0.5 rounded-full border border-[#2ed573]/20">
                        COMPLETED
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {item.timestamp}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white leading-tight">
                      {item.testTitle}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-3xl font-black text-[#ffc000]">{item.score}</span>
                    <span className="text-xs font-extrabold text-slate-400 block">/ {item.totalQuestions} pts</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#0d1322] border border-slate-800/80 p-3 rounded-2xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-semibold block">Correct</span>
                    <span className="text-sm font-black text-[#2ed573]">{item.correctAnswers} / {item.totalQuestions}</span>
                  </div>

                  <div className="bg-[#0d1322] border border-slate-800/80 p-3 rounded-2xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-semibold block">Accuracy</span>
                    <span className="text-sm font-black text-[#ffc000]">{item.percentage}%</span>
                  </div>

                  <div className="bg-[#0d1322] border border-slate-800/80 p-3 rounded-2xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-semibold block">Time Spent</span>
                    <span className="text-sm font-black text-white">{Math.floor(item.timeSpentSeconds / 60)}m {item.timeSpentSeconds % 60}s</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={onViewAnalysis}
                    className="py-3 px-3 rounded-xl bg-transparent text-white font-extrabold text-xs flex items-center justify-center gap-1.5 hover:text-[#ffc000] cursor-pointer"
                  >
                    <span>View Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onRetakeExam}
                    className="py-3 px-3 rounded-xl bg-[#0d1322] border border-[#ffc000]/60 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 hover:bg-[#1a253d] cursor-pointer shadow-md"
                  >
                    <span>Retake Exam</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl bg-[#141c2e] border border-slate-800 p-6 text-center space-y-3">
              <Clock className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="text-sm font-extrabold text-white">No Attempted Mock Tests Yet</h3>
              <p className="text-xs text-slate-400">
                Attempt a mock test or practice quiz to start tracking your score history and performance analytics here!
              </p>
              <button
                onClick={onRetakeExam}
                className="px-5 py-2.5 rounded-xl bg-[#ffc000] text-[#0d1322] font-black text-xs cursor-pointer hover:brightness-110"
              >
                Start First Mock Test Now
              </button>
            </div>
          )}

          <div className="rounded-3xl bg-[#141c2e] border border-slate-800 p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>Top Aspirants</span>
              </h3>
              <Trophy className="w-5 h-5 text-[#ffc000]" />
            </div>

            <div className="space-y-2.5">
              {topAspirants.map((st) => (
                <div
                  key={st.rank}
                  className="p-3 bg-[#0d1322] border border-[#ffc000]/40 rounded-2xl flex items-center justify-between gap-3 relative overflow-hidden"
                >
                  {st.rank === 1 && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ffc000]" />
                  )}

                  <div className="flex items-center gap-3 pl-1">
                    <span className="text-sm font-black text-[#ffc000] w-4 text-center">
                      {st.rank}
                    </span>

                    <img
                      src={st.avatarUrl}
                      alt={st.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#ffc000]/40"
                    />

                    <div>
                      <h4 className="text-xs font-extrabold text-white leading-tight">
                        {st.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {st.avgScore} Avg Score
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-black text-[#2ed573] bg-[#2ed573]/10 px-2.5 py-1 rounded-full border border-[#2ed573]/20">
                    {st.percentile}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {activeSegment === 'leaderboard' && (
        <div className="space-y-3 animate-fade-in">
          <div className="rounded-3xl bg-[#141c2e] border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white">Statewide Rank Leaderboard</h3>
              <span className="text-xs font-extrabold text-[#ffc000]">5,000+ Participants</span>
            </div>

            <div className="space-y-2">
              {topAspirants.map((st) => (
                <div
                  key={st.rank}
                  className="p-3 bg-[#0d1322] border border-slate-800 rounded-2xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#ffc000] text-[#0d1322] font-black text-xs flex items-center justify-center">
                      #{st.rank}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-white block">{st.name}</span>
                      <span className="text-[10px] text-slate-400">{st.avgScore} pts</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#2ed573]">{st.percentile}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav activeTab="tests" onNavigateTab={onNavigateTab} />

    </div>
  );
};
