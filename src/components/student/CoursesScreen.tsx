import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  PlayCircle,
  FileText,
  HelpCircle,
  CheckCircle2,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import type { NavTab } from '../../types';
import { BottomNav } from '../common/BottomNav';

interface CoursesScreenProps {
  onSelectTopicWorkspace: (courseId: string, topicId: string) => void;
  onNavigateTab: (tab: NavTab) => void;
}

export interface Course {
  id: string;
  category: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  totalTopics: number;
  completedTopics: number;
  progressPercent: number;
  isEnrolled: boolean;
  topics: TopicItem[];
}

export interface TopicItem {
  id: string;
  sequenceOrder: number;
  title: string;
  description: string;
  duration: string;
  isVideoCompleted: boolean;
  videoWatchTime: string;
  isPdfDownloaded: boolean;
  isPdfRead: boolean;
  isExamAttempted: boolean;
  examScore?: number;
  examMaxScore?: number;
  isLocked: boolean;
}

export const mockCourses: Course[] = [
  {
    id: 'c-malayalam',
    category: 'Malayalam',
    title: 'Malayalam Grammar & Literature',
    description: 'Comprehensive Kerala PSC Malayalam syllabus: Sandhi, Samaasam, Vaakya Shuddhi, Shabda Shuddhi, and famous literary works.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80',
    totalTopics: 12,
    completedTopics: 8,
    progressPercent: 66,
    isEnrolled: true,
    topics: [
      {
        id: 't-mal-1',
        sequenceOrder: 1,
        title: 'Malayalam Sandhi Rules - Aadesa, Lopama, Aagama & Vikaara',
        description: 'Detailed breakdown of Sandhi rules with previous year PSC question examples.',
        duration: '35 mins',
        isVideoCompleted: true,
        videoWatchTime: '35:00 / 35:00',
        isPdfDownloaded: true,
        isPdfRead: true,
        isExamAttempted: true,
        examScore: 9,
        examMaxScore: 10,
        isLocked: false
      },
      {
        id: 't-mal-2',
        sequenceOrder: 2,
        title: 'Samaasam Types - Tatpurushan, Karmadharayan & Bahuvreehi',
        description: 'Learn how to identify and classify compound Malayalam words instantly.',
        duration: '40 mins',
        isVideoCompleted: false,
        videoWatchTime: '15:20 / 40:00',
        isPdfDownloaded: true,
        isPdfRead: false,
        isExamAttempted: false,
        isLocked: false
      },
      {
        id: 't-mal-3',
        sequenceOrder: 3,
        title: 'Pazhamchollukal & Sailikal (Proverbs & Idioms)',
        description: 'Top 100 most repeated Kerala PSC proverbs and idioms with meanings.',
        duration: '30 mins',
        isVideoCompleted: false,
        videoWatchTime: '00:00 / 30:00',
        isPdfDownloaded: false,
        isPdfRead: false,
        isExamAttempted: false,
        isLocked: false
      }
    ]
  },
  {
    id: 'c-english',
    category: 'English',
    title: 'General English & Grammar Rules',
    description: 'Tenses, Subject-Verb Agreement, Direct & Indirect Speech, Active & Passive Voice, Vocabulary, and Synonyms.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80',
    totalTopics: 15,
    completedTopics: 5,
    progressPercent: 33,
    isEnrolled: true,
    topics: [
      {
        id: 't-eng-1',
        sequenceOrder: 1,
        title: 'Subject-Verb Agreement Rules for PSC Exams',
        description: 'Golden rules of Subject-Verb Agreement with exception cases and PYQs.',
        duration: '45 mins',
        isVideoCompleted: true,
        videoWatchTime: '45:00 / 45:00',
        isPdfDownloaded: true,
        isPdfRead: true,
        isExamAttempted: true,
        examScore: 10,
        examMaxScore: 10,
        isLocked: false
      },
      {
        id: 't-eng-2',
        sequenceOrder: 2,
        title: 'Active & Passive Voice Transformation',
        description: 'Shortcut tricks for changing voice across simple, continuous, and perfect tenses.',
        duration: '38 mins',
        isVideoCompleted: false,
        videoWatchTime: '00:00 / 38:00',
        isPdfDownloaded: false,
        isPdfRead: false,
        isExamAttempted: false,
        isLocked: false
      }
    ]
  },
  {
    id: 'c-history',
    category: 'History',
    title: 'Kerala & Indian History',
    description: 'Kerala Renaissance leaders, Freedom Movement, Ancient/Medieval India, and Post-Independence developments.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=80',
    totalTopics: 18,
    completedTopics: 9,
    progressPercent: 50,
    isEnrolled: true,
    topics: [
      {
        id: 't-hist-1',
        sequenceOrder: 1,
        title: 'Social Reform Movements & Reformers in Kerala',
        description: 'Chattampi Swamikal, Sree Narayana Guru, Ayyankali, and Pandit Karuppan contributions.',
        duration: '50 mins',
        isVideoCompleted: true,
        videoWatchTime: '50:00 / 50:00',
        isPdfDownloaded: true,
        isPdfRead: true,
        isExamAttempted: true,
        examScore: 10,
        examMaxScore: 10,
        isLocked: false
      }
    ]
  },
  {
    id: 'c-polity',
    category: 'Polity',
    title: 'Indian Constitution & Governance',
    description: 'Preamble, Fundamental Rights, Duties, President, Parliament, Judiciary, and Panchayati Raj system.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    totalTopics: 16,
    completedTopics: 7,
    progressPercent: 44,
    isEnrolled: true,
    topics: [
      {
        id: 't-pol-1',
        sequenceOrder: 1,
        title: 'Indian Constitution - Preamble & Basic Structure',
        description: 'Detailed analysis of Preamble, Fundamental Rights, and 42nd Constitutional Amendment.',
        duration: '45 mins',
        isVideoCompleted: true,
        videoWatchTime: '45:00 / 45:00',
        isPdfDownloaded: true,
        isPdfRead: true,
        isExamAttempted: true,
        examScore: 10,
        examMaxScore: 10,
        isLocked: false
      }
    ]
  },
  {
    id: 'c-maths',
    category: 'Maths',
    title: 'Quantitative Aptitude & Mental Ability',
    description: 'Simplification, Percentage, Ratio, Time & Distance, Work & Time, Coding-Decoding, and Number Series for PSC.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    totalTopics: 20,
    completedTopics: 4,
    progressPercent: 20,
    isEnrolled: true,
    topics: [
      {
        id: 't-math-1',
        sequenceOrder: 1,
        title: 'Percentage & Ratio Shortcuts',
        description: 'Step-by-step problem-solving shortcuts for PSC arithmetic problems.',
        duration: '48 mins',
        isVideoCompleted: false,
        videoWatchTime: '00:00 / 48:00',
        isPdfDownloaded: false,
        isPdfRead: false,
        isExamAttempted: false,
        isLocked: false
      }
    ]
  }
];

