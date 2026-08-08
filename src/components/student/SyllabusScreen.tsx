import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  CheckCircle2,
  ChevronRight,
  Download
} from 'lucide-react';
import type { NavTab } from '../../types';
import { BottomNav } from '../common/BottomNav';

interface SyllabusScreenProps {
  onNavigateTab: (tab: NavTab) => void;
  onStartExamOnTopic?: (topic: string) => void;
}

interface SyllabusExam {
  id: string;
  title: string;
  level: string;
  totalMarks: number;
  durationMinutes: number;
  pdfFileName: string;
  subjects: {
    name: string;
    marks: number;
    subtopics: string[];
  }[];
}

export const SyllabusScreen: React.FC<SyllabusScreenProps> = ({
  onNavigateTab,
  onStartExamOnTopic
}) => {
  const [selectedExamId, setSelectedExamId] = useState<string>('ldc');

  const syllabusList: SyllabusExam[] = [
    {
      id: 'ldc',
      title: 'LDC 2024 & 10th Level Prelims / Mains',
      level: '10th SSLC Level',
      totalMarks: 100,
      durationMinutes: 75,
      pdfFileName: 'Kerala_PSC_LDC_2024_Official_Syllabus.pdf',
      subjects: [
        {
          name: 'General Knowledge & History',
          marks: 50,
          subtopics: [
            'Kerala History & Renaissance Leaders (Ayyankali, Sree Narayana Guru, Vaikom Satyagraha)',
            'Indian Constitution & Fundamental Rights (Articles 14-32, Preamble, PSC Article 315)',
            'Geography of India & Kerala (44 Rivers, Backwaters, Anamudi Peak, Wildlife Sanctuaries)',
            'Indian Economy & Five Year Plans',
            'Current Affairs & National Events'
          ]
        },
        {
          name: 'General Science & Information Technology',
          marks: 20,
          subtopics: [
            'Human Body Systems, Vitamins & Diseases',
            'Physics Fundamentals (Laws of Motion, Work Energy, Light & Lenses)',
            'Chemistry in Daily Life (Acids & Bases, pH Scale, Metals & Alloys)',
            'Computer Fundamentals, Cyber Laws & IT Act 2000'
          ]
        },
        {
          name: 'Simple Arithmetic & Mental Ability',
          marks: 20,
          subtopics: [
            'Percentage, Profit & Loss, Simple Interest',
            'Ratio & Proportion, Average, Time & Work, Speed & Distance',
            'Number Series, Coding-Decoding, Blood Relations & Venn Diagrams'
          ]
        },
        {
          name: 'General English',
          marks: 10,
          subtopics: [
            'Subject-Verb Agreement, Tenses, Prepositions',
            'Synonyms, Antonyms, Idioms & One Word Substitutes'
          ]
        },
        {
          name: 'Malayalam Language (മലയാള സാഹിത്യവും വ്യാകരണവും)',
          marks: 10,
          subtopics: [
            'സന്ധി (ആദേശം, ലോപം, ആഗമം, ദ്വിത്വം)',
            'സമാസം (കർമ്മധാരയൻ, തത്പുരുഷൻ, ബഹുവ്രീഹി, ദ്വന്ദ്വൻ)',
            'പഴഞ്ചൊല്ലുകൾ, വാക്യശുദ്ധി, പരിഭാഷ'
          ]
        }
      ]
    },
    {
      id: 'vfa',
      title: 'Village Field Assistant (VFA)',
      level: '10th Level',
      totalMarks: 100,
      durationMinutes: 75,
      pdfFileName: 'Kerala_PSC_VFA_Syllabus.pdf',
      subjects: [
        {
          name: 'General Knowledge & Current Affairs',
          marks: 50,
          subtopics: ['Kerala State Affairs, Land Reforms, Revenue Laws, Renaissance Leaders']
        },
        {
          name: 'Natural Science & Agriculture',
          marks: 20,
          subtopics: ['Soil Types in Kerala, Major Crops, Environmental Conservation']
        },
        {
          name: 'Mental Ability & Math',
          marks: 20,
          subtopics: ['Basic Operations, Percentage, Distance, Time']
        },
        {
          name: 'Regional Language (Malayalam)',
          marks: 10,
          subtopics: ['Grammar, Spelling Correction, Proverbs']
        }
      ]
    },
    {
      id: 'si',
      title: 'Sub Inspector of Police (SI) / Degree Level',
      level: 'Graduate Degree Level',
      totalMarks: 100,
      durationMinutes: 90,
      pdfFileName: 'Kerala_PSC_SI_DegreeLevel_Syllabus.pdf',
      subjects: [
        {
          name: 'General Knowledge, Polity & History',
          marks: 40,
          subtopics: ['Indian Freedom Movement, Constitutional Law, IPC / CrPC Overview, Human Rights']
        },
        {
          name: 'Analytical Reasoning & Higher Mathematics',
          marks: 20,
          subtopics: ['Data Interpretation, Probability, Permutations, Logical Reasoning']
        },
        {
          name: 'Advanced English Usage',
          marks: 20,
          subtopics: ['Direct/Indirect Speech, Passive Voice, Precise Writing, Vocabulary']
        },
        {
          name: 'General Science & Environmental Studies',
          marks: 20,
          subtopics: ['Space Research, Biotechnology, Disaster Management, Climate Change']
        }
      ]
    },
    {
      id: 'kas',
      title: 'Kerala Administrative Service (KAS)',
      level: 'Post Graduate / Gazetted Officer',
      totalMarks: 200,
      durationMinutes: 180,
      pdfFileName: 'Kerala_PSC_KAS_Officer_Syllabus.pdf',
      subjects: [
        {
          name: 'Paper I: History, Culture & Governance',
          marks: 100,
          subtopics: ['Kerala History 1498-Present, Indian Heritage, Public Administration']
        },
        {
          name: 'Paper II: Economy, Science & International Relations',
          marks: 100,
          subtopics: ['Indian & Kerala Budget, Foreign Policy, Scientific Advancements']
        }
      ]
    }
  ];

  const currentExam = syllabusList.find((e) => e.id === selectedExamId) || syllabusList[0];

  const handleDownloadPdf = (fileName: string) => {
    alert(`Downloading Official Kerala PSC Syllabus: ${fileName}`);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-28 px-5 pt-4 space-y-4 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-[#ffc000] mb-1">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-wider">Kerala PSC Official</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Exam Syllabi & Pattern
        </h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          Select an exam to view detailed mark distribution and syllabus units.
        </p>
      </div>

      {/* Exam Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {syllabusList.map((exam) => (
          <button
            key={exam.id}
            onClick={() => setSelectedExamId(exam.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer border ${
              selectedExamId === exam.id
                ? 'bg-[#ffc000] text-[#0d1322] border-[#ffc000] shadow-lg scale-[1.02]'
                : 'bg-[#141c2e] text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {exam.title.split(' ')[0]} {exam.title.split(' ')[1]}
          </button>
        ))}
      </div>

      {/* Selected Exam Overview Card */}
      <div className="rounded-3xl bg-[#141c2e] border border-slate-800 p-5 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#2ed573] bg-[#2ed573]/10 px-2.5 py-0.5 rounded-full border border-[#2ed573]/20 uppercase">
              {currentExam.level}
            </span>
            <h2 className="text-lg font-black text-white mt-1 leading-snug">
              {currentExam.title}
            </h2>
          </div>

          <button
            onClick={() => handleDownloadPdf(currentExam.pdfFileName)}
            className="p-2.5 rounded-xl bg-[#0d1322] border border-[#ffc000]/40 text-[#ffc000] hover:bg-[#1a253d] cursor-pointer flex items-center gap-1.5 text-xs font-extrabold"
            title="Download PDF Syllabus"
          >
            <Download className="w-4 h-4" />
            <span>PDF</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
          <div className="bg-[#0d1322] border border-slate-800 p-3 rounded-2xl">
            <span className="text-[10px] text-slate-400 block font-semibold">Total Marks</span>
            <span className="text-base font-extrabold text-[#ffc000]">{currentExam.totalMarks} Marks</span>
          </div>

          <div className="bg-[#0d1322] border border-slate-800 p-3 rounded-2xl">
            <span className="text-[10px] text-slate-400 block font-semibold">Exam Duration</span>
            <span className="text-base font-extrabold text-white">{currentExam.durationMinutes} Mins</span>
          </div>
        </div>
      </div>

      {/* Detailed Subject Breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#ffc000]" />
          <span>Subject-wise Mark Distribution</span>
        </h3>

        {currentExam.subjects.map((subj, idx) => (
          <div key={idx} className="bg-[#141c2e] border border-slate-800/80 rounded-2xl p-4 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#ffc000]/10 text-[#ffc000] text-[11px] font-black flex items-center justify-center border border-[#ffc000]/20">
                  {idx + 1}
                </span>
                <span>{subj.name}</span>
              </h4>

              <span className="text-xs font-black text-[#2ed573] bg-[#2ed573]/10 px-2.5 py-0.5 rounded-full border border-[#2ed573]/20">
                {subj.marks} Marks
              </span>
            </div>

            <ul className="space-y-1.5 pl-2 text-[11px] text-slate-300">
              {subj.subtopics.map((tp, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ffc000] shrink-0 mt-0.5" />
                  <span>{tp}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                if (onStartExamOnTopic) {
                  onStartExamOnTopic(subj.name);
                } else {
                  onNavigateTab('tests');
                }
              }}
              className="w-full mt-2 py-2 rounded-xl bg-[#0d1322] border border-slate-800 text-xs font-extrabold text-[#ffc000] hover:bg-[#1a253d] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Practice Questions on {subj.name.split(' ')[0]}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <BottomNav activeTab="syllabus" onNavigateTab={onNavigateTab} />

    </div>
  );
};
