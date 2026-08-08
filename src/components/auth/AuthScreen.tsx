import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AuthService, type AuthUserSession } from '../../services/authService';

interface AuthScreenProps {
  onLoginSuccess: (session: AuthUserSession) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'google'>('mobile');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [otpStep, setOtpStep] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('4321');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOtpStep(true);
    }, 500);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) return;
    setIsSubmitting(true);
    try {
      const session = await AuthService.signInWithPhoneOtp(mobileNumber, otpCode);
      setIsSubmitting(false);
      onLoginSuccess(session);
    } catch (e) {
      setIsSubmitting(false);
      alert('Invalid OTP code. Please enter valid digits.');
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      const googleEmail = prompt('Enter your Google Account Email for authentication:', 'student@pscmaster.app') || 'student@pscmaster.app';
      const session = await AuthService.signInWithGoogle(googleEmail, googleEmail.split('@')[0].toUpperCase());
      setIsSubmitting(false);
      onLoginSuccess(session);
    } catch (e) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-20 px-5 pt-8 space-y-6 max-w-lg mx-auto animate-fade-in text-slate-100 justify-center">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#ffc000] to-amber-500 flex items-center justify-center text-[#0d1322] font-black text-2xl mx-auto shadow-xl shadow-[#ffc000]/20">
          PSC
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          PSC Master <span className="text-[#ffc000]">Portal</span>
        </h1>
        <p className="text-xs font-semibold text-slate-400 max-w-xs mx-auto">
          Kerala's #1 Learning & Mock Assessment Platform for LDC, VFA, SI & KAS.
        </p>
      </div>

      {/* Auth Card */}
      <div className="rounded-3xl bg-[#141c2e] border border-slate-800 p-6 space-y-5 shadow-2xl relative">
        
        {/* Toggle Login Option Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#0d1322] rounded-2xl border border-slate-800 text-xs font-extrabold">
          <button
            type="button"
            onClick={() => {
              setLoginMethod('mobile');
              setOtpStep(false);
            }}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              loginMethod === 'mobile'
                ? 'bg-[#ffc000] text-[#0d1322] shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mobile Login
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('google')}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              loginMethod === 'google'
                ? 'bg-[#ffc000] text-[#0d1322] shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Google Auth
          </button>
        </div>

        {/* GOOGLE LOGIN METHOD */}
        {loginMethod === 'google' && (
          <div className="space-y-4 pt-2 text-center animate-fade-in">
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Sign in with your Google OAuth account to automatically sync your test history, rank leaderboard, and offline study notes.
            </p>

            <button
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg active:scale-98"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isSubmitting ? 'Authenticating...' : 'Sign in with Google'}</span>
            </button>
          </div>
        )}

        {/* MOBILE NUMBER + OTP LOGIN METHOD */}
        {loginMethod === 'mobile' && !otpStep && (
          <form onSubmit={handleSendOtp} className="space-y-4 pt-1 animate-fade-in">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                Enter Mobile Number <span className="text-rose-400">*</span>
              </label>

              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-xs font-extrabold text-[#ffc000] flex items-center gap-1 border-r border-slate-700 pr-2">
                  🇮🇳 +91
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pl-20 pr-4 py-3 text-xs font-bold text-white placeholder-slate-500 focus:outline-none focus:border-[#ffc000] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={mobileNumber.length < 10 || isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-40 cursor-pointer shadow-lg shadow-[#ffc000]/15"
            >
              <span>{isSubmitting ? 'Sending Verification Code...' : 'Get SMS OTP Code'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* OTP VERIFICATION STEP */}
        {loginMethod === 'mobile' && otpStep && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 pt-1 animate-fade-in">
            <div className="space-y-1.5 text-center">
              <div className="text-xs font-bold text-slate-300">
                Enter 4-Digit OTP sent to <span className="text-[#ffc000]">+91 {mobileNumber}</span>
              </div>

              <input
                type="text"
                required
                maxLength={4}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                placeholder="4 3 2 1"
                className="w-36 mx-auto bg-[#0d1322] border-2 border-[#ffc000] rounded-xl py-2.5 text-center text-lg font-black tracking-widest text-white focus:outline-none shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={otpCode.length < 4 || isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#2ed573] text-[#0d1322] font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-40 cursor-pointer shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Verifying OTP...' : 'Verify OTP & Log In'}</span>
            </button>

            <button
              type="button"
              onClick={() => setOtpStep(false)}
              className="w-full text-center text-slate-400 hover:text-white font-bold text-[11px] block cursor-pointer"
            >
              Change Mobile Number
            </button>
          </form>
        )}

        <div className="pt-3 border-t border-slate-800/80 text-center flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Google OAuth & Phone OTP Authentication Guard</span>
        </div>

      </div>

    </div>
  );
};
