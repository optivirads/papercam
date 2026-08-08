import { dbService } from './db';

export type UserRole = 'student' | 'admin';

export interface AuthUserSession {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  authMethod: 'google' | 'phone_otp';
  role: UserRole;
  token: string;
  createdAt: string;
}

// Configured list of authorized admin emails and mobile numbers
const ADMIN_EMAILS = ['admin@papercam.app', 'abhinav@papercam.app', 'pscmaster.admin@gmail.com'];
const ADMIN_PHONES = ['9876543210', '9995550000', '9895000000'];

const STORAGE_KEY = 'papercam_auth_session';

export class AuthService {
  /**
   * Determine user role based on email or phone
   */
  public static checkUserRole(email?: string, phone?: string): UserRole {
    if (email && ADMIN_EMAILS.includes(email.toLowerCase())) {
      return 'admin';
    }
    if (phone && ADMIN_PHONES.includes(phone.replace(/\D/g, ''))) {
      return 'admin';
    }
    return 'student';
  }

  /**
   * Get currently active authenticated session
   */
  public static getCurrentSession(): AuthUserSession | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as AuthUserSession;
    } catch (e) {
      return null;
    }
  }

  /**
   * Authenticate via Google OAuth
   */
  public static async signInWithGoogle(googleEmail: string, googleName: string): Promise<AuthUserSession> {
    const role = this.checkUserRole(googleEmail, undefined);
    const session: AuthUserSession = {
      id: `usr-g-${Date.now()}`,
      name: googleName || 'Google User',
      email: googleEmail,
      authMethod: 'google',
      role,
      token: `g-jwt-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));

    // Persist minimal profile in IndexedDB — user will complete full profile during onboarding
    await dbService.saveProfile({
      fullName: session.name,
      email: session.email || '',
      mobileNumber: '',
      qualification: 'Graduate',
      targetExams: []
    });

    return session;
  }

  /**
   * Authenticate via Mobile Phone OTP
   */
  public static async signInWithPhoneOtp(phoneNumber: string, otpCode: string): Promise<AuthUserSession> {
    if (otpCode.length < 4) {
      throw new Error('Invalid OTP code');
    }

    const role = this.checkUserRole(undefined, phoneNumber);
    const session: AuthUserSession = {
      id: `usr-p-${Date.now()}`,
      name: role === 'admin' ? 'Kerala PSC Admin' : 'PSC Aspirant',
      phone: phoneNumber,
      authMethod: 'phone_otp',
      role,
      token: `p-jwt-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));

    // Persist minimal profile in IndexedDB — user will complete full profile during onboarding
    await dbService.saveProfile({
      fullName: session.name,
      email: '',
      mobileNumber: phoneNumber,
      qualification: 'Graduate',
      targetExams: []
    });

    return session;
  }

  /**
   * Log out active session
   */
  public static logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
