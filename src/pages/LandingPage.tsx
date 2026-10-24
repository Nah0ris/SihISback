import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  FileCheck2,
  ArrowRight,
  Eye,
  FileText,
  Sparkles,
  Search,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import Dither from '@/components/ui/Dither';

export function LandingPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [showImportantNote, setShowImportantNote] = useState(false);

  const handleExplore = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Official Government of India Top Strip */}
      <div className="bg-slate-100/90 border-b border-slate-200 px-4 sm:px-8 py-1.5 flex items-center justify-between text-[11px] text-slate-600 font-medium">
        <div className="flex items-center gap-2.5">
          {/* India Tricolor Flag Bar */}
          <div className="flex items-center h-2.5 w-4 rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0">
            <div className="h-full w-1/3 bg-[#FF9933]" />
            <div className="h-full w-1/3 bg-white" />
            <div className="h-full w-1/3 bg-[#138808]" />
          </div>
          <span className="font-semibold text-slate-900">भारत सरकार</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-700">Government of India</span>
          <span className="text-slate-300">·</span>
          <span className="hidden sm:inline text-slate-600">Ministry of Education</span>
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <button
            onClick={() => setShowImportantNote(!showImportantNote)}
            className="hidden sm:flex items-center gap-1 text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2 py-0.5 rounded transition-colors"
          >
            <AlertCircle className="w-3 h-3 text-rose-600" />
            <span>Important Note</span>
          </button>

          <a
            href="https://www.aicte-india.org"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <HelpCircle className="w-3 h-3 text-slate-400" />
            <span>AICTE Helpdesk</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
          </a>

          <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded text-[10px] font-semibold text-slate-700 border border-slate-200 shadow-2xs">
            <span>EN</span>
            <span className="text-slate-400">▼</span>
          </div>
        </div>
      </div>

      {/* Important Note Dropdown */}
      {showImportantNote && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-8 py-2 text-xs text-amber-900 flex items-center justify-between">
          <p className="flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              All applications for Technical Education Scrutiny AY 2026–27 are evaluated according to the Approval Process Handbook (APH 2024–27). AI validation is backed by deterministic committee workflows.
            </span>
          </p>
          <button
            onClick={() => setShowImportantNote(false)}
            className="text-amber-800 hover:text-amber-950 font-bold ml-3 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. Official Portal Header Bar with Both Logos */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Official Emblem & AICTE Logo Lockup */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Ministry Lion Capital */}
            <img
              src="/assets/emblem-logo.webp"
              alt="Ministry of Education Emblem"
              className="h-11 sm:h-12 w-auto object-contain"
            />
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />

            {/* AICTE Logo */}
            <img
              src="/assets/aicte-logo.webp"
              alt="AICTE Official Logo"
              className="h-11 sm:h-12 w-auto object-contain drop-shadow-2xs"
            />

            {/* Bilingual Titles */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-xs sm:text-base tracking-tight leading-tight">
                  अखिल भारतीय तकनीकी शिक्षा परिषद
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  AICTE
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-semibold tracking-wide">
                ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
              </p>
              <p className="text-[9px] text-slate-400 hidden md:block">
                Autonomous Regulatory Approval & Scrutiny Portal (Ministry of Education, Govt. of India)
              </p>
            </div>
          </div>

          {/* Header Action: Signature AICTE Yellow Explore Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExplore}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 text-xs sm:text-sm font-extrabold shadow-md shadow-amber-400/25 border border-amber-500/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Portal</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

        {/* Live News Bulletin Ticker (Amber Bar from Government Portals) */}
        <div className="bg-amber-50/80 border-t border-b border-amber-200/80 px-4 sm:px-8 py-1.5 flex items-center justify-between text-xs text-amber-950">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex items-center gap-1 font-bold text-[10px] uppercase bg-amber-500 text-slate-950 px-2 py-0.5 rounded shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
              LIVE
            </span>
            <span className="text-[11px] truncate font-medium">
              Approval Process AY 2026–27 Scrutiny Cycle Operational · Automated Digital Stream Extraction & Forensic Anomaly Detection Active
            </span>
          </div>
          <span className="text-[10px] text-amber-800 font-mono shrink-0 hidden sm:inline">
            APH § 2.4.1 COMPLIANT
          </span>
        </div>
      </header>

      {/* 3. Hero Section (Echoing National Government Portal Design) */}
      <section className="relative bg-gradient-to-b from-white via-amber-50/20 to-slate-50 border-b border-slate-200 py-12 sm:py-20 overflow-hidden">
        {/* Subtle Decorative Tricolor Gradient Aura */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6 relative z-10">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-900">National Regulatory Intelligence Portal</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-800 font-semibold font-mono">AY 2026–27</span>
          </div>

          {/* Main Headline Matching Government Portal Aesthetic */}
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight">
            Institutional Approval & Regulatory Scrutiny{' '}
            <span className="text-orange-600 block sm:inline">
              Is Verified In Real-Time
            </span>
          </h1>

          {/* Clear, Uncluttered Subheading */}
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Autonomous scrutiny of technical institutions across Engineering, Management, Pharmacy & MCA. Evaluates statutory land norms, faculty cadre ratios, fire clearances, and seat intake parity.
          </p>

          {/* 4. Signature Government Search & Explore Card (Just like National Internship Portal) */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xl shadow-slate-200/50 space-y-3 text-left">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
              {/* Institution / PID Search */}
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Institution name or PID (e.g. Meridian)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white"
                />
              </div>

              {/* State Filter */}
              <div className="md:col-span-4">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 py-3 px-3 text-slate-800 focus:outline-none focus:border-amber-400 focus:bg-white"
                >
                  <option value="ALL">All States & Regions</option>
                  <option value="Maharashtra">Maharashtra (WRO)</option>
                  <option value="Uttar Pradesh">Uttar Pradesh (NRO)</option>
                  <option value="Tamil Nadu">Tamil Nadu (SRO)</option>
                  <option value="Madhya Pradesh">Madhya Pradesh (CRO)</option>
                  <option value="Karnataka">Karnataka (SWRO)</option>
                </select>
              </div>

              {/* Big AICTE Golden Yellow Explore Button */}
              <div className="md:col-span-3">
                <button
                  onClick={handleExplore}
                  className="w-full h-full min-h-[42px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-400/30 border border-amber-500/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>

            {/* Quick Access Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-600">Quick Access:</span>
              <button
                onClick={() => navigate('/applications/demo-eoa-0142/review')}
                className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100 font-semibold transition-colors"
              >
                ★ Primary Demo Case (Meridian)
              </button>
              <button
                onClick={() => navigate('/verification')}
                className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium"
              >
                Verification Ledger Queue
              </button>
              <button
                onClick={() => navigate('/document-forensics')}
                className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium"
              >
                Forensic ELA Analysis
              </button>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-xl font-black text-slate-900 font-mono">11</div>
              <div className="text-[11px] text-slate-500 font-medium">Registered Applications</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-xl font-black text-emerald-600 font-mono">100%</div>
              <div className="text-[11px] text-slate-500 font-medium">Deterministic Rules</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-xl font-black text-amber-600 font-mono">36 Clauses</div>
              <div className="text-[11px] text-slate-500 font-medium">APH 2024–27 Mapped</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-xl font-black text-blue-600 font-mono">OCR + ELA</div>
              <div className="text-[11px] text-slate-500 font-medium">Dual Forensic Pipeline</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Operational Scrutiny Modules (Clean, Government Architecture) */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
            Automated Scrutiny Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Four Pillars of Government Scrutiny
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Delivering unbiased statutory compliance for technical education regulatory approval.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Document Parsing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Decodes native digital streams and runs genuine Tesseract OCR on scanned municipal certificates and land deeds.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center text-[11px] font-bold text-amber-700">
              <span>PDF & Image OCR</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Regulatory Engine</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Evaluates mandatory land area (7.82+ acres), intake parity (420 seats), and faculty cadre ratios against APH 2024–27 norms.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center text-[11px] font-bold text-blue-700">
              <span>APH Clause Rules</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Forensic Heatmaps</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Error Level Analysis (ELA) isolates altered stamps, spliced signatures, and pixel compression variance.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center text-[11px] font-bold text-purple-700">
              <span>ELA Tamper Detection</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Audit & Deficiencies</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Generates formal AICTE Regulatory Deficiency Notices with QR-verification codes and print export capabilities.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center text-[11px] font-bold text-emerald-700">
              <span>Notice Generator</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive React Bits Dither Showcase Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-16 w-full">
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 text-white p-6 sm:p-10 shadow-xl border border-slate-800">
          {/* Dither WebGL Canvas with Interactive Cursor Wave & Ripple */}
          <div className="absolute inset-0 z-0">
            <Dither
              waveColor="#f59e0b"
              backgroundColor="#081225"
              ditherMode="bayer"
              palette={['#081225', '#1e3a8a', '#ea580c', '#f59e0b', '#16a34a', '#ffffff']}
              colorNum={5}
              pixelSize={2}
              waveSpeed={0.04}
              waveFrequency={2.8}
              waveAmplitude={0.32}
              mouseEffect="ripple"
              mouseRadius={0.4}
              mouseStrength={1.2}
              clickRipple={true}
              className="opacity-75"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent pointer-events-none z-10" />

          <div className="relative z-20 max-w-xl space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded border border-amber-400/30">
              Real-Time Verification Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Launch Regulatory Scrutiny Operations
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Step into the Scrutiny Officer workspace to inspect dossiers, upload evidence documents, and simulate regulatory findings.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleExplore}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 text-xs sm:text-sm font-extrabold shadow-lg shadow-amber-400/30 border border-amber-500/50 transition-all hover:scale-[1.02]"
              >
                <span>Enter Scrutiny Portal</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
              <button
                onClick={() => navigate('/applications/demo-eoa-0142/review')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold backdrop-blur transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Primary Demo Case</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Official Government Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/assets/emblem-logo.webp" alt="Gov of India" className="h-10 w-auto object-contain" />
            <div className="h-7 w-px bg-slate-200" />
            <img src="/assets/aicte-logo.webp" alt="AICTE" className="h-10 w-auto object-contain" />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">All India Council for Technical Education</p>
              <p className="text-[10px] text-slate-500">Ministry of Education, Government of India · Nelson Mandela Marg, New Delhi 110070</p>
              <p className="text-[10px] text-slate-400 mt-0.5">SIH26261 Autonomous Scrutiny Platform Prototype</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExplore}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 text-xs font-extrabold shadow-sm transition-all"
            >
              <span>Explore Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
