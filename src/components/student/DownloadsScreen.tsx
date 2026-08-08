import React, { useState } from 'react';
import {
  Download,
  FileText,
  Trash2,
  BookOpen,
  Search,
  HardDrive,
  CheckCircle2,
  Bookmark,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import type { NavTab } from '../../types';
import { BottomNav } from '../common/BottomNav';

interface DownloadsScreenProps {
  onNavigateTab: (tab: NavTab) => void;
}

export interface DownloadedFile {
  id: string;
  title: string;
  category: 'Subject PDF Notes' | 'PYQ Papers' | 'Revision Sheets';
  fileSize: string;
  downloadDate: string;
  pageCount: number;
  subjectTag: string;
  fileFormat: string;
}

const initialDownloadedFiles: DownloadedFile[] = [
  {
    id: 'dl-1',
    title: 'Kerala Renaissance Reformers Complete Notes',
    category: 'Subject PDF Notes',
    fileSize: '2.4 MB',
    downloadDate: 'Downloaded Yesterday',
    pageCount: 14,
    subjectTag: 'History',
    fileFormat: 'PDF'
  },
  {
    id: 'dl-2',
    title: 'LDC 2023 Official Question Paper (PYQ Set A)',
    category: 'PYQ Papers',
    fileSize: '4.2 MB',
    downloadDate: 'Downloaded 3 days ago',
    pageCount: 20,
    subjectTag: '10th Prelims PYQ',
    fileFormat: 'PDF'
  },
  {
    id: 'dl-3',
    title: 'Indian Constitution Preamble & Articles Summary',
    category: 'Subject PDF Notes',
    fileSize: '1.8 MB',
    downloadDate: 'Downloaded Last Week',
    pageCount: 8,
    subjectTag: 'Polity',
    fileFormat: 'PDF'
  },
  {
    id: 'dl-4',
    title: 'Malayalam Sandhi & Grammar Rules Handbook',
    category: 'Revision Sheets',
    fileSize: '3.1 MB',
    downloadDate: 'Downloaded 2 weeks ago',
    pageCount: 12,
    subjectTag: 'Malayalam',
    fileFormat: 'PDF'
  },
  {
    id: 'dl-5',
    title: 'Quantitative Aptitude Shortcut Formula Sheet',
    category: 'Revision Sheets',
    fileSize: '3.3 MB',
    downloadDate: 'Downloaded 2 weeks ago',
    pageCount: 10,
    subjectTag: 'Maths',
    fileFormat: 'PDF'
  }
];

export const DownloadsScreen: React.FC<DownloadsScreenProps> = ({
  onNavigateTab
}) => {
  const [files, setFiles] = useState<DownloadedFile[]>(initialDownloadedFiles);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Files');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeReaderFile, setActiveReaderFile] = useState<DownloadedFile | null>(null);
  const [readerPage, setReaderPage] = useState<number>(1);

  const categories = ['All Files', 'Subject PDF Notes', 'PYQ Papers', 'Revision Sheets'];

  const handleDeleteFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this offline copy from your device storage?')) {
      setFiles(files.filter((f) => f.id !== id));
    }
  };

  const filteredFiles = files.filter((file) => {
    const matchesCategory = selectedCategory === 'All Files' || file.category === selectedCategory;
    const matchesSearch =
      file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.subjectTag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-28 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      <div>
        <span className="text-[11px] font-bold text-[#ffc000] uppercase tracking-wider">
          Offline Storage & Downloads
        </span>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Offline Study Library
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-0.5">
          Read downloaded study notes, PYQ papers, and formula sheets without internet.
        </p>
      </div>

      <div className="rounded-2xl bg-[#141c2e] border border-slate-800 p-4 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HardDrive className="w-5 h-5 text-[#ffc000]" />
            <div>
              <div className="text-xs font-bold text-white">Offline Device Storage</div>
              <div className="text-[10px] text-slate-400">14.8 MB used of 500 MB Offline Cache</div>
            </div>
          </div>

          <span className="text-[10px] font-extrabold text-[#2ed573] bg-[#2ed573]/10 px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#2ed573]/20">
            <CheckCircle2 className="w-3 h-3" /> {files.length} Offline Files
          </span>
        </div>

        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div className="bg-[#ffc000] h-full rounded-full" style={{ width: '15%' }} />
        </div>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search downloaded notes, LDC PYQ, formulas..."
          className="w-full bg-[#141c2e] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ffc000] transition-colors"
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

      <div className="space-y-3 pt-1">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-10 space-y-2 bg-[#141c2e] rounded-2xl border border-slate-800 p-6">
            <Download className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Offline Files Found</h3>
            <p className="text-xs text-slate-400">Download study notes from Course Topic Workspaces to access them offline!</p>
          </div>
        ) : (
          filteredFiles.map((file) => (
            <div
              key={file.id}
              onClick={() => {
                setActiveReaderFile(file);
                setReaderPage(1);
              }}
              className="rounded-2xl bg-[#141c2e] border border-slate-800 hover:border-[#ffc000]/50 p-4 shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#ffc000] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-white leading-snug group-hover:text-[#ffc000] transition-colors">
                      {file.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                      <span className="text-[#ffc000] font-semibold">{file.subjectTag}</span>
                      <span>•</span>
                      <span>{file.fileSize}</span>
                      <span>•</span>
                      <span>{file.pageCount} Pages</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => handleDeleteFile(file.id, e)}
                  title="Delete Offline Copy"
                  className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span className="flex items-center gap-1 text-[#2ed573]">
                  <CheckCircle2 className="w-3 h-3" /> Ready Offline
                </span>
                <span>{file.downloadDate}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {activeReaderFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#121829] border border-slate-800 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-fade-in">
            <button
              onClick={() => setActiveReaderFile(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#ffc000]">
              <BookOpen className="w-5 h-5" />
              <span className="text-xs font-extrabold uppercase">Offline Document Reader</span>
            </div>

            <h3 className="text-sm font-extrabold text-white leading-snug">
              {activeReaderFile.title}
            </h3>

            <div className="bg-[#0e1422] border border-slate-800 rounded-xl p-4 min-h-[320px] shadow-inner flex flex-col justify-between text-xs space-y-3 text-slate-300">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-bold text-[#ffc000]">
                    {activeReaderFile.subjectTag} • Page {readerPage} of {activeReaderFile.pageCount}
                  </span>
                  <Bookmark className="w-4 h-4 text-slate-400 hover:text-[#ffc000] cursor-pointer" />
                </div>

                <p className="leading-relaxed">
                  <strong>Section {readerPage}: Key High-Yield Notes</strong>
                </p>
                <p className="leading-relaxed">
                  This offline study document covers Kerala PSC previous year question patterns, high-frequency facts, and quick memory shortcuts for upcoming prelims examinations.
                </p>

                <div className="bg-[#141c2e] p-3 rounded-lg border border-slate-800 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#ffc000] inline mr-1" />
                  <strong>Exam Tip:</strong> Memorize dates and constitutional amendments for quick scoring in 10th & Degree prelims!
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <button
                  disabled={readerPage === 1}
                  onClick={() => setReaderPage(readerPage - 1)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-40 text-[11px] font-bold cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous
                </button>

                <span className="text-[11px] font-bold text-slate-400">
                  {readerPage} / {activeReaderFile.pageCount}
                </span>

                <button
                  disabled={readerPage === activeReaderFile.pageCount}
                  onClick={() => setReaderPage(readerPage + 1)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-40 text-[11px] font-bold cursor-pointer flex items-center gap-1"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav activeTab="downloads" onNavigateTab={onNavigateTab} />

    </div>
  );
};
