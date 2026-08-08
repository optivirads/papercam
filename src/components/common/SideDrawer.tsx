import React from 'react';
import {
  LayoutGrid,
  BookOpen,
  GraduationCap,
  HelpCircle,
  Download,
  Bell,
  LogOut,
  X,
  Database,
  BarChart3,
  Users,
  Settings,
  Edit3,
  UserCheck,
  FileText
} from 'lucide-react';
import type { NavTab } from '../../types';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  studentName?: string;
  studentRole?: string;
  avatarUrl?: string;
  userRole?: 'student' | 'admin';
  onLogout?: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  studentName = 'PSC Aspirant',
  studentRole = 'PSC Aspirant',
  avatarUrl = '',
  userRole = 'student',
  onLogout
}) => {
  if (!isOpen) return null;

  const isAdminTab =
    activeTab === 'admin_qbank' ||
    activeTab === 'admin_courses' ||
    activeTab === 'admin_analytics' ||
    activeTab === 'admin_students';

  interface DrawerMenuItem {
    id: NavTab;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }

  const rawStudentMenuItems: DrawerMenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'syllabus', label: 'PSC Syllabi', icon: FileText },
    { id: 'learning', label: 'My Learning', icon: GraduationCap },
    { id: 'performance_rank', label: 'Performance & Rank', icon: BarChart3 },
    { id: 'tests', label: 'Mock Tests', icon: HelpCircle },
    { id: 'downloads', label: 'Downloads', icon: Download },
    ...(userRole === 'admin' ? [{ id: 'admin_analytics' as NavTab, label: 'Admin CMS Panel', icon: Database }] : []),
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
  ];

  const studentMenuItems = rawStudentMenuItems;

  const adminMenuItems: DrawerMenuItem[] = [
    { id: 'admin_analytics', label: 'Analytics Dashboard', icon: LayoutGrid },
    { id: 'admin_qbank', label: 'Question Editor', icon: Edit3 },
    { id: 'admin_courses', label: 'Curriculum Management', icon: BookOpen },
    { id: 'admin_students', label: 'Student Records', icon: Users },
    { id: 'profile', label: 'Settings', icon: Settings },
  ];

  const menuItems = isAdminTab ? adminMenuItems : studentMenuItems;

  return (
    <div className="fixed inset-0 z-50 flex select-none">
      {/* Semi-transparent dark overlay */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Side Drawer Content */}
      <div className="relative w-[82%] max-w-[320px] bg-[#12182b] h-full flex flex-col justify-between p-6 shadow-2xl border-r border-slate-800 animate-slide-in-left z-10">
        
        <div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* User Profile Header */}
          {isAdminTab ? (
            <div className="flex items-center gap-3.5 mt-2 mb-8 pr-6">
              <div className="w-12 h-12 rounded-full bg-[#1e293b] border border-slate-700 flex items-center justify-center text-slate-200 shrink-0 shadow-md">
                <UserCheck className="w-6 h-6 text-[#ffc000]" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-extrabold text-[#ffc000] leading-snug tracking-tight">
                  Kerala PSC Admin
                </h2>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Platform Controller
                </span>
                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                  Government Excellence
                </span>
              </div>
            </div>
          ) : (
                      <div className="flex items-center gap-4 mt-2 mb-8 pr-6">
              {avatarUrl ? (
                <img src={avatarUrl} alt={studentName} className="w-14 h-14 rounded-full object-cover border-2 border-[#ffc000]/40 shadow-md" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#ffc000]/10 border-2 border-[#ffc000]/30 flex items-center justify-center">
                  <span className="text-[#ffc000] font-black text-xl">{studentName.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-[#ffc000] leading-snug tracking-tight">{studentName}</h2>
                <span className="text-xs font-medium text-slate-400">{studentRole}</span>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-2.5">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={`${item.id}-${idx}`}
                  onClick={() => {
                    onSelectTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#ffc000] text-[#0d1322] shadow-lg shadow-[#ffc000]/20 font-bold'
                      : 'text-slate-200 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#0d1322]' : 'text-slate-300'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-xs font-extrabold w-5 h-5 flex items-center justify-center rounded-full ${
                        isActive
                          ? 'bg-[#0d1322] text-[#ffc000]'
                          : 'bg-[#ffc000] text-[#0d1322]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer - Switch Mode / Logout */}
        <div className="pt-6 border-t border-slate-800/80 space-y-2">
          {isAdminTab ? (
            <button
              onClick={() => {
                onSelectTab('dashboard');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-xl transition-all font-semibold text-xs cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4 text-[#ffc000]" />
              <span>Switch to Student View</span>
            </button>
          ) : userRole === 'admin' ? (
            <button
              onClick={() => {
                onSelectTab('admin_analytics');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-[#ffc000] hover:bg-slate-800/40 rounded-xl transition-all font-semibold text-xs cursor-pointer"
            >
              <Database className="w-4 h-4 text-[#ffc000]" />
              <span>Switch to Admin CMS</span>
            </button>
          ) : null}

          <button
            onClick={() => {
              if (onLogout) onLogout();
              else onSelectTab('auth');
              onClose();
            }}
            className="w-full flex items-center gap-4 px-4 py-3 text-slate-300 hover:text-rose-400 hover:bg-slate-800/40 rounded-xl transition-all font-semibold text-sm cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-rose-400/90" />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </div>
  );
};
