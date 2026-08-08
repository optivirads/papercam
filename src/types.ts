export type NavTab =
  | 'dashboard'
  | 'courses'
  | 'learning'
  | 'tests'
  | 'syllabus'
  | 'downloads'
  | 'notifications'
  | 'profile'
  | 'admin_qbank'
  | 'admin_courses'
  | 'admin_analytics'
  | 'admin_students'
  | 'performance_rank'
  | 'auth'
  | 'onboarding';

export interface UserQualification {
  id: 'sslc' | 'plus_two' | 'graduate' | 'post_graduate' | 'phd';
  label: string;
}

export interface StudentProfileForm {
  fullName: string;
  email: string;
  mobileNumber: string;
  qualification: 'SSLC' | '+2 (Higher Secondary)' | 'Graduate' | 'Post Graduate';
  profilePicUrl?: string;
  targetExams: string[];
}

export interface UserProfile {
  name: string;
  email?: string;
  mobile?: string;
  role: string;
  avatarUrl: string;
  qualification?: string;
  focusCourse: string;
  focusProgress: number;
}

export interface LiveSession {
  title: string;
  time: string;
  isLive: boolean;
}

export interface ResumeVideo {
  id: string;
  title: string;
  description: string;
  durationLeft: string;
  thumbnailUrl: string;
  youtubeId: string;
}

export interface RecentTest {
  title: string;
  score: number;
  maxScore: number;
  rank: number;
  totalParticipants: number;
}
