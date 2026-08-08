import React, { useState } from 'react';
import {
  Bell,
  Clock,
  ChevronRight,
  Video,
  Award,
  AlertCircle,
  Trash2
} from 'lucide-react';
import type { NavTab } from '../../types';
import { BottomNav } from '../common/BottomNav';

interface NotificationsScreenProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenLiveWaitingRoom?: () => void;
}

export interface NotificationItem {
  id: string;
  type: 'hall_ticket' | 'live_class' | 'mock_test' | 'study_reminder';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionText?: string;
  actionRoute?: NavTab | 'live_modal';
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'hall_ticket',
    title: 'Kerala PSC LDC 2024 Hall Ticket Released!',
    description: 'Official admission tickets for 10th level preliminary examination are now available on Kerala PSC Thulasi portal.',
    timestamp: '10 mins ago',
    isRead: false,
    actionText: 'View Exam Details',
    actionRoute: 'tests'
  },
  {
    id: 'notif-2',
    type: 'live_class',
    title: 'Live Class Tonight at 7:00 PM',
    description: 'Special high-yield session on Kerala History & Renaissance by Mentor K. S. Madhavan.',
    timestamp: '1 hour ago',
    isRead: false,
    actionText: 'Join Live Session',
    actionRoute: 'live_modal'
  },
  {
    id: 'notif-3',
    type: 'mock_test',
    title: 'New PYQ Mock Test Published: Degree Level 2023',
    description: 'Official solved question paper with step-by-step explanations and Related PSC Facts added to Mock Tests hub.',
    timestamp: 'Yesterday',
    isRead: false,
    actionText: 'Attempt Mock Test',
    actionRoute: 'tests'
  },
  {
    id: 'notif-4',
    type: 'study_reminder',
    title: 'Daily Study Goal Reminder: 45 Mins Remaining',
    description: 'You are 15 minutes away from completing your daily target. Resume your Indian Polity topic workspace!',
    timestamp: '2 days ago',
    isRead: true,
    actionText: 'Resume Learning',
    actionRoute: 'courses'
  }
];

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onNavigateTab,
  onOpenLiveWaitingRoom
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = ['All', 'Unread', 'Hall Tickets', 'Live Classes', 'Mock Tests'];

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const clearAllNotifications = () => {
    if (confirm('Clear all notifications?')) {
      setNotifications([]);
    }
  };

  const handleClearNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleActionClick = (notif: NotificationItem) => {
    setNotifications(notifications.map((n) => n.id === notif.id ? { ...n, isRead: true } : n));

    if (notif.actionRoute === 'live_modal' && onOpenLiveWaitingRoom) {
      onOpenLiveWaitingRoom();
    } else if (notif.actionRoute && notif.actionRoute !== 'live_modal') {
      onNavigateTab(notif.actionRoute as NavTab);
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (selectedFilter === 'Unread') return !n.isRead;
    if (selectedFilter === 'Hall Tickets') return n.type === 'hall_ticket';
    if (selectedFilter === 'Live Classes') return n.type === 'live_class';
    if (selectedFilter === 'Mock Tests') return n.type === 'mock_test';
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-28 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#ffc000] uppercase tracking-wider">
              Updates & PSC Announcements
            </span>
            {unreadCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {unreadCount} New
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Notifications & Alerts
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs font-bold text-[#ffc000] hover:underline cursor-pointer"
            >
              Mark Read
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 font-extrabold text-xs hover:bg-rose-500/20 transition-all cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filters.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === cat
                ? 'bg-[#ffc000] text-[#0d1322] shadow-md shadow-[#ffc000]/20'
                : 'bg-[#141c2e] text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3 pt-1">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-10 space-y-2 bg-[#141c2e] rounded-2xl border border-slate-800 p-6">
            <Bell className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Notifications</h3>
            <p className="text-xs text-slate-400">You are all caught up! Check back later for official PSC updates.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleActionClick(notif)}
              className={`rounded-2xl border p-4 shadow-lg transition-all cursor-pointer relative group ${
                !notif.isRead
                  ? 'bg-[#162035] border-[#ffc000]/40'
                  : 'bg-[#141c2e] border-slate-800 hover:border-slate-700'
              }`}
            >
              {!notif.isRead && (
                <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#ffc000] shadow-sm animate-pulse" />
              )}

              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                  notif.type === 'hall_ticket'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    : notif.type === 'live_class'
                    ? 'bg-[#ffc000]/10 text-[#ffc000] border-[#ffc000]/20'
                    : notif.type === 'mock_test'
                    ? 'bg-[#2ed573]/10 text-[#2ed573] border-[#2ed573]/20'
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                }`}>
                  {notif.type === 'hall_ticket' && <AlertCircle className="w-5 h-5" />}
                  {notif.type === 'live_class' && <Video className="w-5 h-5" />}
                  {notif.type === 'mock_test' && <Award className="w-5 h-5" />}
                  {notif.type === 'study_reminder' && <Clock className="w-5 h-5" />}
                </div>

                <div className="flex-1 space-y-1 pr-4">
                  <h3 className="text-xs font-extrabold text-white leading-snug">
                    {notif.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {notif.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {notif.timestamp}
                    </span>

                    {notif.actionText && (
                      <span className="text-[11px] font-extrabold text-[#ffc000] hover:underline flex items-center gap-1">
                        <span>{notif.actionText}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => handleClearNotification(notif.id, e)}
                  title="Remove Notification"
                  className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      <BottomNav activeTab="notifications" onNavigateTab={onNavigateTab} />

    </div>
  );
};
