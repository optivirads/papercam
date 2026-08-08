import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Edit3,
  Trash2,
  MoveUp,
  MoveDown,
  Video,
  FileText,
  X,
  HelpCircle
} from 'lucide-react';

export interface AdminTopicItem {
  id: string;
  sequenceNumber: number;
  title: string;
  description: string;
  youtubeUrl: string;
  pdfNotesName: string;
  quizQuestionCount: number;
}

export interface AdminCourseItem {
  id: string;
  title: string;
  subjectTag: string;
  examLevel: string;
  description: string;
  status: 'published' | 'draft';
  topics: AdminTopicItem[];
}

export const AdminCourseManagerScreen: React.FC = () => {
  const [courses, setCourses] = useState<AdminCourseItem[]>([
    {
      id: 'course-polity-1',
      title: 'Indian Constitution & Governance',
      subjectTag: 'Indian Polity',
      examLevel: 'Degree & LDC Level',
      description: 'Comprehensive course covering Preamble, Fundamental Rights, Articles, and Amendments.',
      status: 'published',
      topics: [
        {
          id: 'top-1',
          sequenceNumber: 1,
          title: 'Indian Constitution - Preamble & Basic Structure',
          description: 'Master the fundamental philosophy of the Indian Constitution, Objective Resolution, and 42nd Amendment.',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          pdfNotesName: 'Polity_Topic01_Notes.pdf',
          quizQuestionCount: 35
        },
        {
          id: 'top-2',
          sequenceNumber: 2,
          title: 'Fundamental Rights & Constitutional Remedies (Article 12-35)',
          description: 'Detailed analysis of 6 Fundamental Rights, Article 32 Writs, and landmark judgments.',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          pdfNotesName: 'Polity_Topic02_Rights.pdf',
          quizQuestionCount: 40
        },
        {
          id: 'top-3',
          sequenceNumber: 3,
          title: 'Directive Principles of State Policy & Fundamental Duties',
          description: 'DPSP Articles 36-51, Article 51A Duties, and Swaran Singh Committee recommendations.',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          pdfNotesName: 'Polity_Topic03_DPSP.pdf',
          quizQuestionCount: 25
        }
      ]
    },
    {
      id: 'course-hist-1',
      title: 'Kerala History & Social Renaissance',
      subjectTag: 'History',
      examLevel: '10th & Degree Prelims',
      description: 'Detailed chronological study of Renaissance leaders, temple entry movements, and Kerala history.',
      status: 'published',
      topics: [
        {
          id: 'top-hist-1',
          sequenceNumber: 1,
          title: 'Social Reform Movements & Reformers in Kerala',
          description: 'Chattampi Swamikal, Sree Narayana Guru, Ayyankali, and Pandit Karuppan contributions.',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          pdfNotesName: 'History_Topic01_Renaissance.pdf',
          quizQuestionCount: 50
        }
      ]
    }
  ]);

  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-polity-1');

  const [isCourseModalOpen, setIsCourseModalOpen] = useState<boolean>(false);
  const [editingCourse, setEditingCourse] = useState<AdminCourseItem | null>(null);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    subjectTag: 'Indian Polity',
    examLevel: '10th & Degree Prelims',
    description: '',
    status: 'published' as 'published' | 'draft'
  });

  const [isTopicModalOpen, setIsTopicModalOpen] = useState<boolean>(false);
  const [editingTopic, setEditingTopic] = useState<AdminTopicItem | null>(null);
  const [topicFormData, setTopicFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    pdfNotesName: '',
    quizQuestionCount: 20
  });

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleOpenCreateCourse = () => {
    setEditingCourse(null);
    setCourseFormData({
      title: '',
      subjectTag: 'Indian Polity',
      examLevel: '10th & Degree Prelims',
      description: '',
      status: 'published'
    });
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseFormData.title) return;

    if (editingCourse) {
      setCourses(
        courses.map((c) =>
          c.id === editingCourse.id ? { ...c, ...courseFormData } : c
        )
      );
    } else {
      const newCourse: AdminCourseItem = {
        id: `course-${Date.now()}`,
        ...courseFormData,
        topics: []
      };
      setCourses([...courses, newCourse]);
      setSelectedCourseId(newCourse.id);
    }
    setIsCourseModalOpen(false);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course and all its sequential topics?')) {
      const updated = courses.filter((c) => c.id !== courseId);
      setCourses(updated);
      if (updated.length > 0) setSelectedCourseId(updated[0].id);
    }
  };

  const handleMoveTopic = (topicIndex: number, direction: 'up' | 'down') => {
    if (!selectedCourse) return;
    const targetIndex = direction === 'up' ? topicIndex - 1 : topicIndex + 1;
    if (targetIndex < 0 || targetIndex >= selectedCourse.topics.length) return;

    const newTopics = [...selectedCourse.topics];
    const temp = newTopics[topicIndex];
    newTopics[topicIndex] = newTopics[targetIndex];
    newTopics[targetIndex] = temp;

    const reorderedTopics = newTopics.map((t, idx) => ({
      ...t,
      sequenceNumber: idx + 1
    }));

    setCourses(
      courses.map((c) =>
        c.id === selectedCourse.id ? { ...c, topics: reorderedTopics } : c
      )
    );
  };

  const handleOpenCreateTopic = () => {
    setEditingTopic(null);
    setTopicFormData({
      title: '',
      description: '',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      pdfNotesName: 'New_Study_Notes.pdf',
      quizQuestionCount: 20
    });
    setIsTopicModalOpen(true);
  };

  const handleSaveTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !topicFormData.title) return;

    if (editingTopic) {
      const updatedTopics = selectedCourse.topics.map((t) =>
        t.id === editingTopic.id ? { ...t, ...topicFormData } : t
      );
      setCourses(
        courses.map((c) =>
          c.id === selectedCourse.id ? { ...c, topics: updatedTopics } : c
        )
      );
    } else {
      const newTopic: AdminTopicItem = {
        id: `top-${Date.now()}`,
        sequenceNumber: selectedCourse.topics.length + 1,
        ...topicFormData
      };
      setCourses(
        courses.map((c) =>
          c.id === selectedCourse.id
            ? { ...c, topics: [...c.topics, newTopic] }
            : c
        )
      );
    }
    setIsTopicModalOpen(false);
  };

  const handleDeleteTopic = (topicId: string) => {
    if (!selectedCourse) return;
    if (confirm('Delete this topic from the course sequence?')) {
      const remaining = selectedCourse.topics
        .filter((t) => t.id !== topicId)
        .map((t, idx) => ({ ...t, sequenceNumber: idx + 1 }));

      setCourses(
        courses.map((c) =>
          c.id === selectedCourse.id ? { ...c, topics: remaining } : c
        )
      );
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-24 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      <div>
        <span className="text-[11px] font-bold text-[#ffc000] uppercase tracking-wider">
          Admin CMS • Course & Topic Builder
        </span>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Course & Topic Sequence Manager
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-0.5">
          Curate courses, order topic sequence #1 to #N, attach video lessons, and upload PDF notes.
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="flex-1 bg-[#141c2e] border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#ffc000]"
        >
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} ({c.topics.length} Topics)
            </option>
          ))}
        </select>

        <button
          onClick={handleOpenCreateCourse}
          className="py-2.5 px-3 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-xs flex items-center gap-1.5 hover:brightness-110 cursor-pointer shadow-md shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Course</span>
        </button>
      </div>

      {selectedCourse && (
        <div className="rounded-2xl bg-[#141c2e] border border-slate-800 p-5 space-y-3 shadow-lg relative">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold text-[#ffc000] bg-[#ffc000]/10 px-2.5 py-0.5 rounded-full">
                  {selectedCourse.subjectTag}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  {selectedCourse.examLevel}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-white">
                {selectedCourse.title}
              </h2>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => {
                  setEditingCourse(selectedCourse);
                  setCourseFormData({
                    title: selectedCourse.title,
                    subjectTag: selectedCourse.subjectTag,
                    examLevel: selectedCourse.examLevel,
                    description: selectedCourse.description,
                    status: selectedCourse.status
                  });
                  setIsCourseModalOpen(true);
                }}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteCourse(selectedCourse.id)}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {selectedCourse.description}
          </p>
        </div>
      )}

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#ffc000]" />
            <span>Sequential Topics List ({selectedCourse?.topics.length || 0})</span>
          </h3>

          <button
            onClick={handleOpenCreateTopic}
            className="py-1.5 px-3 rounded-xl bg-[#1e293b] text-[#ffc000] border border-[#ffc000]/40 font-extrabold text-xs flex items-center gap-1.5 hover:bg-[#28354d] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Topic</span>
          </button>
        </div>

        <div className="space-y-3">
          {selectedCourse?.topics.map((topic, index) => (
            <div
              key={topic.id}
              className="rounded-2xl bg-[#141c2e] border border-slate-800 p-4 space-y-3 shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-[#0d1322] border border-[#ffc000]/30 text-[#ffc000] font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                    #{topic.sequenceNumber}
                  </span>

                  <div>
                    <h4 className="text-xs font-bold text-white leading-snug">
                      {topic.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    disabled={index === 0}
                    onClick={() => handleMoveTopic(index, 'up')}
                    className="p-1 rounded-lg bg-[#0d1322] text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move Topic Up"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === selectedCourse.topics.length - 1}
                    onClick={() => handleMoveTopic(index, 'down')}
                    className="p-1 rounded-lg bg-[#0d1322] text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move Topic Down"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-2.5 bg-[#0d1322] rounded-xl border border-slate-800/80 text-[10px] font-semibold text-slate-300">
                <div className="flex items-center gap-1.5 truncate">
                  <Video className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="truncate">YouTube Video</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <FileText className="w-3.5 h-3.5 text-[#ffc000] shrink-0" />
                  <span className="truncate">{topic.pdfNotesName}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <HelpCircle className="w-3.5 h-3.5 text-[#2ed573] shrink-0" />
                  <span>{topic.quizQuestionCount} Qs Quiz</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60 text-xs">
                <button
                  onClick={() => {
                    setEditingTopic(topic);
                    setTopicFormData({
                      title: topic.title,
                      description: topic.description,
                      youtubeUrl: topic.youtubeUrl,
                      pdfNotesName: topic.pdfNotesName,
                      quizQuestionCount: topic.quizQuestionCount
                    });
                    setIsTopicModalOpen(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-bold cursor-pointer"
                >
                  Edit Topic
                </button>
                <button
                  onClick={() => handleDeleteTopic(topic.id)}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 font-bold cursor-pointer hover:bg-rose-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#121829] border border-slate-800 rounded-2xl p-5 max-w-xs w-full space-y-4 shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setIsCourseModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-extrabold text-white">
              {editingCourse ? 'Edit Subject Course' : 'Create New Subject Course'}
            </h3>

            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs font-bold">
              <div>
                <label className="text-slate-300 block mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseFormData.title}
                  onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                  placeholder="e.g. Kerala History & Renaissance"
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#ffc000]"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Subject Tag</label>
                <input
                  type="text"
                  required
                  value={courseFormData.subjectTag}
                  onChange={(e) => setCourseFormData({ ...courseFormData, subjectTag: e.target.value })}
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#ffc000]"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Exam Level</label>
                <input
                  type="text"
                  required
                  value={courseFormData.examLevel}
                  onChange={(e) => setCourseFormData({ ...courseFormData, examLevel: e.target.value })}
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#ffc000]"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={courseFormData.description}
                  onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#ffc000]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-xs hover:brightness-110 cursor-pointer shadow-md mt-2"
              >
                Save Subject Course
              </button>
            </form>
          </div>
        </div>
      )}

      {isTopicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#121829] border border-slate-800 rounded-2xl p-5 max-w-xs w-full space-y-4 shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setIsTopicModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-extrabold text-white">
              {editingTopic ? 'Edit Topic Item' : 'Add Topic to Course Sequence'}
            </h3>

            <form onSubmit={handleSaveTopic} className="space-y-3 text-xs font-bold">
              <div>
                <label className="text-slate-300 block mb-1">Topic Title</label>
                <input
                  type="text"
                  required
                  value={topicFormData.title}
                  onChange={(e) => setTopicFormData({ ...topicFormData, title: e.target.value })}
                  placeholder="e.g. Fundamental Rights (Article 12-35)"
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#ffc000]"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">YouTube Video Lesson URL</label>
                <input
                  type="url"
                  required
                  value={topicFormData.youtubeUrl}
                  onChange={(e) => setTopicFormData({ ...topicFormData, youtubeUrl: e.target.value })}
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#ffc000]"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Attached PDF Study Notes Name</label>
                <input
                  type="text"
                  required
                  value={topicFormData.pdfNotesName}
                  onChange={(e) => setTopicFormData({ ...topicFormData, pdfNotesName: e.target.value })}
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#ffc000]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-xs hover:brightness-110 cursor-pointer shadow-md mt-2"
              >
                Save Topic Item
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
