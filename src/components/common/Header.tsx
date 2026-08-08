import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenDrawer: () => void;
  onOpenNotifications?: () => void;
  notificationCount?: number;
  studentName?: string;
  avatarUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  onOpenNotifications,
  notificationCount = 0,
  studentName,
  avatarUrl,
}) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 md:px-8 py-3.5 bg-[#0d1322]/95 backdrop-blur-md border-b border-slate-800/60 select-none">
      {/* Left: Hamburger (mobile) + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenDrawer}
          className="md:hidden p-2 -ml-1 text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all active:scale-95 cursor-pointer"
          aria-label="Open Navigation Drawer"
        >
          <Menu className="w-6 h-6" />
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
          aria-label="PSC Master Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ffc000] to-amber-400 flex items-center justify-center font-black text-[#0d1322] text-sm shadow-md">P</div>
          <span className="text-lg font-black tracking-tight text-white hidden sm:block">
            PSC <span className="text-[#ffc000]">Master</span>
          </span>
        </button>
      </div>

      {/* Right: Notifications + Avatar */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all cursor-pointer active:scale-95"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffc000] text-[10px] font-bold text-[#0d1322]">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        {avatarUrl ? (
          <button
            onClick={onOpenNotifications}
            className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-700 hover:border-[#ffc000] transition-all cursor-pointer"
            aria-label="Profile"
          >
            <img src={avatarUrl} alt={studentName || 'Profile'} className="w-full h-full object-cover" />
          </button>
        ) : (
          <button
            onClick={onOpenNotifications}
            className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:border-[#ffc000] transition-all cursor-pointer"
            aria-label="Profile"
          >
            <User className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
