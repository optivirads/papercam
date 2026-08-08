import { useState, useEffect } from 'react';
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
import type { NavTab, StudentProfileForm } from './types';








export function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [userPhone, setUserPhone] = useState<string>('9876543210');
  const [studentProfile, setStudentProfile] = useState<StudentProfileForm | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('student');

  // Navigation stack state for course -> topic workspace -> exam runner
  const [currentCourseId, setCurrentCourseId] = useState<string | null>(null);
  const [currentTopicId, setCurrentTopicId] = useState<string | null>(null);
  const [activeExamQuestionCount, setActiveExamQuestionCount] = useState<number | null>(null);

  useEffect(() => {
    async function loadProfileData() {
      const session = AuthService.getCurrentSession();
      if (session) {
        setUserRole(session.role);
      }
      const p = await apiService.getProfile();
      setStudentProfile(p);
    }
    loadProfileData();

    // Initialize Native Android Device Features
    NativeService.initNativeFeatures(() => {
      if (activeExamQuestionCount !== null) {
        setActiveExamQuestionCount(null);
      } else if (currentTopicId !== null) {
        setCurrentTopicId(null);
      } else if (activeTab !== 'dashboard') {
        setActiveTab('dashboard');
      }
    });
  }, [activeExamQuestionCount, currentTopicId, activeTab]);


  const handleTabNavigation = (tab: NavTab) => {
    if (tab.startsWith('admin_') && userRole !== 'admin') {
      alert('Access Denied: Admin CMS privileges required to view this panel.');
      setActiveTab('dashboard');
      return;
    }
    setActiveTab(tab);
    setCurrentCourseId(null);
    setCurrentTopicId(null);
    setActiveExamQuestionCount(null);
  };

  const handleOpenTopicWorkspace = (courseId: string, topicId: string) => {
    setCurrentCourseId(courseId);
    setCurrentTopicId(topicId);
  };

  const handleStartExam = (count: number) => {
    setActiveExamQuestionCount(count);
  };

  const handleLogout = () => {
    AuthService.logout();
    setUserRole('student');
    setActiveTab('auth');
    setCurrentCourseId(null);
    setCurrentTopicId(null);
    setActiveExamQuestionCount(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0f19] flex justify-center selection:bg-[#ffc000] selection:text-[#0d1322]">
      {/* Mobile Device Frame Container */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#0d1322] flex flex-col shadow-2xl relative border-x border-slate-800/60">
        
        {/* Top Sticky Header */}
        <Header
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenNotifications={() => {
            setActiveTab('notifications');
            setCurrentCourseId(null);
            setCurrentTopicId(null);
          }}
          notificationCount={3}
        />

        {/* Android PWA Install Banner */}
        <PwaInstallBanner />


        {/* Side Navigation Drawer */}
        <SideDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          activeTab={activeTab}
          onSelectTab={handleTabNavigation}
          onLogout={handleLogout}
          userRole={userRole}
          studentName={studentProfile?.fullName || 'K. S. Madhavan'}
          studentRole={userRole === 'admin' ? 'Kerala PSC Admin' : 'PSC Aspirant'}
          avatarUrl={studentProfile?.profilePicUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
        />

        {/* Main Content Body Router */}
        <main className="flex-1 pt-[65px]">
          
          {/* EXAM RUNNER SCREEN */}
          {activeExamQuestionCount !== null ? (
            <ExamRunnerScreen
              questionCount={activeExamQuestionCount}
              onFinishExam={() => setActiveExamQuestionCount(null)}
              onExitExam={() => setActiveExamQuestionCount(null)}
            />
          ) : currentTopicId !== null && currentCourseId !== null ? (
            /* TOPIC WORKSPACE (Video, PDF, Exam Launcher) */
            <TopicWorkspaceScreen
              courseId={currentCourseId}
              topicId={currentTopicId}
              onBackToCourse={() => setCurrentTopicId(null)}
              onStartExam={handleStartExam}
            />
          ) : activeTab === 'dashboard' ? (
            /* DASHBOARD SCREEN */
            <DashboardScreen
              studentName={studentProfile?.fullName || 'K. S. Madhavan'}
              activeTab={activeTab}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setCurrentCourseId(null);
                setCurrentTopicId(null);
              }}
            />
          ) : activeTab === 'courses' ? (

            /* COURSES CATALOG & TOPIC LIST SCREEN */
            <CoursesScreen
              onSelectTopicWorkspace={handleOpenTopicWorkspace}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          ) : activeTab === 'learning' ? (
            /* MY LEARNING ENROLLED COURSES SCREEN */
            <MyLearningScreen
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenTopicWorkspace={handleOpenTopicWorkspace}
            />
          ) : activeTab === 'tests' ? (

            /* FULL MOCK TESTS & COMPETITIVE EXAM SERIES SCREEN */
            <MockTestsScreen
              onStartFullMockExam={(_title, count) => handleStartExam(count)}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setCurrentCourseId(null);
                setCurrentTopicId(null);
              }}
            />
          ) : activeTab === 'syllabus' ? (
            /* OFFICIAL KERALA PSC SYLLABUS BREAKDOWN SCREEN */
            <SyllabusScreen
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setCurrentCourseId(null);
                setCurrentTopicId(null);
              }}
              onStartExamOnTopic={() => handleStartExam(10)}
            />
          ) : activeTab === 'admin_qbank' ? (
            /* QUESTION BANK MANAGEMENT SCREEN (ADMIN PANEL) */
            <AdminQuestionBankScreen />
          ) : activeTab === 'profile' ? (
            /* STUDENT PROFILE & EXAM LANGUAGE PREFERENCES SCREEN */
            <ProfileScreen
              studentProfile={studentProfile}
              onUpdateProfile={async (profile) => {
                setStudentProfile(profile);
                await apiService.updateProfile(profile);
              }}
              onLogout={handleLogout}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setCurrentCourseId(null);
                setCurrentTopicId(null);
              }}
            />
          ) : activeTab === 'downloads' ? (
            /* STUDENT OFFLINE DOWNLOADS & STUDY LIBRARY SCREEN */
            <DownloadsScreen
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setCurrentCourseId(null);
                setCurrentTopicId(null);
              }}
            />
          ) : activeTab === 'notifications' ? (
            /* NOTIFICATIONS & EXAM ALERTS SCREEN */
            <NotificationsScreen
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setCurrentCourseId(null);
                setCurrentTopicId(null);
              }}
            />
          ) : activeTab === 'auth' ? (
            /* AUTHENTICATION SCREEN (GOOGLE & MOBILE OTP) */
            <AuthScreen
              onLoginSuccess={(session) => {
                setUserRole(session.role);
                if (session.phone) setUserPhone(session.phone);
                handleTabNavigation(session.role === 'admin' ? 'admin_analytics' : 'dashboard');
              }}
            />
          ) : activeTab === 'onboarding' ? (
            /* ONBOARDING PROFILE CREATION SCREEN */
            <OnboardingProfileScreen
              initialMobile={userPhone}
              onSaveProfile={async (profile) => {
                setStudentProfile(profile);
                await apiService.updateProfile(profile);
                setActiveTab('dashboard');
              }}
            />
          ) : activeTab === 'performance_rank' ? (
            /* PERFORMANCE & RANK SCREEN */
            <PerformanceRankScreen
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setCurrentCourseId(null);
                setCurrentTopicId(null);
              }}
              onViewAnalysis={() => setActiveExamQuestionCount(20)}
              onRetakeExam={() => handleStartExam(20)}
            />
          ) : activeTab === 'admin_students' ? (
            /* ADMIN STUDENT RECORDS SCREEN */
            <AdminStudentRecordsScreen />
          ) : activeTab === 'admin_courses' ? (
            /* ADMIN COURSE & TOPIC SEQUENCE BUILDER SCREEN */
            <AdminCourseManagerScreen />
          ) : activeTab === 'admin_analytics' ? (
            /* ADMIN PERFORMANCE ANALYTICS SCREEN */
            <AdminAnalyticsScreen />
          ) : (







            /* PLACEHOLDER FOR OTHER TABS */
            <div className="p-8 text-center flex flex-col items-center justify-center min-h-[60vh] space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#141c2e] border border-slate-800 flex items-center justify-center text-[#ffc000] text-2xl font-bold">
                {(activeTab as string).charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-extrabold text-white capitalize">
                {String(activeTab)} Module
              </h2>

              <p className="text-xs text-slate-400 max-w-xs">
                Tap "Mock Tests" or open the side drawer menu to attempt 10th Prelims, VFA, or SI model papers!
              </p>
              <button
                onClick={() => setActiveTab('tests')}
                className="mt-4 px-5 py-2.5 rounded-xl bg-[#ffc000] text-[#0d1322] font-bold text-xs hover:brightness-110 transition-all cursor-pointer"
              >
                Go to Mock Tests
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default App;

