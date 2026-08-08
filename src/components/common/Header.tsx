import React from 'react';
import { Menu, Bell } from 'lucide-react';

interface HeaderProps {
  onOpenDrawer: () => void;
  onOpenNotifications?: () => void;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  onOpenNotifications,
  notificationCount = 3
}) => {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 flex items-center justify-between px-5 py-4 bg-[#0d1322]/95 backdrop-blur-md border-b border-slate-800/60 select-none">
      <div className="flex items-center gap-3.5">
        <button
          onClick={onOpenDrawer}
          className="p-2 -ml-2 text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all active:scale-95 cursor-pointer"
          aria-label="Open Navigation Drawer"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-xl font-black tracking-tight text-white font-sans">
          PSC <span className="text-[#ffc000]">Master</span>
        </span>
      </div>

      <button
        onClick={onOpenNotifications}
        className="relative p-2 text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all cursor-pointer active:scale-95"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6" />
        {notificationCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffc000] text-[10px] font-bold text-[#0d1322]">
            {notificationCount}
          </span>
        )}
      </button>
    </header>
  );
};
