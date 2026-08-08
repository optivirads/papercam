import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  PlayCircle,
  ChevronRight,
  Flame,
  Search
} from 'lucide-react';
import type { NavTab } from '../../types';
import { BottomNav } from '../common/BottomNav';

interface MyLearningScreenProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenTopicWorkspace: (courseId: string, topicId: string) => void;
}

export interface EnrolledCourse {
  id: string;
  title: string;
  subjectTag: string;
  completedTopics: number;
  totalTopics: number;
  progressPercent: number;
  lastTopicId: string;
  lastTopicTitle: string;
  thumbnailUrl: string;
  isCompleted: boolean;
}

const initialEnrolledCourses: EnrolledCourse[] = [
  {
    id: 'course-polity-1',
    title: 'Indian Constitution & Governance',
    subjectTag: 'Indian Polity',
    completedTopics: 4,
    totalTopics: 9,
    progressPercent: 45,
    lastTopicId: 'top-1',
    lastTopicTitle: 'Indian Constitution - Preamble & Basic Structure',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    isCompleted: false
  },
  {
    id: 'course-hist-1',
    title: 'Kerala History & Social Renaissance',
    subjectTag: 'History',
    completedTopics: 6,
    totalTopics: 10,
    progressPercent: 60,
    lastTopicId: 'top-hist-1',
    lastTopicTitle: 'Social Reform Movements & Reformers in Kerala',
    thumbnailUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80',
    isCompleted: false
  },
  {
    id: 'course-math-1',
    title: 'Quantitative Aptitude & Mental Ability',
    subjectTag: 'Maths',
    completedTopics: 2,
    totalTopics: 8,
    progressPercent: 25,
    lastTopicId: 'top-math-1',
    lastTopicTitle: 'Ratio & Proportion Shortcut Formulas',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    isCompleted: false
  },
  {
    id: 'course-malayalam-1',
    title: 'Malayalam Grammar & Literature',
    subjectTag: 'Malayalam',
    completedTopics: 8,
    totalTopics: 8,
    progressPercent: 100,
    lastTopicId: 'top-mal-8',
    lastTopicTitle: 'Famous Malayalam Authors & Kerala Sahitya Akademi Awards',
    thumbnailUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80',
    isCompleted: true
  }
];

export const MyLearningScreen: React.FC<MyLearningScreenProps> = ({
  onNavigateTab,
  onOpenTopicWorkspace
}) => {
  const [courses] = useState<EnrolledCourse[]>(initialEnrolledCourses);
  const [activeTab, setActiveTab] = useState<'in_progress' | 'completed' | 'saved'>('in_progress');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const inProgressCourses = courses.filter((c) => !c.isCompleted);
  const completedCourses = courses.filter((c) => c.isCompleted);

  const currentDisplayCourses =
    activeTab === 'completed'
      ? completedCourses
      : activeTab === 'in_progress'
      ? inProgressCourses
      : courses;

  const filteredCourses = currentDisplayCourses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subjectTag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-28 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      <div>
        <span className="text-[11px] font-bold text-[#ffc000] uppercase tracking-wider">
          Student Learning Dashboard
        </span>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          My Enrolled Courses
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-0.5">
          Track your enrolled courses, sequential topic progress, and continue learning.
        </p>
      </div>

      <div className="rounded-2xl bg-[#141c2e] border border-slate-800 p-5 space-y-3.5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#ffc000]">
            <GraduationCap className="w-5 h-5" />
            <span>Overall Learning Progress</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <Flame className="w-4 h-4 fill-current text-amber-400" />
            <span>7 Day Streak</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-white">18 / 35 Topics Completed</span>
            <span className="text-[#2ed573]">51%</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div className="bg-[#2ed573] h-full rounded-full transition-all duration-500" style={{ width: '51%' }} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-semibold text-slate-300 text-center">
          <div className="bg-[#0d1322] p-2 rounded-xl border border-slate-800">
            <span className="text-xs font-extrabold text-[#ffc000] block">{inProgressCourses.length}</span>
            <span className="text-[10px] text-slate-400">In Progress</span>
          </div>
          <div className="bg-[#0d1322] p-2 rounded-xl border border-slate-800">
            <span className="text-xs font-extrabold text-[#2ed573] block">{completedCourses.length}</span>
            <span className="text-[10px] text-slate-400">Completed</span>
          </div>
          <div className="bg-[#0d1322] p-2 rounded-xl border border-slate-800">
            <span className="text-xs font-extrabold text-indigo-400 block">4</span>
            <span className="text-[10px] text-slate-400">Total Enrolled</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search enrolled courses (Polity, History, Maths)..."
          className="w-full bg-[#141c2e] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffc000] transition-colors"
        />
      </div>

      <div className="flex border-b border-slate-800 pt-1">
        <button
          onClick={() => setActiveTab('in_progress')}
          className={`pb-3 px-4 font-bold text-xs transition-all relative cursor-pointer ${
            activeTab === 'in_progress' ? 'text-[#ffc000]' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>In Progress ({inProgressCourses.length})</span>
          {activeTab === 'in_progress' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffc000] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 px-4 font-bold text-xs transition-all relative cursor-pointer ${
            activeTab === 'completed' ? 'text-[#ffc000]' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Completed ({completedCourses.length})</span>
          {activeTab === 'completed' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffc000] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 px-4 font-bold text-xs transition-all relative cursor-pointer ${
            activeTab === 'saved' ? 'text-[#ffc000]' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>All Enrolled</span>
          {activeTab === 'saved' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffc000] rounded-full" />
          )}
        </button>
      </div>

      <div className="space-y-4 pt-1">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className={`rounded-2xl border p-5 space-y-4 shadow-xl transition-all ${
              course.isCompleted
                ? 'bg-[#141c2e] border-emerald-500/30'
                : 'bg-[#141c2e] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-extrabold text-[#ffc000] bg-[#ffc000]/10 px-2.5 py-0.5 rounded-full inline-block">
                    {course.subjectTag}
                  </span>
                  {course.isCompleted && (
                    <span className="text-[10px] font-extrabold text-[#2ed573] bg-[#2ed573]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-white leading-snug">
                  {course.title}
                </h3>
              </div>
            </div>

            <div className="space-y-1.5 bg-[#0d1322] p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">
                  {course.completedTopics} of {course.totalTopics} Topics Completed
                </span>
                <span className="text-[#ffc000]">{course.progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    course.isCompleted ? 'bg-[#2ed573]' : 'bg-[#ffc000]'
                  }`}
                  style={{ width: `${course.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <PlayCircle className="w-4 h-4 text-[#ffc000] shrink-0" />
              <span className="truncate">Current Focus: <strong>{course.lastTopicTitle}</strong></span>
            </div>

            <button
              onClick={() => onOpenTopicWorkspace(course.id, course.lastTopicId)}
              className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                course.isCompleted
                  ? 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
                  : 'bg-[#ffc000] text-[#0d1322] hover:brightness-110 shadow-[#ffc000]/15'
              }`}
            >
              <span>{course.isCompleted ? 'Review Course Lessons' : 'Continue Learning'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <BottomNav activeTab="learning" onNavigateTab={onNavigateTab} />

    </div>
  );
};
