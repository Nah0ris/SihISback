import { useState } from 'react';
import { getIssueCategorySummary } from '@/data/mockData';
import { ApplicationRecord } from '@/types';
import { useApplicationContext } from '@/context/ApplicationContext';
import {
  FileText,
  ShieldCheck,
  Building2,
  Users,
  ScanEye,
  GraduationCap,
  Database,
  Globe,
  AlertTriangle,
  LayoutGrid,
  BarChart2,
} from 'lucide-react';

const CATEGORY_META: Record<
  string,
  { icon: typeof FileText; color: string; bg: string; barColor: string }
> = {
  'Mandatory Documentation': {
    icon: FileText,
    color: 'text-amber-700',
    bg: 'bg-amber-50 border-amber-200',
    barColor: 'bg-amber-500',
  },
  'Affiliation & Approvals': {
    icon: ShieldCheck,
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200',
    barColor: 'bg-blue-600',
  },
  'Land & Infrastructure': {
    icon: Building2,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200',
    barColor: 'bg-emerald-600',
  },
  'Faculty & Cadre': {
    icon: Users,
    color: 'text-indigo-700',
    bg: 'bg-indigo-50 border-indigo-200',
    barColor: 'bg-indigo-600',
  },
  'Visual & Forensic Analysis': {
    icon: ScanEye,
    color: 'text-purple-700',
    bg: 'bg-purple-50 border-purple-200',
    barColor: 'bg-purple-600',
  },
  'Academic & Seat Intake': {
    icon: GraduationCap,
    color: 'text-orange-700',
    bg: 'bg-orange-50 border-orange-200',
    barColor: 'bg-orange-500',
  },
  'State Registry Cross-Check': {
    icon: Database,
    color: 'text-cyan-700',
    bg: 'bg-cyan-50 border-cyan-200',
    barColor: 'bg-cyan-600',
  },
  'External Source Integration': {
    icon: Globe,
    color: 'text-slate-700',
    bg: 'bg-slate-50 border-slate-200',
    barColor: 'bg-slate-500',
  },
};

export function IssueCategoryList({ applications: propApps }: { applications?: ApplicationRecord[] }) {
  const { applications: contextApps } = useApplicationContext();
  const apps = propApps || contextApps;
  const summaries = getIssueCategorySummary(apps);

  const [viewMode, setViewMode] = useState<'grid' | 'bars'>('grid');

  const totalFlags = summaries.reduce((acc, s) => acc + s.count, 0);
  const totalHigh = summaries.reduce((acc, s) => acc + s.highSeverityCount, 0);

  return (
    <div className="space-y-4">
      {/* Top Controls & Summary Pills */}
      <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
            {totalFlags} Total Flags
          </span>
          {totalHigh > 0 && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
              <AlertTriangle className="h-3 w-3" />
              {totalHigh} Critical / High
            </span>
          )}
        </div>

        {/* View Switcher: Grid vs Bars */}
        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1 rounded-md px-2 py-1 font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Card Grid View"
          >
            <LayoutGrid className="h-3 w-3" />
            <span className="hidden sm:inline">Cards</span>
          </button>
          <button
            onClick={() => setViewMode('bars')}
            className={`flex items-center gap-1 rounded-md px-2 py-1 font-medium transition-colors ${
              viewMode === 'bars'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Bar List View"
          >
            <BarChart2 className="h-3 w-3" />
            <span className="hidden sm:inline">Bars</span>
          </button>
        </div>
      </div>

      {/* Segmented Distribution Strip */}
      <div className="space-y-1">
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-100 gap-0.5">
          {summaries.map((item) => {
            const meta = CATEGORY_META[item.category] || { barColor: 'bg-slate-400' };
            return (
              <div
                key={item.category}
                className={`${meta.barColor} transition-all duration-300 hover:opacity-85`}
                style={{ width: `${(item.count / totalFlags) * 100}%` }}
                title={`${item.category}: ${item.count} issues (${item.percentage}%)`}
              />
            );
          })}
        </div>
      </div>

      {/* View Mode 1: Interactive Cards Grid (Easier to scan and view!) */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {summaries.map((item) => {
            const meta = CATEGORY_META[item.category] || {
              icon: FileText,
              color: 'text-slate-700',
              bg: 'bg-slate-50 border-slate-200',
              barColor: 'bg-blue-600',
            };
            const Icon = meta.icon;

            return (
              <div
                key={item.category}
                className="group relative flex flex-col justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`h-7 w-7 rounded-lg flex items-center justify-center border ${meta.bg}`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${meta.color}`} />
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-900">
                      {item.count}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-blue-900">
                    {item.category}
                  </h4>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  {item.highSeverityCount > 0 ? (
                    <span className="font-bold text-rose-600 flex items-center gap-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                      {item.highSeverityCount} High
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium">Standard</span>
                  )}
                  <span className="text-slate-500 font-mono text-[10px] font-semibold">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* View Mode 2: Cleaned-up Ranked Bars View */
        <div className="space-y-3">
          {summaries.map((item) => {
            const meta = CATEGORY_META[item.category] || {
              icon: FileText,
              color: 'text-slate-700',
              barColor: 'bg-blue-600',
            };
            const Icon = meta.icon;

            return (
              <div key={item.category} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Icon className={`h-3.5 w-3.5 ${meta.color} shrink-0`} />
                    <span className="font-semibold text-slate-800 truncate">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {item.highSeverityCount > 0 && (
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                        {item.highSeverityCount} Critical
                      </span>
                    )}
                    <span className="font-mono text-xs font-semibold text-slate-700">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      item.highSeverityCount > 0 ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${Math.min(item.percentage * 2.5, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
