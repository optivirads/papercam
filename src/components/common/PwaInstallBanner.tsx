import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, CheckCircle2 } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PwaInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Check if app is already running in standalone mode (installed as PWA)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('To install PSC Master on Android:\n1. Tap your browser menu (⋮)\n2. Select "Add to Home screen" or "Install app".');
      return;
    }

    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled || dismissed) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-50 animate-fade-in select-none">
      <div className="bg-gradient-to-r from-[#141c2e] to-[#1a253e] border border-[#ffc000]/40 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3 text-slate-100 relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          aria-label="Dismiss Install Banner"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#ffc000] text-[#0d1322] flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-[#ffc000]/20">
            <Smartphone className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#ffc000]">
              <span>Android App Ready</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2ed573]" />
            </div>
            <h4 className="text-xs font-bold text-white leading-tight">
              Install PSC Master on Home Screen
            </h4>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Instant offline access to tests & notes
            </p>
          </div>
        </div>

        <button
          onClick={handleInstallClick}
          className="px-3.5 py-2 rounded-xl bg-[#ffc000] text-[#0d1322] font-black text-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md shrink-0 flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install</span>
        </button>
      </div>
    </div>
  );
};
