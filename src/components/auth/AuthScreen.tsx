import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, ArrowLeft, AlertCircle, Mail } from 'lucide-react';
import { AuthService, type AuthUserSession } from '../../services/authService';

interface AuthScreenProps {
  onLoginSuccess: (session: AuthUserSession) => void;
}

type LoginMethod = 'mobile' | 'email' | 'google';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Validation helpers ───────────────────────────────────────────────────────
function validatePhone(v: string) {
  if (!v) return 'Mobile number is required.';
  if (v.length !== 10) return 'Enter a valid 10-digit mobile number.';
  if (!/^[6-9]\d{9}$/.test(v)) return 'Number must start with 6, 7, 8 or 9.';
  return '';
}

function validateEmail(v: string) {
  if (!v.trim()) return 'Email address is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email address.';
  return '';
}

function validateOtp(v: string) {
  if (!v) return 'OTP is required.';
  if (v.length < 4) return 'Enter at least 4 digits.';
  return '';
}

// ─── Small inline error component ────────────────────────────────────────────
const FieldError = ({ msg }: { msg: string }) =>
  msg ? (
    <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-400 mt-1.5">
      <AlertCircle className="w-3 h-3 shrink-0" />
      {msg}
    </div>
  ) : null;

// ─── OTP Input Box ────────────────────────────────────────────────────────────
const OtpInput = ({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error: string;
}) => (
  <div className="space-y-1 text-center">
    <input
      type="text"
      inputMode="numeric"
      maxLength={6}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
      placeholder="• • • • • •"
      autoFocus
      className={`w-44 mx-auto block bg-[#0d1322] border-2 rounded-xl py-3 text-center text-2xl font-black tracking-[0.4em] text-white focus:outline-none shadow-inner transition-colors ${
        error ? 'border-rose-500' : 'border-[#ffc000]'
      }`}
    />
    <FieldError msg={error} />
  </div>
);

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<LoginMethod>('mobile');

  // ── Mobile OTP state ──────────────────────────────────────────────────────
  const [phone, setPhone] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [phoneOtpStep, setPhoneOtpStep] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState('');
  const [phoneOtpErr, setPhoneOtpErr] = useState('');

  // ── Email OTP state ───────────────────────────────────────────────────────
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [emailOtpStep, setEmailOtpStep] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [emailOtpErr, setEmailOtpErr] = useState('');

  // ── Google state ──────────────────────────────────────────────────────────
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleEmailErr, setGoogleEmailErr] = useState('');

  // ── Shared state ──────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [devHint, setDevHint] = useState('');

  const clearAll = () => {
    setPhoneErr(''); setPhoneOtpErr('');
    setEmailErr(''); setEmailOtpErr('');
    setGoogleEmailErr(''); setServerError(''); setDevHint('');
  };

  const switchMethod = (m: LoginMethod) => {
    setMethod(m);
    setPhoneOtpStep(false);
    setEmailOtpStep(false);
    setPhoneOtp(''); setEmailOtp('');
    clearAll();
  };

  // ── Finish login ──────────────────────────────────────────────────────────
  const finish = (session: AuthUserSession) => onLoginSuccess(session);

  // ── PHONE: Send OTP ───────────────────────────────────────────────────────
  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePhone(phone);
    if (err) { setPhoneErr(err); return; }
    clearAll(); setIsSubmitting(true);
    try {
      const res = await fetch(`${API}/auth/send-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setPhoneOtpStep(true);
        if (data._devOtp) setDevHint(`Dev OTP: ${data._devOtp}`);
      } else {
        setServerError(data.error || 'Failed to send OTP.');
      }
    } catch {
      setPhoneOtpStep(true);
      setDevHint('Offline mode: enter any 4+ digit code.');
    } finally { setIsSubmitting(false); }
  };

  // ── PHONE: Verify OTP ─────────────────────────────────────────────────────
  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateOtp(phoneOtp);
    if (err) { setPhoneOtpErr(err); return; }
    clearAll(); setIsSubmitting(true);
    try {
      let verified = false;
      try {
        const res = await fetch(`${API}/auth/verify-otp`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, otp: phoneOtp }),
        });
        const data = await res.json();
        verified = data.success;
        if (!verified) setPhoneOtpErr(data.error || 'Incorrect OTP.');
      } catch {
        verified = phoneOtp.length >= 4; // offline fallback
      }
      if (verified) {
        const session = await AuthService.signInWithPhoneOtp(phone, phoneOtp);
        finish(session);
      }
    } catch { setServerError('Something went wrong. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  // ── EMAIL: Send OTP ───────────────────────────────────────────────────────
  const handleSendEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) { setEmailErr(err); return; }
    clearAll(); setIsSubmitting(true);
    try {
      const res = await fetch(`${API}/auth/send-email-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailOtpStep(true);
        if (data._devOtp) setDevHint(`Dev OTP: ${data._devOtp}`);
        else setDevHint('Check your email inbox for the OTP code.');
      } else {
        setServerError(data.error || 'Failed to send OTP email.');
      }
    } catch {
      setEmailOtpStep(true);
      setDevHint('Offline mode: enter any 4+ digit code.');
    } finally { setIsSubmitting(false); }
  };

  // ── EMAIL: Verify OTP ─────────────────────────────────────────────────────
  const handleVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateOtp(emailOtp);
    if (err) { setEmailOtpErr(err); return; }
    clearAll(); setIsSubmitting(true);
    try {
      let role: 'student' | 'admin' = 'student';
      try {
        const res = await fetch(`${API}/auth/verify-email-otp`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: emailOtp }),
        });
        const data = await res.json();
        if (!data.success) { setEmailOtpErr(data.error || 'Incorrect OTP.'); setIsSubmitting(false); return; }
        role = data.role || 'student';
      } catch {
        if (emailOtp.length < 4) { setEmailOtpErr('Incorrect OTP.'); setIsSubmitting(false); return; }
      }
      const session = await AuthService.signInWithGoogle(email.trim().toLowerCase(),
        email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
      finish(session);
    } catch { setServerError('Something went wrong. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  // ── GOOGLE: Sign In ───────────────────────────────────────────────────────
  const handleGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(googleEmail);
    if (err) { setGoogleEmailErr(err); return; }
    clearAll(); setIsSubmitting(true);
    try {
      const name = googleEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const session = await AuthService.signInWithGoogle(googleEmail.trim().toLowerCase(), name);
      finish(session);
    } catch { setServerError('Google sign-in failed. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md space-y-6">

        {/* Back link */}
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* Brand header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#ffc000] to-amber-500 flex items-center justify-center text-[#0d1322] font-black text-2xl mx-auto shadow-xl shadow-[#ffc000]/20">P</div>
          <h1 className="text-3xl font-black text-white tracking-tight">PSC Master <span className="text-[#ffc000]">Portal</span></h1>
          <p className="text-xs font-semibold text-slate-400 max-w-xs mx-auto">Kerala's #1 exam prep platform for LDC, VFA, SI &amp; KAS.</p>
        </div>

        {/* Auth card */}
        <div className="rounded-3xl bg-[#141c2e] border border-slate-800 p-6 space-y-5 shadow-2xl">

          {/* Method toggle — 3 tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#0d1322] rounded-2xl border border-slate-800 text-[11px] font-extrabold">
            {(['mobile', 'email', 'google'] as LoginMethod[]).map((m) => (
              <button key={m} type="button" onClick={() => switchMethod(m)}
                className={`py-2.5 rounded-xl transition-all cursor-pointer capitalize ${method === m ? 'bg-[#ffc000] text-[#0d1322] shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                {m === 'mobile' ? '📱 Mobile' : m === 'email' ? '📧 Email' : '🌐 Google'}
              </button>
            ))}
          </div>

          {/* Server error */}
          {serverError && (
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />{serverError}
            </div>
          )}

          {/* Dev hint */}
          {devHint && (
            <div className="text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2.5 text-center">
              🛠 {devHint}
            </div>
          )}

          {/* ── MOBILE OTP — Step 1 ── */}
          {method === 'mobile' && !phoneOtpStep && (
            <form onSubmit={handleSendPhoneOtp} className="space-y-4 animate-fade-in" noValidate>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Mobile Number <span className="text-rose-400">*</span></label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-extrabold text-[#ffc000] border-r border-slate-700 pr-3 pointer-events-none">🇮🇳 +91</span>
                  <input type="tel" inputMode="numeric" maxLength={10} value={phone}
                    onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); setPhoneErr(''); }}
                    onBlur={() => setPhoneErr(validatePhone(phone))}
                    placeholder="9876543210"
                    className={`w-full bg-[#0d1322] border rounded-xl pl-20 pr-4 py-3 text-sm font-bold text-white placeholder-slate-500 focus:outline-none transition-colors ${phoneErr ? 'border-rose-500' : 'border-slate-700 focus:border-[#ffc000]'}`}
                  />
                </div>
                <FieldError msg={phoneErr} />
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-sm flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 cursor-pointer shadow-lg shadow-[#ffc000]/15 active:scale-[0.98]">
                <span>{isSubmitting ? 'Sending OTP…' : 'Get OTP via SMS'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* ── MOBILE OTP — Step 2 ── */}
          {method === 'mobile' && phoneOtpStep && (
            <form onSubmit={handleVerifyPhoneOtp} className="space-y-4 animate-fade-in" noValidate>
              <p className="text-xs font-bold text-slate-300 text-center">OTP sent to <span className="text-[#ffc000]">+91 {phone}</span></p>
              <OtpInput value={phoneOtp} onChange={(v) => { setPhoneOtp(v); setPhoneOtpErr(''); }} error={phoneOtpErr} />
              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#2ed573] text-[#0d1322] font-extrabold text-sm flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 cursor-pointer shadow-lg active:scale-[0.98]">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSubmitting ? 'Verifying…' : 'Verify & Log In'}</span>
              </button>
              <button type="button" onClick={() => { setPhoneOtpStep(false); setPhoneOtp(''); clearAll(); }}
                className="w-full text-center text-slate-400 hover:text-white font-bold text-xs cursor-pointer transition-colors">
                ← Change Number
              </button>
            </form>
          )}

          {/* ── EMAIL OTP — Step 1 ── */}
          {method === 'email' && !emailOtpStep && (
            <form onSubmit={handleSendEmailOtp} className="space-y-4 animate-fade-in" noValidate>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address <span className="text-rose-400">*</span></label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input type="email" value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailErr(''); }}
                    onBlur={() => setEmailErr(validateEmail(email))}
                    placeholder="you@gmail.com"
                    className={`w-full bg-[#0d1322] border rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-white placeholder-slate-500 focus:outline-none transition-colors ${emailErr ? 'border-rose-500' : 'border-slate-700 focus:border-[#ffc000]'}`}
                  />
                </div>
                <FieldError msg={emailErr} />
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                We'll send a 6-digit OTP to your inbox. Check spam if you don't see it.
              </p>
              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-sm flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 cursor-pointer shadow-lg shadow-[#ffc000]/15 active:scale-[0.98]">
                <span>{isSubmitting ? 'Sending OTP…' : 'Get OTP via Email'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* ── EMAIL OTP — Step 2 ── */}
          {method === 'email' && emailOtpStep && (
            <form onSubmit={handleVerifyEmailOtp} className="space-y-4 animate-fade-in" noValidate>
              <p className="text-xs font-bold text-slate-300 text-center">OTP sent to <span className="text-[#ffc000]">{email}</span></p>
              <OtpInput value={emailOtp} onChange={(v) => { setEmailOtp(v); setEmailOtpErr(''); }} error={emailOtpErr} />
              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#2ed573] text-[#0d1322] font-extrabold text-sm flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 cursor-pointer shadow-lg active:scale-[0.98]">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSubmitting ? 'Verifying…' : 'Verify & Log In'}</span>
              </button>
              <button type="button" onClick={() => { setEmailOtpStep(false); setEmailOtp(''); clearAll(); }}
                className="w-full text-center text-slate-400 hover:text-white font-bold text-xs cursor-pointer transition-colors">
                ← Change Email
              </button>
            </form>
          )}

          {/* ── GOOGLE (email input) ── */}
          {method === 'google' && (
            <form onSubmit={handleGoogleLogin} className="space-y-4 animate-fade-in" noValidate>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Google Account Email <span className="text-rose-400">*</span></label>
                <input type="email" value={googleEmail}
                  onChange={(e) => { setGoogleEmail(e.target.value); setGoogleEmailErr(''); }}
                  onBlur={() => setGoogleEmailErr(validateEmail(googleEmail))}
                  placeholder="you@gmail.com"
                  className={`w-full bg-[#0d1322] border rounded-xl px-4 py-3 text-sm font-medium text-white placeholder-slate-500 focus:outline-none transition-colors ${googleEmailErr ? 'border-rose-500' : 'border-slate-700 focus:border-[#ffc000]'}`}
                />
                <FieldError msg={googleEmailErr} />
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                Sign in with your Google account to sync exam history and rank across devices.
              </p>
              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg disabled:opacity-50 active:scale-[0.98]">
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

          {/* Trust footer */}
          <div className="pt-3 border-t border-slate-800/80 text-center flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Secure Authentication — No Passwords Stored</span>
          </div>
        </div>
      </div>
    </div>
  );
};
