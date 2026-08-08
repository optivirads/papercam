import React, { useState } from 'react';
import {
  User,
  Award,
  CheckSquare,
  ChevronRight,
  Edit3,
  Lock,
  Bell,
  LogOut,
  Globe,
  FileText,
  GraduationCap,
  X,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Phone,
  Mail,
  ShieldCheck
} from 'lucide-react';
import type { NavTab, StudentProfileForm } from '../../types';
import { BottomNav } from '../common/BottomNav';
import { PrivacyPolicyModal } from '../common/PrivacyPolicyModal';

interface ProfileScreenProps {
  onNavigateTab: (tab: NavTab) => void;
  studentProfile?: StudentProfileForm | null;
  onUpdateProfile?: (profile: StudentProfileForm) => void;
  onLogout?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigateTab,
  studentProfile,
  onUpdateProfile,
  onLogout
}) => {
  const [examLanguage, setExamLanguage] = useState<'english' | 'malayalam'>('english');
  
  // Modals visibility state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState<boolean>(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);

  // Edit Profile form state
  const [profileForm, setProfileForm] = useState<StudentProfileForm>({
    fullName: studentProfile?.fullName || 'K. S. Madhavan',
    email: studentProfile?.email || 'madhavan.ks@example.com',
    mobileNumber: studentProfile?.mobileNumber || '9876543210',
    qualification: studentProfile?.qualification || 'Graduate',
    profilePicUrl: studentProfile?.profilePicUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    targetExams: studentProfile?.targetExams || ['LDC 2024 Batch', '10th Prelims VFA']
  });

  // Change Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Notification preferences state
  const [notifPreferences, setNotifPreferences] = useState({
    pushNotifs: true,
    smsAlerts: true,
    emailAlerts: false,
    hallTicketAlerts: true,
    mockTestReminders: true,
    liveClassReminders: true
  });

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: '', color: '', percent: 0 };
    if (pass.length < 6) return { label: 'Weak', color: 'bg-rose-500 text-rose-400', percent: 30 };
    if (pass.length < 10 || !/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) {
      return { label: 'Medium', color: 'bg-amber-500 text-amber-400', percent: 65 };
    }
    return { label: 'Strong', color: 'bg-[#2ed573] text-[#2ed573]', percent: 100 };
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    setPasswordSuccess('Password successfully updated!');
    setTimeout(() => {
      setIsChangePasswordOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordSuccess('');
    }, 1200);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm.fullName.trim()) return;
    if (onUpdateProfile) {
      onUpdateProfile(profileForm);
    }
    setIsEditing(false);
  };

  const strength = getPasswordStrength(newPassword);

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-28 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      {/* HEADER CARD WITH AVATAR & RANK */}
      <div className="rounded-3xl bg-gradient-to-b from-[#1a233b] to-[#121829] border border-slate-800 p-6 text-center shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#ffc000]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-[#ffc000] to-amber-600 shadow-2xl">
          <img
            src={profileForm.profilePicUrl}
            alt={profileForm.fullName}
            className="w-full h-full object-cover rounded-full border-2 border-[#0d1322]"
          />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {profileForm.fullName}
          </h2>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e293b] border border-[#ffc000]/30 text-[#ffc000] text-[11px] font-extrabold shadow-sm">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>QUALIFICATION: {profileForm.qualification.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* EXAM LANGUAGE PREFERENCE CARD */}
      <div className="rounded-2xl bg-[#141c2e] border border-slate-800 p-5 space-y-3.5 shadow-lg">
        <div className="flex items-center gap-2.5 text-[#ffc000]">
          <Globe className="w-5 h-5" />
          <h3 className="text-sm font-extrabold text-white">
            Preferred Exam Medium & Language
          </h3>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          Select your default question paper, option, and solution language for all mock tests and practice quizzes.
        </p>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={() => setExamLanguage('english')}
            className={`py-3 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center justify-center gap-2 ${
              examLanguage === 'english'
                ? 'bg-[#ffc000] text-[#0d1322] border-[#ffc000] shadow-md font-extrabold'
                : 'bg-[#0d1322] text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-sm">🇬🇧</span>
            <span>English</span>
          </button>

          <button
            onClick={() => setExamLanguage('malayalam')}
            className={`py-3 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center justify-center gap-2 ${
              examLanguage === 'malayalam'
                ? 'bg-[#ffc000] text-[#0d1322] border-[#ffc000] shadow-md font-extrabold'
                : 'bg-[#0d1322] text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-sm">🇮🇳</span>
            <span>മലയാളം (Malayalam)</span>
          </button>
        </div>
      </div>

      {/* LEARNING STATS CARD */}
      <div className="rounded-2xl bg-[#141c2e] border border-slate-800 p-5 space-y-4 shadow-lg">
        <div className="flex items-center gap-2.5 text-[#ffc000]">
          <Award className="w-5 h-5" />
          <h3 className="text-sm font-extrabold text-white">
            Learning Stats
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0d1322] p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Study Hours
            </span>
            <div className="text-2xl font-extrabold text-[#ffc000]">
              342 <span className="text-xs font-bold text-slate-400">hrs</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#2ed573] h-full rounded-full w-[75%]" />
            </div>
          </div>

          <div className="bg-[#0d1322] p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Mock Tests Taken
            </span>
            <div className="text-2xl font-extrabold text-[#ffc000]">
              47
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#ffc000] h-full rounded-full w-[60%]" />
            </div>
          </div>
        </div>
      </div>

      {/* DOWNLOADED MATERIALS CARD */}
      <div className="rounded-2xl bg-[#141c2e] border border-slate-800 p-5 space-y-3.5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-[#ffc000]">
            <CheckSquare className="w-5 h-5" />
            <h3 className="text-sm font-extrabold text-white">
              Downloaded Materials
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('downloads')}
            className="text-xs font-bold text-[#ffc000] hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="space-y-2.5">
          <div
            onClick={() => onNavigateTab('downloads')}
            className="p-3.5 rounded-xl bg-[#0d1322] border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Kerala Renaissance Notes</h4>
                <span className="text-[10px] text-slate-400 font-semibold">PDF • 2.4 MB</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div
            onClick={() => onNavigateTab('downloads')}
            className="p-3.5 rounded-xl bg-[#0d1322] border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">LDC Previous Year Q&A 2022</h4>
                <span className="text-[10px] text-slate-400 font-semibold">DOCX • 1.1 MB</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* ACCOUNT SETTINGS CARD */}
      <div className="rounded-2xl bg-[#141c2e] border border-slate-800 p-5 space-y-3 shadow-lg">
        <div className="flex items-center gap-2.5 text-[#ffc000] mb-1">
          <User className="w-5 h-5" />
          <h3 className="text-sm font-extrabold text-white">
            Account Settings
          </h3>
        </div>

        <div className="space-y-2 text-xs font-bold">
          <button
            onClick={() => setIsEditing(true)}
            className="w-full p-3.5 rounded-xl bg-[#0d1322] border border-slate-800 flex items-center gap-3 text-slate-200 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-[#ffc000]" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => {
              setPasswordError('');
              setPasswordSuccess('');
              setIsChangePasswordOpen(true);
            }}
            className="w-full p-3.5 rounded-xl bg-[#0d1322] border border-slate-800 flex items-center gap-3 text-slate-200 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>Change Password</span>
          </button>

          <button
            onClick={() => setIsNotificationsModalOpen(true)}
            className="w-full p-3.5 rounded-xl bg-[#0d1322] border border-slate-800 flex items-center gap-3 text-slate-200 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>Notification Preferences</span>
          </button>

          <button
            onClick={() => setIsPrivacyModalOpen(true)}
            className="w-full p-3.5 rounded-xl bg-[#0d1322] border border-slate-800 flex items-center gap-3 text-slate-200 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#ffc000]" />
            <span>Privacy Policy & Terms</span>
          </button>

          <button
            onClick={() => {
              if (onLogout) onLogout();
              else onNavigateTab('auth');
            }}
            className="w-full p-3.5 rounded-xl bg-[#0d1322] border border-slate-800 flex items-center gap-3 text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#121829] border border-slate-800 rounded-2xl p-5 max-w-xs w-full space-y-4 shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-extrabold text-white">Edit Student Details</h3>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs font-bold">
              <div>
                <label className="text-slate-400 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-[#ffc000]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-[#ffc000]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={profileForm.mobileNumber}
                    onChange={(e) => setProfileForm({ ...profileForm, mobileNumber: e.target.value })}
                    className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-[#ffc000]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Qualification</label>
                <select
                  value={profileForm.qualification}
                  onChange={(e) => setProfileForm({ ...profileForm, qualification: e.target.value as any })}
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2 text-xs text-white focus:border-[#ffc000]"
                >
                  <option value="SSLC">SSLC</option>
                  <option value="+2 (Higher Secondary)">+2 (Higher Secondary)</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-xs hover:brightness-110 cursor-pointer shadow-md mt-2"
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#121829] border border-slate-800 rounded-2xl p-5 max-w-xs w-full space-y-4 shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setIsChangePasswordOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-indigo-400">
              <Lock className="w-5 h-5" />
              <h3 className="text-sm font-extrabold text-white">Change Account Password</h3>
            </div>

            {passwordError && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="p-2.5 rounded-xl bg-[#2ed573]/10 border border-[#2ed573]/20 text-[#2ed573] text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-3 text-xs font-bold">
              <div>
                <label className="text-slate-400 block mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white focus:border-[#ffc000]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white focus:border-[#ffc000]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {newPassword && (
                  <div className="mt-1.5 space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">Password Strength:</span>
                      <span className={`font-extrabold ${strength.color}`}>{strength.label}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className={`h-full ${strength.color}`} style={{ width: `${strength.percent}%` }} />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#ffc000]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold text-xs transition-colors cursor-pointer shadow-md mt-2"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}

      {/* NOTIFICATION PREFERENCES MODAL */}
      {isNotificationsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#121829] border border-slate-800 rounded-2xl p-5 max-w-xs w-full space-y-4 shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setIsNotificationsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-emerald-400">
              <Bell className="w-5 h-5" />
              <h3 className="text-sm font-extrabold text-white">Notification Settings</h3>
            </div>

            <div className="space-y-3 text-xs font-bold pt-1">
              {[
                { key: 'pushNotifs', label: 'Push Notifications', sub: 'Instant device alerts' },
                { key: 'smsAlerts', label: 'SMS Exam Alerts', sub: 'Important hall ticket SMS' },
                { key: 'emailAlerts', label: 'Email Newsletters', sub: 'Weekly PSC study plans' },
                { key: 'hallTicketAlerts', label: 'Hall Ticket Releases', sub: 'Thulasi portal updates' },
                { key: 'mockTestReminders', label: 'Mock Test Reminders', sub: 'Daily test reminders' },
                { key: 'liveClassReminders', label: 'Live Class Alerts', sub: '30 mins before live stream' }
              ].map((item) => {
                const k = item.key as keyof typeof notifPreferences;
                const isChecked = notifPreferences[k];

                return (
                  <div
                    key={item.key}
                    onClick={() => setNotifPreferences({ ...notifPreferences, [k]: !isChecked })}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#0d1322] border border-slate-800 hover:border-slate-700 cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{item.label}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{item.sub}</div>
                    </div>

                    <div className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 ${
                      isChecked ? 'bg-[#2ed573]' : 'bg-slate-700'
                    }`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        isChecked ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setIsNotificationsModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#2ed573] text-[#0d1322] font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer"
            >
              Save Notification Settings
            </button>
          </div>
        </div>
      )}

      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <BottomNav activeTab="profile" onNavigateTab={onNavigateTab} />

    </div>
  );
};
