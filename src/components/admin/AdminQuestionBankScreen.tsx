import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { AiQuestionGenerator } from '../../services/aiQuestionGenerator';
import {
  Plus,
  Database,
  CheckCircle2,
  AlertCircle,
  Search,
  RotateCcw,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  Sparkles,
  Globe,
  Loader2
} from 'lucide-react';

export interface AdminQuestion {
  id: string;
  questionText: string;
  optionsSummary: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  status: 'verified' | 'flagged' | 'draft';
  topicTag: string;
  examLevelTag: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  sourcePdf?: string;
}

const initialQuestions: AdminQuestion[] = [
  {
    id: 'q-1',
    questionText: 'Who founded the Advaita Ashram at Aluva?',
    optionsSummary: 'A) Chattampi Swamikal B) Sree Narayana Guru C) Vagbhatananda D) Brahmananda Sivayogi',
    optionA: 'Chattampi Swamikal',
    optionB: 'Sree Narayana Guru',
    optionC: 'Vagbhatananda',
    optionD: 'Brahmananda Sivayogi',
    correctOption: 'B',
    explanation: 'Sree Narayana Guru established the Advaita Ashram at Aluva in 1913 with the motto "One Caste, One Religion, One God for Man".',
    status: 'verified',
    topicTag: 'Renaissance',
    examLevelTag: 'Degree Level',
    difficulty: 'Medium'
  },
  {
    id: 'q-2',
    questionText: 'Which article of the Indian Constitution deals with the Right to Equality?',
    optionsSummary: 'A) Article 14 B) Article 19 C) Article 21 D) Article 32',
    optionA: 'Article 14',
    optionB: 'Article 19',
    optionC: 'Article 21',
    optionD: 'Article 32',
    correctOption: 'A',
    explanation: 'Article 14 guarantees equality before the law and equal protection of the laws within the territory of India.',
    status: 'verified',
    topicTag: 'Constitution',
    examLevelTag: 'LDC Level',
    difficulty: 'Easy'
  },
  {
    id: 'q-3',
    questionText: 'If a train 150m long crosses a pole in 15 seconds, what is its speed in km/hr?',
    optionsSummary: 'A) 36 km/hr B) 45 km/hr C) 54 km/hr D) 60 km/hr',
    optionA: '36 km/hr',
    optionB: '45 km/hr',
    optionC: '54 km/hr',
    optionD: '60 km/hr',
    correctOption: 'A',
    explanation: 'Speed = Distance / Time = 150m / 15s = 10 m/s. In km/hr = 10 * (18/5) = 36 km/hr.',
    status: 'flagged',
    topicTag: 'Arithmetic',
    examLevelTag: 'Degree Level',
    difficulty: 'Hard'
  }
];

