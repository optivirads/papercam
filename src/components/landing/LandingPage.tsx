import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Trophy, Users, Zap, CheckCircle2, ChevronRight, Star, Globe, Flame } from 'lucide-react';

const EXAM_CATEGORIES = [
  { tag: 'LDC', title: 'LDC 2024', sub: '10th Level Prelims & Mains', color: 'from-amber-500 to-yellow-400', desc: 'Lower Division Clerk — most popular PSC exam for SSLC holders.' },
  { tag: 'VFA', title: 'Village Field Assistant', sub: 'Revenue Department', color: 'from-emerald-500 to-teal-400', desc: 'Revenue dept field assistant with land records & survey syllabus.' },
  { tag: 'SI', title: 'Sub Inspector Police', sub: 'Degree Level', color: 'from-blue-500 to-indigo-400', desc: 'Kerala Police SI — law, reasoning & physical fitness.' },
  { tag: 'KAS', title: 'KAS Officer', sub: 'Gazetted Officer Cadre', color: 'from-purple-500 to-pink-400', desc: 'Kerala Administrative Service — state-level civil service exam.' },
];

const FEATURES = [
  { icon: BookOpen, title: 'Official PSC Syllabus', desc: 'Complete breakdown for all major Kerala PSC exams with unit-wise marks distribution.' },
  { icon: Zap, title: 'Timed Mock Exams', desc: 'Kerala PSC scoring formula: +1 correct, -0.33 wrong. Real CBT simulation.' },
  { icon: Globe, title: 'Bilingual EN & ML', desc: 'Instantly switch all questions and explanations between English and Malayalam.' },
  { icon: Trophy, title: 'Statewide Rank', desc: 'Submit a mock test and see your live rank among all PSC Master aspirants.' },
  { icon: Users, title: 'AI Question Generator', desc: 'Type any topic and AI generates verified dual-language PSC questions instantly.' },
  { icon: Flame, title: 'Offline Study Mode', desc: 'Download PDF notes and attempt tests without internet on mobile or desktop.' },
];