export const CoursesScreen: React.FC<CoursesScreenProps> = ({
  onSelectTopicWorkspace,
  onNavigateTab
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  const categories = ['All', 'Malayalam', 'English', 'History', 'Geography', 'Polity', 'Maths'];

  const filteredCourses = mockCourses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (activeCourse) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-65px)] pb-28 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveCourse(null)}
            className="p-2 -ml-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-bold text-[#ffc000] uppercase tracking-wider">
              {activeCourse.category} Syllabus
            </span>
            <h1 className="text-xl font-extrabold text-white leading-tight">
              {activeCourse.title}
            </h1>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <h2 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
            Sequential Topics ({activeCourse.topics.length})
          </h2>

          <div className="space-y-3">
            {activeCourse.topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => onSelectTopicWorkspace(activeCourse.id, topic.id)}
                className="p-4 rounded-2xl bg-[#141c2e] border border-slate-800 hover:border-[#ffc000]/60 space-y-3 shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#0d1322] border border-[#ffc000]/40 text-[#ffc000] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      #{topic.sequenceOrder}
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-white group-hover:text-[#ffc000] transition-colors leading-snug">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {topic.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#ffc000] shrink-0" />
                </div>

                <div className="grid grid-cols-3 gap-2 p-2 bg-[#0d1322] rounded-xl border border-slate-800 text-[10px] font-semibold text-slate-300">
                  <div className="flex items-center gap-1.5 truncate">
                    <PlayCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{topic.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <FileText className="w-3.5 h-3.5 text-[#ffc000] shrink-0" />
                    <span>PDF Notes</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <HelpCircle className="w-3.5 h-3.5 text-[#2ed573] shrink-0" />
                    <span>Topic Exam</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BottomNav activeTab="courses" onNavigateTab={onNavigateTab} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-28 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Browse Courses
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-0.5">
          Select a competitive exam batch to view structured learning topics.
        </p>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search courses, syllabus, topics..."
          className="w-full bg-[#141c2e] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffc000] transition-colors"
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
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => setActiveCourse(course)}
            className="rounded-2xl bg-[#141c2e] border border-slate-800 hover:border-slate-700/90 overflow-hidden shadow-lg transition-all duration-200 cursor-pointer group"
          >
            <div className="relative h-36 w-full bg-slate-900 overflow-hidden">
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141c2e] via-transparent to-black/40" />

              <span className="absolute top-3 left-3 bg-[#ffc000] text-[#0d1322] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                {course.category}
              </span>

              {course.isEnrolled && (
                <span className="absolute top-3 right-3 bg-[#2ed573] text-[#0d1322] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3 h-3" /> Enrolled
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-[#ffc000] transition-colors">
                {course.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {course.description}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-400 pt-3 border-t border-slate-800/80">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#ffc000]" />
                  {course.totalTopics} Topics
                </span>

                <div className="flex items-center gap-1 text-[#ffc000] font-bold text-xs group-hover:translate-x-1 transition-transform">
                  <span>View Topics</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeTab="courses" onNavigateTab={onNavigateTab} />

    </div>
  );
};
