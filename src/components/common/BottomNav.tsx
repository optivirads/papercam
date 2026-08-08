import React from 'react';
import { LayoutGrid, BookOpen, FileText, User, HelpCircle } from 'lucide-react';
import type { NavTab } from '../../types';

interface BottomNavProps {
  activeTab: NavTab;
  onNavigateTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onNavigateTab }) => {
  const navItems: Array<{ id: NavTab; label: string; icon: React.ElementType }> = [
    { id: 'dashboard', label: 'Home', icon: LayoutGrid },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'syllabus', label: 'Syllabus', icon: FileText },
    { id: 'tests', label: 'Exams', icon: HelpCircle },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-[#0d1322]/95 backdrop-blur-md border-t border-slate-800/80 px-3 py-2 flex items-center justify-around z-40 select-none"
      aria-label="Mobile Navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigateTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer text-[10px] ${
              isActive ? 'text-[#ffc000] font-extrabold' : 'text-slate-400 hover:text-white font-bold'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-[#ffc000]' : 'text-slate-400'}`} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
