import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Search,
  ArrowUpRight
} from 'lucide-react';

export interface StudentRecord {
  id: string;
  initials: string;
  name: string;
  district: string;
  targetExam: string;
  stateRank: number;
  mockTestsCount: number;
  avgAccuracy: number;
  lastActive: string;
  status: 'active' | 'inactive';
}

const mockStudentRecords: StudentRecord[] = [
  {
    id: 'st-1',
    initials: 'AK',
    name: 'Anand Kumar',
    district: 'Thiruvananthapuram',
    targetExam: 'KAS & Degree Level',
    stateRank: 1,
    mockTestsCount: 54,
    avgAccuracy: 94,
    lastActive: '2 mins ago',
    status: 'active'
  },
  {
    id: 'st-2',
    initials: 'SM',
    name: 'Suresh Madhavan',
    district: 'Kozhikode',
    targetExam: 'LDC 10th Prelims',
    stateRank: 124,
    mockTestsCount: 47,
    avgAccuracy: 88,
    lastActive: '15 mins ago',
    status: 'active'
  },
  {
    id: 'st-3',
    initials: 'DN',
    name: 'Deepa Nambiar',
    district: 'Ernakulam',
    targetExam: 'VFA Special',
    stateRank: 450,
    mockTestsCount: 38,
    avgAccuracy: 82,
    lastActive: '1 hour ago',
    status: 'active'
  },
  {
    id: 'st-4',
    initials: 'VT',
    name: 'Vishnu T.',
    district: 'Palakkad',
    targetExam: '12th Prelims CPO',
    stateRank: 890,
    mockTestsCount: 29,
    avgAccuracy: 76,
    lastActive: '3 hours ago',
    status: 'active'
  }
];

export const AdminAnalyticsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'students'>('analytics');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStudents = mockStudentRecords.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-24 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      <div>
        <span className="text-[11px] font-bold text-[#ffc000] uppercase tracking-wider">
          Admin CMS • Platform Performance
        </span>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Performance Analytics
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-0.5">
          Macro-level student engagement, completion rates, and rank tracking.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#141c2e] border border-slate-800 rounded-2xl shadow-md">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-[#ffc000] text-[#0d1322] shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Macro Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'students'
              ? 'bg-[#ffc000] text-[#0d1322] shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Records</span>
        </button>
      </div>

      {activeTab === 'analytics' && (
        <div className="space-y-4 animate-fade-in">
          
          <div className="flex items-center justify-between bg-[#141c2e] border border-slate-800 rounded-2xl p-3 shadow-md text-xs font-bold">
            <span className="text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#ffc000]" />
              <span>Range: Last 30 Days</span>
            </span>
            <span className="text-[11px] text-[#2ed573] font-extrabold bg-[#2ed573]/10 px-2.5 py-0.5 rounded-full border border-[#2ed573]/20">
              Live Data
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#141c2e] border border-slate-800 p-4 space-y-2 shadow-lg">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Active Students
              </span>
              <div className="text-2xl font-extrabold text-[#ffc000]">
                24,850
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#2ed573]">
                <ArrowUpRight className="w-3 h-3" /> +12.4% this month
              </div>
            </div>

            <div className="rounded-2xl bg-[#141c2e] border border-slate-800 p-4 space-y-2 shadow-lg">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Total Tests Taken
              </span>
              <div className="text-2xl font-extrabold text-white">
                142,600
              </div>
              <div className="text-[10px] text-slate-400 font-semibold">
                Across Prelims & PYQs
              </div>
            </div>

            <div className="rounded-2xl bg-[#141c2e] border border-slate-800 p-4 space-y-2 shadow-lg">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Avg Accuracy Rate
              </span>
              <div className="text-2xl font-extrabold text-teal-400">
                68.4%
              </div>
              <div className="text-[10px] text-slate-400 font-semibold">
                Statewide average
              </div>
            </div>

            <div className="rounded-2xl bg-[#141c2e] border border-slate-800 p-4 space-y-2 shadow-lg">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Completion Rate
              </span>
              <div className="text-2xl font-extrabold text-[#2ed573]">
                84.2%
              </div>
              <div className="text-[10px] text-slate-400 font-semibold">
                Topic workspace lessons
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#141c2e] border border-slate-800 p-5 space-y-3 shadow-xl">
            <h3 className="text-xs font-extrabold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#ffc000]" />
              <span>Weekly Exam Attempt Trends</span>
            </h3>

            <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2">
              {[
                { day: 'Mon', height: '65%', val: '18k' },
                { day: 'Tue', height: '80%', val: '22k' },
                { day: 'Wed', height: '45%', val: '12k' },
                { day: 'Thu', height: '90%', val: '25k' },
                { day: 'Fri', height: '70%', val: '19k' },
                { day: 'Sat', height: '95%', val: '28k' },
                { day: 'Sun', height: '85%', val: '24k' }
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[9px] font-extrabold text-[#ffc000] opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.val}
                  </span>
                  <div
                    className="w-full bg-[#1e293b] group-hover:bg-[#ffc000] rounded-t-lg transition-colors"
                    style={{ height: bar.height }}
                  />
                  <span className="text-[10px] font-bold text-slate-400">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {activeTab === 'students' && (
        <div className="space-y-4 animate-fade-in">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student name, district, or rank..."
              className="w-full bg-[#141c2e] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffc000] transition-colors"
            />
          </div>

          <div className="space-y-3">
            {filteredStudents.map((st) => (
              <div
                key={st.id}
                className="rounded-2xl bg-[#141c2e] border border-slate-800 p-4 space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0d1322] border border-[#ffc000]/40 text-[#ffc000] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-md">
                      {st.initials}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white leading-snug">
                        {st.name}
                      </h4>
                      <div className="text-[10px] text-slate-400 font-semibold">
                        {st.district} • {st.targetExam}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold text-[#ffc000] bg-[#ffc000]/10 px-2.5 py-1 rounded-full border border-[#ffc000]/20">
                    State Rank #{st.stateRank}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-2.5 bg-[#0d1322] rounded-xl border border-slate-800 text-[10px] font-semibold text-slate-300 text-center">
                  <div>
                    <span className="text-slate-400 block">Tests Taken</span>
                    <span className="text-xs font-extrabold text-white">{st.mockTestsCount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Avg Accuracy</span>
                    <span className="text-xs font-extrabold text-[#2ed573]">{st.avgAccuracy}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Last Active</span>
                    <span className="text-[10px] font-bold text-amber-400">{st.lastActive}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
