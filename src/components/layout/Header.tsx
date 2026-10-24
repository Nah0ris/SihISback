import { useState } from 'react';
import { Menu, Search, Bell, Sparkles, ExternalLink, HelpCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
  const [showImportantNote, setShowImportantNote] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex flex-col w-full border-b border-slate-200 bg-white/95 backdrop-blur shadow-xs">
      {/* 1. Official Government of India Top Strip (Matching National Portal screenshot) */}
      <div className="bg-slate-50 border-b border-slate-200/80 px-4 sm:px-6 py-1 flex items-center justify-between text-[11px] text-slate-600 font-medium">
        <div className="flex items-center gap-2">
          {/* India Tricolor Flag Bar */}
          <div className="flex items-center h-2.5 w-4 rounded-xs overflow-hidden shadow-2xs border border-slate-300 shrink-0">
            <div className="h-full w-1/3 bg-[#FF9933]" />
            <div className="h-full w-1/3 bg-white" />
            <div className="h-full w-1/3 bg-[#138808]" />
          </div>
          <span className="font-semibold text-slate-800">भारत सरकार</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-700">Government of India</span>
          <span className="text-slate-300">·</span>
          <span className="hidden md:inline text-slate-600">Ministry of Education</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowImportantNote(!showImportantNote)}
            className="hidden sm:flex items-center gap-1 text-[10px] text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 px-2 py-0.5 rounded transition-colors"
          >
            <AlertCircle className="w-3 h-3 text-rose-600" />
            <span>Important Note</span>
          </button>

          <a
            href="https://www.aicte-india.org"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1 text-[10px] text-slate-600 hover:text-slate-900 transition-colors"
          >
            <HelpCircle className="w-3 h-3 text-slate-400" />
            <span>AICTE Helpdesk</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
          </a>

          <div className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-semibold text-slate-700 border border-slate-200">
            <span>EN</span>
            <span className="text-slate-400">▼</span>
          </div>
        </div>
      </div>

      {/* Important Note Dropdown Banner */}
      {showImportantNote && (
        <div className="bg-amber-50/90 border-b border-amber-200 px-4 sm:px-6 py-2 text-xs text-amber-900 flex items-center justify-between animate-in fade-in slide-in-from-top-1 duration-150">
          <p className="flex items-center gap-1.5 font-medium">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              All applications for Approval Process AY 2026–27 must conform to AICTE Approval Process Handbook (APH) norms. AI evaluation is automated with deterministic oversight.
            </span>
          </p>
          <button
            onClick={() => setShowImportantNote(false)}
            className="text-amber-800 hover:text-amber-950 font-bold ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. Main Navigation Bar with Official Logos Lockup */}
      <div className="flex h-14 sm:h-16 w-full items-center justify-between px-4 sm:px-6 gap-3">
        {/* Left: Sidebar Toggle + Government Logos Lockup */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenSidebar}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs shrink-0"
            title="Open Navigation Menu (or hover cursor at left screen edge)"
          >
            <Menu className="h-4 w-4 text-slate-600" />
            <span className="hidden sm:inline text-[11px] font-semibold">Menu</span>
          </button>

          {/* Logos Lockup */}
          <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2 border-l border-slate-200 shrink-0">
            {/* Ministry Emblem */}
            <img
              src="/assets/emblem-logo.webp"
              alt="Government of India Ministry of Education"
              className="h-8 sm:h-9 w-auto object-contain drop-shadow-2xs"
            />

            {/* Separator */}
            <div className="h-6 w-px bg-slate-200" />

            {/* AICTE Logo */}
            <img
              src="/assets/aicte-logo.webp"
              alt="AICTE Logo"
              className="h-8 sm:h-9 w-auto object-contain drop-shadow-2xs"
            />

            {/* Title Lockup */}
            <div className="hidden lg:block min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight">
                  अखिल भारतीय तकनीकी शिक्षा परिषद
                </span>
                <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-1 rounded border border-orange-200/60">
                  AICTE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                Regulatory Compliance & Automated Document Verification System
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="relative hidden xl:block w-72 2xl:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search institution, PID, clause..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
          />
        </div>

        {/* Right: Live Pill + Synthetic Badge + Notifications */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Official Orange LIVE Pill (Matching Screenshot 1) */}
          <div className="flex items-center gap-1.5 rounded-full border border-orange-300 bg-orange-50/90 px-2.5 py-1 text-[11px] font-semibold text-orange-900 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600" />
            </span>
            <span className="font-bold tracking-wider uppercase text-[10px] text-orange-800">
              LIVE
            </span>
            <span className="hidden sm:inline text-orange-700/80 font-normal text-[10px]">
              · AY 2026–27
            </span>
          </div>

          {/* Synthetic Data Banner */}
          <div className="hidden md:flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">
            <span>SYNTHETIC DEMO</span>
          </div>

          {/* SIH Tag */}
          <div className="hidden sm:flex items-center gap-1">
            <Badge variant="navy" size="sm" className="font-mono text-[10px] bg-navy-900 text-white">
              <Sparkles className="h-3 w-3 mr-1 text-orange-400 inline" />
              SIH26261
            </Badge>
          </div>

          {/* Notification Bell */}
          <button
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
