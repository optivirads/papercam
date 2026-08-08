import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams
} from 'react-router-dom';
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


// ─── Route guards ────────────────────────────────────────────────────────────
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


// ─── Thin wrappers that pull URL params for screens ──────────────────────────
function TopicWorkspaceRoute({
  onStartExam,
  onBack,
}: {
  onStartExam: (count: number) => void;
  onBack: () => void;
}) {
  const { courseId = '', topicId = '' } = useParams<{ courseId: string; topicId: string }>();
  return (
    <TopicWorkspaceScreen
      courseId={courseId}
      topicId={topicId}
      onBackToCourse={onBack}
      onStartExam={onStartExam}
    />
  );
}

function ExamRunnerRoute({ onExit }: { onExit: () => void }) {
  const [searchParams] = useSearchParams();
  const count = parseInt(searchParams.get('count') || '20', 10);
  const navigate = useNavigate();
  return (
    <ExamRunnerScreen
      questionCount={count}
      onFinishExam={onExit}
      onExitExam={onExit}
    />
  );
}

function OnboardingRoute() {
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


// ─── Tab → Path mapping ──────────────────────────────────────────────────────
const TAB_TO_PATH: Record<NavTab, string> = {
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

const PATH_TO_TAB: Record<string, NavTab> = Object.fromEntries(
  Object.entries(TAB_TO_PATH).map(([k, v]) => [v, k as NavTab])
);


// ─── App Shell (authenticated layout — mounts ONCE for all protected routes) ─
function AppShell({ studentProfile, setStudentProfile, userRole, onLogout }: {
  studentProfile: StudentProfileForm | null;
  setStudentProfile: (p: StudentProfileForm | null) => void;
  userRole: UserRole;
  onLogout: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Derive active tab from current URL
  const pathBase = '/' + location.pathname.split('/').slice(1, 3).join('/');
  const activeTab = (PATH_TO_TAB[location.pathname] || PATH_TO_TAB[pathBase] || 'dashboard') as NavTab;

  const handleTabNavigation = (tab: NavTab) => {
    if (tab.startsWith('admin_') && userRole !== 'admin') {
      alert('Access Denied: Admin CMS privileges required.');
      return;
    }
    navigate(TAB_TO_PATH[tab] || '/dashboard');
    setIsDrawerOpen(false);
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
            {([
              { id: 'dashboard', label: '🏠 Dashboard' },
              { id: 'courses', label: '📚 Course Catalog' },
              { id: 'learning', label: '🎓 My Learning' },
              { id: 'tests', label: '📝 Mock Tests & PYQ' },
              { id: 'syllabus', label: '📋 Official Syllabus' },
              { id: 'performance_rank', label: '🏆 Statewide Rank' },
              { id: 'downloads', label: '💾 Offline Library' },
              { id: 'notifications', label: '🔔 Notifications' },
              { id: 'profile', label: '👤 Profile Settings' },
            ] as { id: NavTab; label: string }[]).map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabNavigation(item.id)}
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
              {([
                { id: 'admin_analytics', label: '📊 Analytics Overview' },
                { id: 'admin_qbank', label: '❓ Question Bank' },
                { id: 'admin_courses', label: '🗂️ Curriculum Editor' },
                { id: 'admin_students', label: '👥 Student Records' },
              ] as { id: NavTab; label: string }[]).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabNavigation(item.id)}
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

          {/* Sidebar footer — Profile quick-access */}
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
          <Header
            onOpenDrawer={() => setIsDrawerOpen(true)}
            onOpenNotifications={() => handleTabNavigation('notifications')}
            notificationCount={0}
            studentName={studentDisplayName}
            avatarUrl={avatarUrl}
          />

          <PwaInstallBanner />

          <SideDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            activeTab={activeTab}
            onSelectTab={handleTabNavigation}
            onLogout={onLogout}
            userRole={userRole}
            studentName={studentDisplayName}
            studentRole={userRole === 'admin' ? 'Kerala PSC Admin' : 'PSC Aspirant'}
            avatarUrl={avatarUrl || ''}
          />

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
                  onSelectTopicWorkspace={(cId, tId) => navigate(`/courses/${cId}/${tId}`)}
                  onNavigateTab={handleTabNavigation}
                />
              } />

              <Route path="/courses/:courseId/:topicId" element={
                <TopicWorkspaceRoute
                  onStartExam={(count) => navigate(`/test/run?count=${count}`)}
                  onBack={() => navigate('/courses')}
                />
              } />

              <Route path="/learning" element={
                <MyLearningScreen
                  onNavigateTab={handleTabNavigation}
                  onOpenTopicWorkspace={(cId, tId) => navigate(`/courses/${cId}/${tId}`)}
                />
              } />

              <Route path="/tests" element={
                <MockTestsScreen
                  onStartFullMockExam={(_title, count) => navigate(`/test/run?count=${count}`)}
                  onNavigateTab={handleTabNavigation}
                />
              } />

              <Route path="/test/run" element={
                <ExamRunnerRoute onExit={() => navigate('/tests')} />
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
                  onLogout={onLogout}
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

              {/* Catch-all inside shell */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}


// ─── Root App — BrowserRouter wrapping ALL routes ───────────────────────────
export function App() {
  const [studentProfile, setStudentProfile] = useState<StudentProfileForm | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const session = AuthService.getCurrentSession();
    if (session) setUserRole(session.role);

    apiService.getProfile().then((p) => {
      setStudentProfile(p);
      setAuthReady(true);
    });

    NativeService.initNativeFeatures(() => {});
  }, []);

  if (!authReady) {
    // Minimal loading state while IndexedDB boots
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ffc000] to-amber-400 flex items-center justify-center font-black text-[#0d1322] text-xl mx-auto animate-pulse">P</div>
          <p className="text-slate-400 text-xs font-semibold">Loading PSC Master…</p>
        </div>
      </div>
    );
  }

  const handleLoginSuccess = (session: { role: UserRole; phone?: string }) => {
    setUserRole(session.role);
  };

  const handleLogout = () => {
    AuthService.logout();
    setStudentProfile(null);
    setUserRole('student');
  };

  return (
    <BrowserRouter>
      <AppRouter
        studentProfile={studentProfile}
        setStudentProfile={setStudentProfile}
        userRole={userRole}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />
    </BrowserRouter>
  );
}

// ─── Inner router (needs BrowserRouter context) ──────────────────────────────
function AppRouter({
  studentProfile,
  setStudentProfile,
  userRole,
  onLoginSuccess,
  onLogout,
}: {
  studentProfile: StudentProfileForm | null;
  setStudentProfile: (p: StudentProfileForm | null) => void;
  userRole: UserRole;
  onLoginSuccess: (session: { role: UserRole; phone?: string }) => void;
  onLogout: () => void;
}) {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* ── Public routes ── */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={
        <AuthScreen
          onLoginSuccess={(session) => {
            onLoginSuccess({ role: session.role, phone: session.phone });
            // Use React Router navigate — no full page reload
            navigate(session.role === 'admin' ? '/admin/analytics' : '/dashboard', { replace: true });
          }}
        />
      } />

      {/* ── Onboarding ── */}
      <Route path="/onboarding" element={
        <RequireAuth>
          <OnboardingRoute />
        </RequireAuth>
      } />

      {/* ── Protected app shell — single mount for ALL /app routes ── */}
      <Route path="/*" element={
        <RequireAuth>
          <AppShell
            studentProfile={studentProfile}
            setStudentProfile={setStudentProfile}
            userRole={userRole}
            onLogout={() => {
              onLogout();
              navigate('/auth', { replace: true });
            }}
          />
        </RequireAuth>
      } />
    </Routes>
  );
}

export default App;