const TESTIMONIALS = [
  { name: 'Anjali Nair', exam: 'LDC 2024', stars: 5, text: 'PSC Master made my preparation so structured. The bilingual mock tests are exactly like the real exam!' },
  { name: 'Vishnu Raj', exam: 'KAS Prelims', stars: 5, text: 'Statewide rank feature helped me benchmark myself. Went from rank 3200 to rank 180 in 3 months!' },
  { name: 'Deepa Menon', exam: 'VFA Batch', stars: 5, text: 'The official syllabus breakdowns are incredibly detailed. I knew exactly what to focus on.' },
];

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1500;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(interval); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>;
}

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ffc000] to-amber-400 flex items-center justify-center font-black text-[#0d1322] text-sm shadow-lg">P</div>
            <span className="text-xl font-black tracking-tight text-white">PSC <span className="text-[#ffc000]">Master</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-400">
            <a href="#exams" className="hover:text-white transition-colors">Exams</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#syllabus" className="hover:text-white transition-colors">Syllabus</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/auth')}
              className="text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer px-3 py-2"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="px-4 py-2 rounded-xl bg-[#ffc000] text-[#0d1322] text-sm font-extrabold hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-[#ffc000]/20"
            >
              Start Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffc000]/10 border border-[#ffc000]/30 text-[#ffc000] text-xs font-bold tracking-wide">
              <Flame className="w-3.5 h-3.5" />
              Kerala's #1 PSC Exam Platform
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight tracking-tight">
              Crack Kerala PSC<br />
              <span className="bg-gradient-to-r from-[#ffc000] to-amber-300 bg-clip-text text-transparent">
                Smarter & Faster
              </span>
            </h1>
            <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-lg">
              Authentic mock tests, official syllabi, AI-generated questions, and statewide ranking — all in English and Malayalam. Free forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[#ffc000] text-[#0d1322] font-extrabold text-base hover:brightness-110 transition-all cursor-pointer shadow-xl shadow-[#ffc000]/25 active:scale-[0.98]"
              >
                Start Preparing Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border border-slate-700 text-white font-bold text-base hover:border-slate-500 hover:bg-slate-800/50 transition-all cursor-pointer"
              >
                Try Demo Exam
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-5 text-sm text-slate-400 font-medium pt-2">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Credit Card</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Works Offline</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> EN & Malayalam</div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative lg:block hidden">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#ffc000]/10 to-indigo-500/10 rounded-3xl blur-2xl" />
            <div className="relative bg-[#0d1322] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#ffc000] uppercase tracking-wider">Live Mock Test</span>
                <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">Q 12 / 50</span>
              </div>
              <div className="bg-[#141c2e] border border-slate-700 rounded-2xl p-4">
                <p className="text-sm font-bold text-white leading-relaxed">Which Constitutional Amendment Act added "Socialist", "Secular", and "Integrity" to the Preamble?</p>
                <p className="text-xs text-slate-400 mt-1.5">ഇന്ത്യൻ ഭരണഘടനയുടെ ആമുഖത്തിൽ "സോഷ്യലിസ്റ്റ്", "സെക്യുലർ" ചേർത്ത ഭേദഗതി?</p>
              </div>
              {['42nd Amendment Act 1976', '44th Amendment Act 1978', '86th Amendment Act 2002', '73rd Amendment Act 1992'].map((opt, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-bold cursor-default transition-all ${i === 0 ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-400' : 'border-slate-700 bg-[#141c2e] text-slate-300'}`}>
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0">{['A','B','C','D'][i]}</span>
                  {opt}
                  {i === 0 && <CheckCircle2 className="w-4 h-4 ml-auto" />}
                </div>
              ))}
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 pt-1">
                <span>Score: <span className="text-[#ffc000]">+11.67</span></span>
                <span className="text-emerald-400">Rank #142 / 4,891</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-5 sm:px-8 border-y border-slate-800/60 bg-[#0d1322]/60">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 42000, suffix: '+', label: 'Active Aspirants' },
            { value: 12000, suffix: '+', label: 'Verified Questions' },
            { value: 98, suffix: '%', label: 'Exam Accuracy' },
            { value: 4, suffix: ' Exams', label: 'PSC Categories' },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#ffc000]">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Exam Categories */}
      <section id="exams" className="py-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Kerala PSC Exam Categories</h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto">Comprehensive preparation modules for all major Kerala PSC examinations.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXAM_CATEGORIES.map((exam) => (
            <div
              key={exam.tag}
              onClick={() => navigate('/auth')}
              className="group relative bg-[#0d1322] border border-slate-800 rounded-2xl p-5 cursor-pointer hover:border-slate-600 transition-all hover:-translate-y-1 shadow-lg"
            >
              <div className={`inline-flex px-2.5 py-1 rounded-lg bg-gradient-to-r ${exam.color} text-[#0d1322] text-xs font-black mb-3`}>{exam.tag}</div>
              <h3 className="font-extrabold text-white text-sm leading-tight">{exam.title}</h3>
              <p className="text-[11px] text-[#ffc000] font-semibold mt-0.5">{exam.sub}</p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{exam.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-slate-500 group-hover:text-slate-300 transition-colors">
                Start Preparing <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-5 sm:px-8 bg-[#0d1322]/60 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">Everything You Need to Succeed</h2>
            <p className="text-slate-400 font-medium max-w-xl mx-auto">Built specifically for Kerala PSC aspirants — not a generic quiz app.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#ffc000]/10 border border-[#ffc000]/20 flex items-center justify-center text-[#ffc000]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-white text-sm">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white">What Aspirants Say</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-[#0d1322] border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#ffc000] fill-[#ffc000]" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed italic">"{t.text}"</p>
              <div>
                <div className="font-extrabold text-white text-xs">{t.name}</div>
                <div className="text-[11px] text-[#ffc000] font-semibold">{t.exam}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-7 bg-gradient-to-br from-[#141c2e] to-[#0d1322] border border-[#ffc000]/20 rounded-3xl p-12 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#ffc000] to-amber-400 flex items-center justify-center font-black text-[#0d1322] text-2xl mx-auto shadow-xl shadow-[#ffc000]/30">P</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Ready to Start Your PSC Journey?</h2>
          <p className="text-slate-400 font-medium">Join 42,000+ Kerala aspirants already preparing on PSC Master. Free forever.</p>
          <button
            onClick={() => navigate('/auth')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#ffc000] text-[#0d1322] font-extrabold text-base hover:brightness-110 transition-all cursor-pointer shadow-xl shadow-[#ffc000]/25 active:scale-[0.98]"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-5 sm:px-8 text-center text-xs text-slate-500 font-medium">
        <p>© 2024 PSC Master — Kerala PSC Exam Preparation Platform. All rights reserved.</p>
        <p className="mt-1">LDC • VFA • Sub Inspector of Police • KAS • LP/UP Assistant • University Assistant</p>
      </footer>
    </div>
  );
};
