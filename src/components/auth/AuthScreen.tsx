import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, ArrowLeft, AlertCircle } from 'lucide-react';
import { AuthService, type AuthUserSession } from '../../services/authService';

interface AuthScreenProps {
  onLoginSuccess: (session: AuthUserSession) => void;
}

// ─── Inline validation helpers ───────────────────────────────────────────────
function validateEmail(email: string): string {
  if (!email.trim()) return 'Email address is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
  return '';
}

function validatePhone(phone: string): string {
  if (!phone) return 'Mobile number is required.';
  if (phone.length !== 10) return 'Enter a valid 10-digit mobile number.';
  if (!/^[6-9]\d{9}$/.test(phone)) return 'Number must start with 6, 7, 8, or 9.';
  return '';
}

function validateOtp(otp: string): string {
  if (!otp) return 'OTP is required.';
  if (otp.length < 4) return 'Enter at least 4 digits.';
  return '';
}

// ─── Small inline error component ─────────────────────────────────────────────
function FieldError({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-400 mt-1.5">
      <AlertCircle className="w-3 h-3 shrink-0" />
      {msg}
    </div>
  );
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'google'>('mobile');

  // Mobile OTP state
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpHint, setOtpHint] = useState('');          // shows dev OTP code from backend

  // Google state
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleError, setGoogleError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // ── Helpers ────────────────────────────────────────────────────────────────
  const clearErrors = () => {
    setMobileError('');
    setOtpError('');
    setGoogleError('');
    setServerError('');
    setOtpHint('');
  };

  const switchMethod = (m: 'mobile' | 'google') => {
    setLoginMethod(m);
    setOtpStep(false);
    clearErrors();
  };

  // ── Send OTP ───────────────────────────────────────────────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePhone(mobileNumber);
    if (err) { setMobileError(err); return; }
    clearErrors();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/send-otp`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone: mobileNumber }) }
      );
      const data = await res.json();
      if (data.success) {
        setOtpStep(true);
        // Show dev OTP hint if backend returns it
        if (data._devOtp) setOtpHint(`Dev OTP: ${data._devOtp}`);
      } else {
        setServerError(data.error || 'Failed to send OTP. Please try again.');
      }
    } catch {
      // Backend offline — allow offline flow
      setOtpStep(true);
      setOtpHint('Offline mode: enter any 4+ digit code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Verify OTP ─────────────────────────────────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateOtp(otpCode);
    if (err) { setOtpError(err); return; }
    clearErrors();
    setIsSubmitting(true);

    try {
      let verified = false;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/verify-otp`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone: mobileNumber, otp: otpCode }) }
        );
        const data = await res.json();
        verified = data.success === true;
        if (!verified) {
          setOtpError(data.error || 'Incorrect OTP. Please try again.');
        }
      } catch {
        // Backend offline — accept any 4+ digit code
        verified = otpCode.length >= 4;
      }

      if (verified) {
        const session = await AuthService.signInWithPhoneOtp(mobileNumber, otpCode);
        onLoginSuccess(session);
      }
    } catch {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Google Login ───────────────────────────────────────────────────────────
  const handleGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(googleEmail);
    if (err) { setGoogleError(err); return; }
    clearErrors();
    setIsSubmitting(true);

    try {
      const namePart = googleEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const session = await AuthService.signInWithGoogle(googleEmail.trim().toLowerCase(), namePart);
      onLoginSuccess(session);
    } catch {
      setServerError('Google sign-in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md space-y-6">

        {/* Back to Landing */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#ffc000] to-amber-500 flex items-center justify-center text-[#0d1322] font-black text-2xl mx-auto shadow-xl shadow-[#ffc000]/20">P</div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            PSC Master <span className="text-[#ffc000]">Portal</span>
          </h1>
          <p className="text-xs font-semibold text-slate-400 max-w-xs mx-auto">
            Kerala's #1 exam prep platform for LDC, VFA, SI &amp; KAS.
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-3xl bg-[#141c2e] border border-slate-800 p-6 space-y-5 shadow-2xl">

          {/* Method Toggle */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#0d1322] rounded-2xl border border-slate-800 text-xs font-extrabold">
            <button
              type="button"
              onClick={() => switchMethod('mobile')}
              className={`py-2.5 rounded-xl transition-all cursor-pointer ${loginMethod === 'mobile' ? 'bg-[#ffc000] text-[#0d1322] shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              📱 Mobile OTP
            </button>
            <button
              type="button"
              onClick={() => switchMethod('google')}
              className={`py-2.5 rounded-xl transition-all cursor-pointer ${loginMethod === 'google' ? 'bg-[#ffc000] text-[#0d1322] shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              🌐 Google Auth
            </button>
          </div>

          {/* Server-level error */}
          {serverError && (
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {serverError}
            </div>
          )}

          {/* ── GOOGLE LOGIN ── */}
          {loginMethod === 'google' && (
            <form onSubmit={handleGoogleLogin} className="space-y-4 pt-1 animate-fade-in" noValidate>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">
                  Google Account Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  value={googleEmail}
                  onChange={(e) => { setGoogleEmail(e.target.value); setGoogleError(''); }}
                  onBlur={() => setGoogleError(validateEmail(googleEmail))}
                  placeholder="you@gmail.com"
                  className={`w-full bg-[#0d1322] border rounded-xl px-4 py-3 text-sm font-medium text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    googleError ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-[#ffc000]'
                  }`}
                />
                <FieldError msg={googleError} />
              </div>

              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                Sign in with your Google account to sync your exam history and rank across all devices.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg disabled:opacity-50 active:scale-[0.98]"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{isSubmitting ? 'Signing in…' : 'Continue with Google'}</span>
              </button>
            </form>
          )}

          {/* ── MOBILE OTP — Step 1: Phone input ── */}
          {loginMethod === 'mobile' && !otpStep && (
            <form onSubmit={handleSendOtp} className="space-y-4 pt-1 animate-fade-in" noValidate>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">
                  Mobile Number <span className="text-rose-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-xs font-extrabold text-[#ffc000] flex items-center gap-1 border-r border-slate-700 pr-3 pointer-events-none">
                    🇮🇳 +91
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => { setMobileNumber(e.target.value.replace(/\D/g, '')); setMobileError(''); }}
                    onBlur={() => setMobileError(validatePhone(mobileNumber))}
                    placeholder="9876543210"
                    className={`w-full bg-[#0d1322] border rounded-xl pl-20 pr-4 py-3 text-sm font-bold text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      mobileError ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-[#ffc000]'
                    }`}
                  />
                </div>
                <FieldError msg={mobileError} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-sm flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 cursor-pointer shadow-lg shadow-[#ffc000]/15 active:scale-[0.98]"
              >
                <span>{isSubmitting ? 'Sending OTP…' : 'Get OTP Code'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* ── MOBILE OTP — Step 2: OTP input ── */}
          {loginMethod === 'mobile' && otpStep && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 pt-1 animate-fade-in" noValidate>
              <div className="space-y-3 text-center">
                <p className="text-xs font-bold text-slate-300">
                  Enter OTP sent to <span className="text-[#ffc000]">+91 {mobileNumber}</span>
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => { setOtpCode(e.target.value.replace(/\D/g, '')); setOtpError(''); }}
                  placeholder="• • • • • •"
                  autoFocus
                  className={`w-40 mx-auto block bg-[#0d1322] border-2 rounded-xl py-3 text-center text-xl font-black tracking-widest text-white focus:outline-none shadow-inner transition-colors ${
                    otpError ? 'border-rose-500' : 'border-[#ffc000]'
                  }`}
                />
                <FieldError msg={otpError} />
                {otpHint && (
                  <p className="text-[11px] text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5">
                    🛠 {otpHint}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#2ed573] text-[#0d1322] font-extrabold text-sm flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 cursor-pointer shadow-lg active:scale-[0.98]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSubmitting ? 'Verifying…' : 'Verify & Log In'}</span>
              </button>

              <button
                type="button"
                onClick={() => { setOtpStep(false); setOtpCode(''); clearErrors(); }}
                className="w-full text-center text-slate-400 hover:text-white font-bold text-xs block cursor-pointer transition-colors"
              >
                ← Change Mobile Number
              </button>
            </form>
          )}

          {/* Footer trust badge */}
          <div className="pt-3 border-t border-slate-800/80 text-center flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Secure Authentication — No Passwords Stored</span>
          </div>
        </div>
      </div>
    </div>
  );
};
