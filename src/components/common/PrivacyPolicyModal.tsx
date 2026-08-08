import React from 'react';
import { ShieldCheck, X, Lock, EyeOff } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#121829] border border-slate-800 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl relative text-slate-100 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-[#ffc000]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-sm font-extrabold text-white">Privacy Policy & Terms</h3>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 cursor-pointer rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto space-y-3.5 text-xs text-slate-300 pr-1 leading-relaxed">
          <div className="bg-[#0d1322] border border-slate-800 p-3 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2ed573]">
              <Lock className="w-3.5 h-3.5" />
              <span>Google Play Policy Compliant</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Effective Date: January 1, 2024 • App Version 1.0.0
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-xs mb-1">1. Information We Collect</h4>
            <p className="text-slate-400 text-[11px]">
              PSC Master stores student profile details (Name, Email, Qualification, Target Exams) and test scores locally in your device's secure IndexedDB database.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-xs mb-1">2. Offline Storage & Caching</h4>
            <p className="text-slate-400 text-[11px]">
              All question bank materials, PDF study notes, and mock test progress are cached locally on your device for fast offline access without requiring internet connectivity.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-xs mb-1">3. Third-Party Data Sharing</h4>
            <div className="flex items-center gap-1.5 text-rose-400 font-bold text-[11px] mb-1">
              <EyeOff className="w-3.5 h-3.5" />
              <span>We NEVER sell or share your personal data with third parties.</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Your study history, marks, and personal information remain 100% private to your device account.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-xs mb-1">4. Terms of Use</h4>
            <p className="text-slate-400 text-[11px]">
              PSC Master provides educational study materials for Kerala PSC (LDC, VFA, KAS, SI) preparation. All content is for educational practice purposes.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-xs mb-1">5. Contact Support</h4>
            <p className="text-slate-400 text-[11px]">
              For privacy requests or account data deletion, contact us at: <br />
              <strong className="text-[#ffc000]">support@pscmaster.app</strong>
            </p>
          </div>
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#ffc000] text-[#0d1322] font-black text-xs hover:brightness-110 cursor-pointer shadow-md mt-2"
        >
          Accept & Close
        </button>
      </div>
    </div>
  );
};
