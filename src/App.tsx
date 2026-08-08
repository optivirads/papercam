import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Header, SideDrawer, PwaInstallBanner } from './components/common';
import { apiService } from './services/api';
import { NativeService } from './services/nativeService';
import { AuthService, type UserRole } from './services/authService';
import {
  DashboardScreen,
  CoursesScreen,
  MyLearningScreen,
  TopicWorkspaceScreen,
  ExamRunnerScreen,
  MockTestsScreen,
  ProfileScreen,
  DownloadsScreen,
  NotificationsScreen,
  PerformanceRankScreen,
  SyllabusScreen
} from './components/student';
import {
  AdminQuestionBankScreen,
  AdminCourseManagerScreen,
  AdminAnalyticsScreen,
  AdminStudentRecordsScreen
} from './components/admin';
import { AuthScreen, OnboardingProfileScreen } from './components/auth';
import { LandingPage } from './components/landing/LandingPage';
import type { NavTab, StudentProfileForm } from './types';


// ─── Protected Route Wrapper ────────────────────────────────────────────────
function RequireAuth({ children }: { children: React.ReactNode }) {
  const session = AuthService.getCurrentSession();
  if (!session) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const session = AuthService.getCurrentSession();
  if (!session) return <Navigate to="/auth" replace />;
  if (session.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}


// ─── Main App Shell (authenticated layout) ─────────────────────────────────
function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [studentProfile, setStudentProfile] = useState<StudentProfileForm | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('student');

  // Derive activeTab from URL path
  const pathToTab: Record<string, NavTab> = {
    '/dashboard': 'dashboard',
    '/courses': 'courses',
    '/learning': 'learning',
    '/tests': 'tests',
    '/syllabus': 'syllabus',
    '/performance': 'performance_rank',
    '/downloads': 'downloads',
    '/notifications': 'notifications',
    '/profile': 'profile',
    '/admin/analytics': 'admin_analytics',
    '/admin/questions': 'admin_qbank',
    '/admin/courses': 'admin_courses',
    '/admin/students': 'admin_students',
  };

  const activeTab = (pathToTab[location.pathname] || 'dashboard') as NavTab;

  useEffect(() => {
    async function loadProfileData() {
      const session = AuthService.getCurrentSession();
      if (session) setUserRole(session.role);
      const p = await apiService.getProfile();
      setStudentProfile(p);
    }
    loadProfileData();
    NativeService.initNativeFeatures(() => {
      navigate(-1);
    });
  }, []);

  const handleTabNavigation = (tab: NavTab) => {
    if (tab.startsWith('admin_') && userRole !== 'admin') {
      alert('Access Denied: Admin CMS privileges required.');
      return;
    }
    const tabToPath: Record<NavTab, string> = {
      dashboard: '/dashboard',
      courses: '/courses',
      learning: '/learning',
      tests: '/tests',
      syllabus: '/syllabus',
      performance_rank: '/performance',
      downloads: '/downloads',
      notifications: '/notifications',
      profile: '/profile',
      admin_analytics: '/admin/analytics',
      admin_qbank: '/admin/questions',
      admin_courses: '/admin/courses',
      admin_students: '/admin/students',
      auth: '/auth',
      onboarding: '/onboarding',
    };
    navigate(tabToPath[tab] || '/dashboard');
    setIsDrawerOpen(false);
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate('/auth', { replace: true });
  };

  const studentDisplayName = studentProfile?.fullName || 'PSC Aspirant';
  const avatarUrl = studentProfile?.profilePicUrl;

  return (
    <div className="w-full min-h-screen bg-[#0b0f19] flex justify-center selection:bg-[#ffc000] selection:text-[#0d1322]">
      <div className="w-full max-w-7xl min-h-screen bg-[#0d1322] flex flex-col md:flex-row shadow-2xl relative border-x border-slate-800/60">

        {/* Desktop Permanent Left Navigation Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-slate-800/80 bg-[#101726] shrink-0 p-5 space-y-6 sticky top-0 h-screen overflow-y-auto z-20">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ffc000] to-amber-500 flex items-center justify-center font-extrabold text-[#0d1322] shadow-lg text-lg">P</div>
            <div>
              <h1 className="font-extrabold text-white tracking-wider text-sm">PSC MASTER</h1>
              <p className="text-[10px] text-amber-400 font-semibold tracking-wide uppercase">Kerala Exam Portal</p>
            </div>
          </button>

          <div className="space-y-1 pt-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Student Hub</div>
            {[
              { id: 'dashboard', label: '🏠 Dashboard' },
              { id: 'courses', label: '📚 Course Catalog' },
              { id: 'learning', label: '🎓 My Learning' },
              { id: 'tests', label: '📝 Mock Tests & PYQ' },
              { id: 'syllabus', label: '📋 Official Syllabus' },
              { id: 'performance_rank', label: '🏆 Statewide Rank' },
              { id: 'downloads', label: '💾 Offline Library' },
              { id: 'notifications', label: '🔔 Notifications' },
              { id: 'profile', label: '👤 Profile Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabNavigation(item.id as NavTab)}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#ffc000] text-[#0d1322] shadow-md scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {userRole === 'admin' && (
            <div className="space-y-1 pt-4 border-t border-slate-800/80">
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest px-3 mb-2">Admin CMS Panel</div>
              {[
                { id: 'admin_analytics', label: '📊 Analytics Overview' },
                { id: 'admin_qbank', label: '❓ Question Bank' },
                { id: 'admin_courses', label: '🗂️ Curriculum Editor' },
                { id: 'admin_students', label: '👥 Student Records' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabNavigation(item.id as NavTab)}
                  className={`w-full flex items-center px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Sidebar Footer — Profile */}
          <div className="mt-auto pt-4 border-t border-slate-800/60">
            <button
              onClick={() => handleTabNavigation('profile')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800/50 transition-all cursor-pointer"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover border-2 border-slate-700" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#ffc000]/20 border border-[#ffc000]/30 flex items-center justify-center text-[#ffc000] font-black text-sm">
                  {studentDisplayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-left overflow-hidden">
                <div className="text-xs font-bold text-white truncate">{studentDisplayName}</div>
                <div className="text-[10px] text-slate-400 font-medium">{userRole === 'admin' ? 'Admin • Kerala PSC' : 'PSC Aspirant'}</div>
              </div>
            </button>
          </div>
        </aside>

        {/* Center Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Sticky Header */}
          <Header
            onOpenDrawer={() => setIsDrawerOpen(true)}
            onOpenNotifications={() => handleTabNavigation('notifications')}
            notificationCount={0}
            studentName={studentDisplayName}
            avatarUrl={avatarUrl}
          />

          {/* Android PWA Install Banner */}
          <PwaInstallBanner />

          {/* Side Navigation Drawer for Mobile */}
          <SideDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            activeTab={activeTab}
            onSelectTab={handleTabNavigation}
            onLogout={handleLogout}
            userRole={userRole}
            studentName={studentDisplayName}
            studentRole={userRole === 'admin' ? 'Kerala PSC Admin' : 'PSC Aspirant'}
            avatarUrl={avatarUrl || ''}
          />

          {/* Main Content Routed Body */}
          <main className="flex-1 pt-[56px] px-4 md:px-8">
            <Routes>
              <Route path="/dashboard" element={
                <DashboardScreen
                  studentName={studentDisplayName}
                  activeTab={activeTab}
                  onNavigateTab={handleTabNavigation}
                />
              } />
              <Route path="/courses" element={
                <CoursesScreen
                  onSelectTopicWorkspace={(courseId, topicId) => navigate(`/courses/${courseId}/${topicId}`)}
                  onNavigateTab={handleTabNavigation}
                />
              } />
              <Route path="/courses/:courseId/:topicId" element={
                <TopicWorkspaceScreen
                  courseId=""
                  topicId=""
                  onBackToCourse={() => navigate('/courses')}
                  onStartExam={(count) => navigate(`/test/run?count=${count}`)}
                />
              } />
              <Route path="/learning" element={
                <MyLearningScreen
                  onNavigateTab={handleTabNavigation}
                  onOpenTopicWorkspace={(courseId, topicId) => navigate(`/courses/${courseId}/${topicId}`)}
                />
              } />
              <Route path="/tests" element={
                <MockTestsScreen
                  onStartFullMockExam={(_title, count) => navigate(`/test/run?count=${count}`)}
                  onNavigateTab={handleTabNavigation}
                />
              } />
              <Route path="/test/run" element={
                <ExamRunnerScreen
                  questionCount={
                    (() => {
                      const params = new URLSearchParams(window.location.search);
                      return parseInt(params.get('count') || '20', 10);
                    })()
                  }
                  onFinishExam={() => navigate('/tests')}
                  onExitExam={() => navigate('/tests')}
                />
              } />
              <Route path="/syllabus" element={
                <SyllabusScreen
                  onNavigateTab={handleTabNavigation}
                  onStartExamOnTopic={() => navigate('/test/run?count=10')}
                />
              } />
              <Route path="/performance" element={
                <PerformanceRankScreen
                  onNavigateTab={handleTabNavigation}
                  onViewAnalysis={() => navigate('/test/run?count=20')}
                  onRetakeExam={() => navigate('/test/run?count=20')}
                />
              } />
              <Route path="/downloads" element={
                <DownloadsScreen onNavigateTab={handleTabNavigation} />
              } />
              <Route path="/notifications" element={
                <NotificationsScreen onNavigateTab={handleTabNavigation} />
              } />
              <Route path="/profile" element={
                <ProfileScreen
                  studentProfile={studentProfile}
                  onUpdateProfile={async (profile) => {
                    setStudentProfile(profile);
                    await apiService.updateProfile(profile);
                  }}
                  onLogout={handleLogout}
                  onNavigateTab={handleTabNavigation}
                />
              } />
              <Route path="/admin/analytics" element={
                <RequireAdmin><AdminAnalyticsScreen /></RequireAdmin>
              } />
              <Route path="/admin/questions" element={
                <RequireAdmin><AdminQuestionBankScreen /></RequireAdmin>
              } />
              <Route path="/admin/courses" element={
                <RequireAdmin><AdminCourseManagerScreen /></RequireAdmin>
              } />
              <Route path="/admin/students" element={
                <RequireAdmin><AdminStudentRecordsScreen /></RequireAdmin>
              } />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}


// ─── Root App with BrowserRouter ────────────────────────────────────────────
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={
          <AuthScreen
            onLoginSuccess={(session) => {
              // Navigate will happen inside AuthScreen after this sets session
              window.location.href = session.role === 'admin' ? '/admin/analytics' : '/dashboard';
            }}
          />
        } />
        <Route path="/onboarding" element={
          <RequireAuth>
            <OnboardingScreenWrapper />
          </RequireAuth>
        } />

        {/* Protected app routes */}
        <Route path="/dashboard" element={<RequireAuth><AppShell /></RequireAuth>} />
        <Route path="/courses/*" element={<RequireAuth><AppShell /></RequireAuth>} />
        <Route path="/learning" element={<RequireAuth><AppShell /></RequireAuth>} />
        <Route path="/tests" element={<RequireAuth><AppShell /></RequireAuth>} />
        <Route path="/test/run" element={<RequireAuth><AppShell /></RequireAuth>} />
        <Route path="/syllabus" element={<RequireAuth><AppShell /></RequireAuth>} />
        <Route path="/performance" element={<RequireAuth><AppShell /></RequireAuth>} />
        <Route path="/downloads" element={<RequireAuth><AppShell /></RequireAuth>} />
        <Route path="/notifications" element={<RequireAuth><AppShell /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><AppShell /></RequireAuth>} />
        <Route path="/admin/*" element={<RequireAuth><AppShell /></RequireAuth>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function OnboardingScreenWrapper() {
  const navigate = useNavigate();
  const session = AuthService.getCurrentSession();
  return (
    <OnboardingProfileScreen
      initialMobile={session?.phone || ''}
      onSaveProfile={async (profile) => {
        await apiService.updateProfile(profile);
        navigate('/dashboard', { replace: true });
      }}
    />
  );
}

export default App;
