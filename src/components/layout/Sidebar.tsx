import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Building2,
  X,
  Pin,
  PinOff,
  ChevronRight,
} from 'lucide-react';
import {
  Rocket01Icon,
  Layers01Icon,
  Settings02Icon,
  Download04Icon,
  Notification03Icon,
  CursorPointer01Icon,
  TextFontIcon,
  PaintBoardIcon,
} from '@hugeicons/core-free-icons';
import BranchedMenu, { BranchedMenuItem } from '@/components/ui/BranchedMenu';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const branchedNavItems: BranchedMenuItem[] = [
  {
    label: 'Scrutiny Workflow',
    children: [
      { value: '/', label: 'Landing Portal', icon: Rocket01Icon },
      { value: '/dashboard', label: 'Command Centre', icon: Layers01Icon },
      { value: '/applications', label: 'Applications Register', icon: Layers01Icon },
      { value: '/verification', label: 'Verification Centre', icon: CursorPointer01Icon },
    ],
  },
  {
    label: 'Forensics & Intel',
    children: [
      { value: '/risk-insights', label: 'Risk Intelligence', icon: Notification03Icon },
      { value: '/deficiencies', label: 'Deficiencies', icon: PaintBoardIcon },
      { value: '/document-forensics', label: 'Document Forensics', icon: Download04Icon },
      { value: '/audit-logs', label: 'Audit Trail', icon: TextFontIcon },
    ],
  },
  {
    label: 'Regulatory Engine',
    children: [
      { value: '/settings', label: 'APH 2024–27 Rules', icon: Settings02Icon },
    ],
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-hide when cursor is not hovering
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isVisible = isOpen || isPinned || isHovered;

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Left Edge Hover Trigger Zone (Active when sidebar is hidden) */}
      {!isVisible && (
        <div
          onMouseEnter={handleMouseEnter}
          className="fixed inset-y-0 left-0 z-40 w-4 group cursor-pointer flex items-center justify-start"
          title="Hover to reveal sidebar navigation"
        >
          <div className="h-28 w-1.5 rounded-r bg-blue-500/30 group-hover:bg-blue-500 group-hover:w-2.5 transition-all duration-200 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ChevronRight className="w-3 h-3 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      )}

      {/* Sidebar Container */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-navy-950 border-r border-navy-800/80 text-slate-300 shadow-2xl transition-all duration-300 ease-in-out',
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-navy-800/80 bg-navy-900/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800 border border-navy-700 shadow-md text-white font-bold shrink-0 p-1">
              <img
                src="/assets/aicte-logo.webp"
                alt="AICTE Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-wide text-sm truncate">
                  AICTE Intelligence
                </span>
                <span className="rounded bg-orange-500/20 px-1 py-0.2 text-[9px] font-semibold text-orange-300 shrink-0 border border-orange-500/30">
                  APH 2026
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 truncate">
                Regulatory Scrutiny Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Pin / Unpin button */}
            <button
              onClick={() => setIsPinned(!isPinned)}
              className={cn(
                'hidden lg:flex p-1.5 rounded-md transition-colors',
                isPinned
                  ? 'bg-blue-600/30 text-blue-400 hover:bg-blue-600/50'
                  : 'text-slate-400 hover:bg-navy-800 hover:text-white'
              )}
              title={isPinned ? 'Unpin sidebar (auto-hide on cursor leave)' : 'Pin sidebar open'}
            >
              {isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
            </button>

            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-slate-400 hover:bg-navy-800 hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Institution Scope Pill & Auto-hide Indicator */}
        <div className="px-4 py-2.5 border-b border-navy-800/40 space-y-2">
          <div className="flex items-center gap-2 rounded-lg bg-navy-900/80 p-2 border border-navy-800">
            <Building2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Approval Handbook
              </div>
              <div className="truncate text-[11px] font-medium text-slate-200">
                AICTE APH 2024–2027
              </div>
            </div>
          </div>

          {/* Status pill showing auto-hide behavior */}
          <div className="flex items-center justify-between px-1 text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className={cn('w-1.5 h-1.5 rounded-full', isPinned ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse')} />
              <span>{isPinned ? 'Sidebar Pinned' : 'Auto-Hide (Hover Active)'}</span>
            </span>
            <span className="text-slate-500">React Bits</span>
          </div>
        </div>

        {/* BranchedMenu Navigation (React Bits) */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          <div className="px-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Interactive Branched Navigation
          </div>

          <div className="pl-1">
            <BranchedMenu
              items={branchedNavItems}
              defaultOpen={[0, 1]}
              defaultActive={location.pathname}
              onSelect={(value) => {
                navigate(value);
                if (window.innerWidth < 1024) onClose();
              }}
              color="#cbd5e1"
              accentColor="#60a5fa"
              lineColor="#334155"
              width={248}
              rowHeight={34}
              indent={36}
              trunk={14}
              radius={10}
              lineWidth={1.5}
              fontSize={13}
              drawDuration={350}
              foldDuration={280}
            />
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-navy-800/80 bg-navy-900/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-200 ring-2 ring-blue-500/30">
                SO
              </div>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-navy-900" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white">
                Scrutiny Officer #42
              </p>
              <p className="truncate text-[10px] text-slate-400">
                AICTE Scrutiny Bureau
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