export const AdminQuestionBankScreen: React.FC = () => {
  const [questions, setQuestions] = useState<AdminQuestion[]>(initialQuestions);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('All');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<string>('All');
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<AdminQuestion | null>(null);

  useEffect(() => {
    async function loadData() {
      const qList = await apiService.getQuestions();
      const mapped: AdminQuestion[] = qList.map((q) => ({
        id: String(q.id),
        questionText: q.text,
        optionsSummary: `A) ${q.optionA} B) ${q.optionB} C) ${q.optionC} D) ${q.optionD}`,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctOption: q.correctOption,
        explanation: q.explanation,
        status: 'verified',
        topicTag: 'PSC High Yield',
        examLevelTag: 'Degree Level',
        difficulty: 'Medium'
      }));
      setQuestions(mapped.length > 0 ? mapped : initialQuestions);
    }
    loadData();
  }, []);

  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [pdfFileName, setPdfFileName] = useState<string>('LDC_2023_QuestionPaper_SetA.pdf');
  const [customPaperTitle, setCustomPaperTitle] = useState<string>('LDC 2023 Official Question Paper (Set A)');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [extractedPdfQuestions, setExtractedPdfQuestions] = useState<AdminQuestion[]>([]);

  const [formData, setFormData] = useState({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: 'A' as 'A' | 'B' | 'C' | 'D',
    explanation: '',
    topicTag: 'Renaissance',
    examLevelTag: 'LDC Level',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard'
  });

  const handleOpenCreate = () => {
    setEditingQuestion(null);
    setFormData({
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOption: 'A',
      explanation: '',
      topicTag: 'Renaissance',
      examLevelTag: 'LDC Level',
      difficulty: 'Medium'
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (q: AdminQuestion) => {
    setEditingQuestion(q);
    setFormData({
      questionText: q.questionText,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctOption: q.correctOption,
      explanation: q.explanation,
      topicTag: q.topicTag,
      examLevelTag: q.examLevelTag,
      difficulty: q.difficulty
    });
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this question from the bank?')) {
      setQuestions(questions.filter((q) => q.id !== id));
      await apiService.deleteQuestion(id);
    }
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.questionText || !formData.optionA || !formData.optionB) {
      alert('Please fill in the question text and options.');
      return;
    }

    if (editingQuestion) {
      const updatedQ: AdminQuestion = {
        ...editingQuestion,
        ...formData,
        optionsSummary: `A) ${formData.optionA} B) ${formData.optionB} C) ${formData.optionC} D) ${formData.optionD}`
      };
      setQuestions(questions.map((q) => (q.id === editingQuestion.id ? updatedQ : q)));
      await apiService.saveQuestion({
        id: Number(editingQuestion.id) || Date.now(),
        text: formData.questionText,
        optionA: formData.optionA,
        optionB: formData.optionB,
        optionC: formData.optionC,
        optionD: formData.optionD,
        correctOption: formData.correctOption,
        explanation: formData.explanation
      });
    } else {
      const newId = Date.now();
      const newQ: AdminQuestion = {
        id: String(newId),
        ...formData,
        optionsSummary: `A) ${formData.optionA} B) ${formData.optionB} C) ${formData.optionC} D) ${formData.optionD}`,
        status: 'verified'
      };
      setQuestions([newQ, ...questions]);
      await apiService.saveQuestion({
        id: newId,
        text: formData.questionText,
        optionA: formData.optionA,
        optionB: formData.optionB,
        optionC: formData.optionC,
        optionD: formData.optionD,
        correctOption: formData.correctOption,
        explanation: formData.explanation
      });
    }

    setIsCreateModalOpen(false);
  };

  const handleStartPdfExtraction = () => {
    setIsExtracting(true);

    setTimeout(() => {
      const mockExtracted: AdminQuestion[] = [
        {
          id: `pdf-q-1-${Date.now()}`,
          questionText: 'Which river in Kerala is known as the "Yellow River of Kerala"?',
          optionsSummary: 'A) Periyar B) Chaliyar C) Pamba D) Bharathapuzha',
          optionA: 'Periyar',
          optionB: 'Chaliyar',
          optionC: 'Pamba',
          optionD: 'Bharathapuzha',
          correctOption: 'B',
          explanation: 'AI Web Research: Chaliyar is known as the Yellow River of Kerala due to gold washing activities in the river bed in Nilambur.',
          status: 'verified',
          topicTag: 'Geography',
          examLevelTag: '10th Prelims',
          difficulty: 'Medium',
          sourcePdf: customPaperTitle || pdfFileName
        },
        {
          id: `pdf-q-2-${Date.now()}`,
          questionText: 'Who was the founder of "Ayyavazhi" movement in Southern Travancore?',
          optionsSummary: 'A) Ayya Vaikundar B) Chattampi Swamikal C) Vaikunda Swamikal D) Pandit Karuppan',
          optionA: 'Ayya Vaikundar',
          optionB: 'Chattampi Swamikal',
          optionC: 'Vaikunda Swamikal',
          optionD: 'Pandit Karuppan',
          correctOption: 'A',
          explanation: 'AI Web Research: Ayya Vaikundar (1809-1851) founded the Samathwa Samajam and Ayyavazhi religious reform movement in Travancore.',
          status: 'verified',
          topicTag: 'Renaissance',
          examLevelTag: 'LDC Level',
          difficulty: 'Hard',
          sourcePdf: customPaperTitle || pdfFileName
        }
      ];

      setExtractedPdfQuestions(mockExtracted);
      setIsExtracting(false);
    }, 2200);
  };

  const handleImportExtractedQuestions = () => {
    setQuestions([...extractedPdfQuestions, ...questions]);
    setExtractedPdfQuestions([]);
    setIsPdfModalOpen(false);
    alert(`Successfully imported ${extractedPdfQuestions.length} AI-verified questions grouped under "${customPaperTitle}"!`);
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topicTag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopicFilter === 'All' || q.topicTag === selectedTopicFilter;
    const matchesDiff = selectedDifficultyFilter === 'All' || q.difficulty === selectedDifficultyFilter;
    return matchesSearch && matchesTopic && matchesDiff;
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-24 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      <div>
        <h1 className="text-2xl font-extrabold text-[#dbeafe] tracking-tight">
          Question Bank Management
        </h1>
        <p className="text-xs font-medium text-[#d1d5db]/80 mt-1">
          Curate, verify, extract PDF questions, and organize exam content.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={handleOpenCreate}
          className="py-3 px-3 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#ffc000]/20"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Single Question</span>
        </button>

        <button
          onClick={async () => {
            const topic = prompt('Enter topic/keyword to generate AI PSC questions (e.g. "Kerala Rivers", "Constitution Articles", "Malayalam Sandhi", "Time & Work"):', 'Kerala Rivers');
            if (!topic) return;
            const generated = await AiQuestionGenerator.generateQuestionsForTopic(topic, 2);
            const qList = await apiService.getQuestions();
            const mapped: AdminQuestion[] = qList.map((q) => ({
              id: String(q.id),
              questionText: q.text,
              optionsSummary: `A) ${q.optionA} B) ${q.optionB} C) ${q.optionC} D) ${q.optionD}`,
              optionA: q.optionA,
              optionB: q.optionB,
              optionC: q.optionC,
              optionD: q.optionD,
              correctOption: q.correctOption,
              explanation: q.explanation,
              status: 'verified',
              topicTag: topic,
              examLevelTag: 'Degree Level',
              difficulty: 'Medium'
            }));
            setQuestions(mapped);
            alert(`AI Web Engine generated ${generated.length} dual-language questions for "${topic}" and saved them to IndexedDB!`);
          }}
          className="py-3 px-3 rounded-xl bg-[#2ed573] text-[#0d1322] font-black text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#2ed573]/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Web Generator</span>
        </button>

        <button
          onClick={async () => {
            const countStr = prompt('Enter number of live Kerala PSC questions to fetch dynamically (e.g. 10, 20, 50, 100):', '20');
            if (!countStr) return;
            const count = parseInt(countStr, 10) || 20;
            const fetched = await apiService.fetchQuestionsFromInternet(count);
            const qList = await apiService.getQuestions();
            const mapped: AdminQuestion[] = qList.map((q) => ({
              id: String(q.id),
              questionText: q.text,
              optionsSummary: `A) ${q.optionA} B) ${q.optionB} C) ${q.optionC} D) ${q.optionD}`,
              optionA: q.optionA,
              optionB: q.optionB,
              optionC: q.optionC,
              optionD: q.optionD,
              correctOption: q.correctOption,
              explanation: q.explanation,
              status: 'verified',
              topicTag: 'Kerala PSC Question',
              examLevelTag: 'All Levels',
              difficulty: 'Medium'
            }));
            setQuestions(mapped);
            alert(`Fetched ${fetched.length} live Kerala PSC syllabus questions & saved to DB!`);
          }}
          className="py-3 px-3 rounded-xl bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-blue-500/20 col-span-2"
        >
          <Globe className="w-4 h-4 text-white" />
          <span>Fetch Dynamic Kerala PSC Questions</span>
        </button>
      </div>

      <div className="space-y-3">
        <div className="bg-[#121829] border border-slate-800/80 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Total Questions
            </span>
            <div className="text-3xl font-extrabold text-white mt-1">
              {questions.length + 12447}
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-800/60 flex items-center justify-center text-slate-400">
            <Database className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#121829] border border-slate-800/80 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Verified Rate
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-white">98%</span>
                <span className="text-xs font-bold text-[#2ed573]">~+2% this week</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#2ed573] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
          <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden mt-4">
            <div className="bg-[#2ed573] h-full rounded-full" style={{ width: '98%' }} />
          </div>
        </div>

        <div className="bg-[#121829] border border-slate-800/80 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Flagged for Review
            </span>
            <div className="text-3xl font-extrabold text-rose-400 mt-1">
              42
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-[#121829] border border-slate-800/80 rounded-2xl p-4 space-y-3 shadow-lg">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, keywords..."
            className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffc000] transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <select
            value={selectedTopicFilter}
            onChange={(e) => setSelectedTopicFilter(e.target.value)}
            className="bg-[#0d1322] border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-[#ffc000]"
          >
            <option value="All">Topic: All</option>
            <option value="Renaissance">Topic: Renaissance</option>
            <option value="Constitution">Topic: Constitution</option>
            <option value="Arithmetic">Topic: Arithmetic</option>
            <option value="Geography">Topic: Geography</option>
          </select>

          <select
            value={selectedDifficultyFilter}
            onChange={(e) => setSelectedDifficultyFilter(e.target.value)}
            className="bg-[#0d1322] border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-[#ffc000]"
          >
            <option value="All">Difficulty: All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSearchQuery('');
            setSelectedTopicFilter('All');
            setSelectedDifficultyFilter('All');
          }}
          className="w-full py-2 bg-[#0d1322] hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="space-y-3.5 pt-1">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className={`rounded-2xl border p-4 shadow-lg transition-all ${
              q.status === 'flagged'
                ? 'bg-[#121829] border-rose-500/30'
                : 'bg-[#121829] border-slate-800'
            }`}
          >
            <div className="flex items-start gap-3">
              {q.status === 'verified' ? (
                <CheckCircle2 className="w-5 h-5 text-[#2ed573] shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}

              <div className="flex-1 space-y-2">
                <h3 className="text-sm font-bold text-white leading-snug">
                  {q.questionText}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {q.optionsSummary}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-bold text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                    {q.topicTag}
                  </span>
                  <span className="text-[10px] font-bold text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                    {q.examLevelTag}
                  </span>

                  {q.sourcePdf && (
                    <span className="text-[10px] font-bold text-[#ffc000] bg-[#ffc000]/10 px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#ffc000]/20">
                      <Sparkles className="w-3 h-3" /> AI PYQ Extracted
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-800/80">
              {q.status === 'flagged' ? (
                <button
                  onClick={() => handleOpenEdit(q)}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Review
                </button>
              ) : (
                <button
                  onClick={() => handleOpenEdit(q)}
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Edit Question"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => handleDelete(q.id)}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Delete Question"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 text-xs font-semibold text-[#d1d5db]/80">
        <span>Showing 1 to {filteredQuestions.length} of 12,450 questions</span>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-xl bg-[#0d1322] text-white border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#121829] border border-amber-500/30 rounded-2xl p-5 max-w-sm w-full shadow-2xl relative max-h-[90vh] overflow-y-auto animate-fade-in">
            <button
              onClick={() => setIsPdfModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-3 text-amber-400">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-base font-extrabold text-white">
                PDF Question Paper AI Extractor
              </h3>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Upload a PSC question paper PDF. If answers are missing, the system will research the internet, find the correct answer key, and generate explanations automatically.
            </p>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Custom Paper Set / Group Name:
                </label>
                <input
                  type="text"
                  value={customPaperTitle}
                  onChange={(e) => setCustomPaperTitle(e.target.value)}
                  placeholder="e.g. LDC 2023 Official Question Paper (Set A)"
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#ffc000]"
                />
              </div>

              <label className="border-2 border-dashed border-slate-700 hover:border-[#ffc000] rounded-xl p-3.5 text-center bg-[#0d1322] cursor-pointer transition-colors block">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setPdfFileName(file.name);
                      setCustomPaperTitle(file.name.replace(/\.[^/.]+$/, ''));
                    }
                  }}
                />
                <Upload className="w-6 h-6 text-[#ffc000] mx-auto mb-1" />
                <span className="text-xs font-bold text-white block">{pdfFileName}</span>
                <span className="text-[10px] text-slate-400">Click to change attached PDF file</span>
              </label>

            </div>

            {!isExtracting && extractedPdfQuestions.length === 0 && (
              <button
                onClick={handleStartPdfExtraction}
                className="w-full py-3 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer shadow-md"
              >
                <Globe className="w-4 h-4" />
                <span>Extract Questions & Research Answers Online</span>
              </button>
            )}

            {isExtracting && (
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 text-center space-y-3">
                <Loader2 className="w-7 h-7 text-[#ffc000] animate-spin mx-auto" />
                <span className="text-xs font-bold text-white block">AI Processing & Web Research Active</span>
                <span className="text-[11px] text-slate-400 block">Finding verified answer keys and generating step-by-step explanations...</span>
              </div>
            )}

            {!isExtracting && extractedPdfQuestions.length > 0 && (
              <div className="space-y-3">
                <div className="text-xs font-extrabold text-[#2ed573] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>AI Solved {extractedPdfQuestions.length} Questions & Explanations</span>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {extractedPdfQuestions.map((q, idx) => (
                    <div key={q.id} className="p-3 bg-[#0d1322] border border-slate-800 rounded-xl space-y-1.5 text-xs">
                      <div className="font-bold text-white leading-snug">
                        {idx + 1}. {q.questionText}
                      </div>
                      <div className="text-[#2ed573] font-bold">
                        Correct Answer: {q.correctOption}
                      </div>
                      <div className="text-slate-300 text-[11px] bg-[#141c2e] p-2 rounded-lg border border-slate-800">
                        {q.explanation}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleImportExtractedQuestions}
                  className="w-full py-3 rounded-xl bg-[#2ed573] text-[#0d1322] font-extrabold text-xs hover:brightness-110 cursor-pointer shadow-md"
                >
                  Import All Verified Questions into Bank
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#0b101d] border border-slate-800 rounded-3xl p-5 max-w-sm w-full shadow-2xl relative max-h-[92vh] overflow-y-auto animate-fade-in text-slate-100 space-y-5">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3 pt-1">
              <div>
                <h2 className="text-2xl font-extrabold text-white leading-tight tracking-tight">
                  {editingQuestion ? 'Edit Question' : 'Create New Question'}
                </h2>
                <p className="text-xs font-medium text-slate-400 mt-1">
                  Draft and publish MCQs for the assessment pool.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    handleSaveQuestion(e);
                  }}
                  className="py-3 px-3 rounded-xl bg-[#0e1422] border border-slate-700 hover:bg-slate-800 text-slate-200 font-extrabold text-xs transition-all cursor-pointer shadow-md"
                >
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    handleSaveQuestion(e);
                  }}
                  className="py-3 px-3 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-[#ffc000]/20"
                >
                  Save & Publish
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              
              <div className="rounded-2xl bg-[#12192b] border border-slate-800 p-4 space-y-2">
                <label className="block text-xs font-bold text-slate-200">
                  Question Text <span className="text-rose-400">*</span>
                </label>

                <textarea
                  required
                  rows={4}
                  value={formData.questionText}
                  onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                  placeholder="e.g., Who is the father of Kerala Renaissance?"
                  className="w-full bg-[#0b101d] border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffc000] transition-colors leading-relaxed"
                />
              </div>

              <div className="rounded-2xl bg-[#12192b] border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-white font-extrabold">Answer Options</span>
                  <span className="text-slate-400 font-semibold text-[11px]">Select correct answer</span>
                </div>

                <div className="space-y-2.5">
                  {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                    const isCorrect = formData.correctOption === optKey;
                    const valueKey = optKey === 'A' ? 'optionA' : optKey === 'B' ? 'optionB' : optKey === 'C' ? 'optionC' : 'optionD';

                    return (
                      <div
                        key={optKey}
                        onClick={() => setFormData({ ...formData, correctOption: optKey })}
                        className={`rounded-xl border p-2.5 flex items-center justify-between gap-3 transition-all cursor-pointer ${
                          isCorrect
                            ? 'bg-[#18233c] border-[#ffc000]'
                            : 'bg-[#0b101d] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 flex-1">
                          <span className={`w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 ${
                            isCorrect ? 'bg-[#ffc000] text-[#0d1322]' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {optKey}
                          </span>

                          <input
                            type="text"
                            required
                            value={formData[valueKey]}
                            onChange={(e) => setFormData({ ...formData, [valueKey]: e.target.value })}
                            placeholder={`Enter option ${optKey} text...`}
                            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                          />
                        </div>

                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isCorrect ? 'border-[#ffc000] bg-[#ffc000]' : 'border-slate-600'
                        }`}>
                          {isCorrect && <div className="w-1.5 h-1.5 rounded-full bg-[#0d1322]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl bg-[#12192b] border border-slate-800 p-4 space-y-3">
                <h3 className="text-xs font-extrabold text-white">Classification</h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Topic Domain
                    </label>
                    <select
                      value={formData.topicTag}
                      onChange={(e) => setFormData({ ...formData, topicTag: e.target.value })}
                      className="w-full bg-[#0b101d] border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#ffc000]"
                    >
                      <option value="Renaissance">Kerala Renaissance</option>
                      <option value="Geography">Physical Geography</option>
                      <option value="Polity">Indian Constitution & Polity</option>
                      <option value="Malayalam">Malayalam Grammar</option>
                      <option value="English">General English</option>
                      <option value="Maths">Quantitative Aptitude</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Difficulty Level
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                      className="w-full bg-[#0b101d] border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#ffc000]"
                    >
                      <option value="Easy">Target audience: Easy (10th Prelims)</option>
                      <option value="Medium">Target audience: Medium (VFA / LDC)</option>
                      <option value="Hard">Target audience: Hard (Degree / SI)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#12192b] border border-slate-800 p-4 space-y-2">
                <div>
                  <h3 className="text-xs font-extrabold text-white">Explanation (Optional)</h3>
                  <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                    Visible to students after submitting the mock exam.
                  </p>
                </div>

                <textarea
                  rows={3}
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  placeholder="Provide context or historical facts to explain the correct answer..."
                  className="w-full bg-[#0b101d] border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffc000] leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-center space-y-1.5">
                <p className="text-[10px] text-slate-400 font-semibold">
                  © 2024 Kerala PSC Excellence Portal. Admin Dashboard.
                </p>
                <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 font-medium">
                  <span className="hover:text-white cursor-pointer">Support</span>
                  <span>•</span>
                  <span className="hover:text-white cursor-pointer">Documentation</span>
                  <span>•</span>
                  <span className="hover:text-white cursor-pointer">Terms of Service</span>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
