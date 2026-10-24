import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  AlertOctagon,
  Clock,
  Layers,
  Search,
  RotateCcw,
  FileSpreadsheet,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react';
import Dither from '@/components/ui/Dither';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { StatusDistributionChart } from '@/components/dashboard/StatusDistributionChart';
import { ActivityTimeline } from '@/components/dashboard/ActivityTimeline';
import { IssueCategoryList } from '@/components/dashboard/IssueCategoryList';
import { StatusBadge } from '@/components/applications/StatusBadge';
import { PriorityBadge } from '@/components/applications/PriorityBadge';
import { RiskScoreBadge } from '@/components/applications/RiskScoreBadge';
import { CaseReviewDrawer } from '@/components/applications/CaseReviewDrawer';
import { getSummaryMetrics } from '@/data/mockData';
import { ApplicationRecord } from '@/types';
import { useApplicationContext } from '@/context/ApplicationContext';

export function CommandCentre() {
  const navigate = useNavigate();
  const { applications } = useApplicationContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [selectedCase, setSelectedCase] = useState<ApplicationRecord | null>(null);

  // Derive summary metrics dynamically from shared context
  const metrics = useMemo(() => getSummaryMetrics(applications), [applications]);

  // Primary showcase demonstration case (Meridian Institute of Technology)
  const primaryCase = useMemo(() => {
    return (
      applications.find(
        (a) => a.id === 'demo-eoa-0142' || a.applicationId === 'DEMO-EoA-2026-0142'
      ) || applications[0]
    );
  }, [applications]);

  // Filtered priority queue records
  const filteredQueue = useMemo(() => {
    return applications.filter((app) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        app.applicationId.toLowerCase().includes(q) ||
        app.institutionName.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'ALL' || app.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'ALL' || app.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [applications, searchQuery, statusFilter, priorityFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setPriorityFilter('ALL');
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-8">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Regulatory Command Centre
            </h1>
            <Badge variant="navy" size="sm" className="font-mono text-[10px]">
              SIH26261 Prototype
            </Badge>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Institutional verification, statutory compliance & scrutiny operations
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs text-slate-700"
            onClick={() => {
              alert('Exported summary (CSV).');
            }}
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-slate-500" />
            Export CSV
          </Button>
          <Button
            variant="specular"
            size="sm"
            className="gap-1.5 text-xs shadow-xs"
            onClick={() => {
              navigate('/applications/demo-eoa-0142/review');
            }}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Primary Demo Case
          </Button>
        </div>
      </div>

      {/* National Portal Hero Banner with Interactive React Bits <Dither /> Canvas */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 text-white shadow-xl min-h-[200px] flex items-center">
        {/* Dither WebGL Shader Canvas (Color Palette matching Government of India / AICTE portal) */}
        <div className="absolute inset-0 z-0">
          <Dither
            waveColor="#ea580c"
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

        {/* Gradient vignette for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20 pointer-events-none z-10" />

        {/* Content */}
        <div className="relative z-20 p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 w-full">
          <div className="max-w-2xl space-y-2.5">
            {/* Tricolor Tag + Status */}
            <div className="flex items-center gap-2">
              <div className="flex items-center h-2.5 w-4 rounded-xs overflow-hidden border border-white/20 shrink-0">
                <div className="h-full w-1/3 bg-[#FF9933]" />
                <div className="h-full w-1/3 bg-white" />
                <div className="h-full w-1/3 bg-[#138808]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                AICTE Regulatory Scrutiny & Approval System · AY 2026–27
              </span>
            </div>

            {/* Logos & Headings */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20 shadow-md shrink-0">
                <img
                  src="/assets/emblem-logo.webp"
                  alt="Ministry of Education Emblem"
                  className="h-8 sm:h-9 w-auto object-contain brightness-110"
                />
                <div className="h-6 w-px bg-white/20" />
                <img
                  src="/assets/aicte-logo.webp"
                  alt="AICTE Logo"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>

              <div>
                <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
                  Institutional Compliance & Scrutiny Engine
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-1">
                  Deterministic rule engine, OCR evidence parsing, and document tamper forensics
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-xl">
              Interact with the live shader canvas by moving your cursor or clicking to generate ripples. Conforms to the Approval Process Handbook (APH 2024–27).
            </p>
          </div>

          {/* Action Buttons styled in AICTE Golden Yellow & Navy */}
          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <button
              onClick={() => navigate('/applications/demo-eoa-0142/review')}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 text-xs font-bold shadow-md shadow-amber-400/20 border border-amber-400/80 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Launch Review</span>
            </button>

            <button
              onClick={() => navigate('/verification')}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold backdrop-blur transition-all"
            >
              <Eye className="w-4 h-4 text-slate-400" />
              <span>Verification Ops</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Five Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <MetricCard
          title="Total Applications"
          value={metrics.totalApplications}
          category="primary"
          icon={<Layers className="h-4 w-4 text-blue-600" />}
        />
        <MetricCard
          title="Pending Review"
          value={metrics.pendingReview}
          change="Awaiting review"
          trend="neutral"
          category="warning"
          icon={<Clock className="h-4 w-4 text-amber-600" />}
        />
        <MetricCard
          title="Validation Exceptions"
          value={metrics.validationExceptions}
          change="Deficits flagged"
          trend="down"
          category="danger"
          icon={<AlertOctagon className="h-4 w-4 text-rose-600" />}
        />
        <MetricCard
          title="High-Priority Cases"
          value={metrics.highPriorityCases}
          change="Risk ≥ 70"
          trend="down"
          category="warning"
          icon={<AlertTriangle className="h-4 w-4 text-amber-600" />}
        />
        <MetricCard
          title="Documents Reviewed"
          value={`${metrics.documentsReviewed}`}
          change={`${metrics.reviewProgressRate}% progress`}
          trend="up"
          category="success"
          icon={<FileCheck2 className="h-4 w-4 text-emerald-600" />}
        />
      </div>

      {/* Featured Demonstration Spotlight: Meridian Institute of Technology */}
      {primaryCase && (
        <div className="relative overflow-hidden rounded-xl border border-amber-300/80 bg-gradient-to-r from-amber-50/70 via-white to-blue-50/40 p-4 sm:p-5 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 border border-amber-400/40 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                  <Sparkles className="h-3 w-3 text-amber-600" />
                  PRIMARY DEMO CASE
                </span>
                <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                  {primaryCase.applicationId}
                </span>
                <StatusBadge status={primaryCase.status} />
                <PriorityBadge priority={primaryCase.priority} />
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {primaryCase.institutionName}
                </h2>
                <p className="text-xs text-slate-500">
                  {primaryCase.programType} · {primaryCase.state} · {primaryCase.applicationCategory}
                </p>
              </div>

              {/* Key Active Findings Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                {primaryCase.findings
                  .filter((f) => f.reviewState !== 'RESOLVED')
                  .slice(0, 3)
                  .map((f) => (
                    <span
                      key={f.id}
                      className="inline-flex items-center gap-1 text-[11px] font-medium bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded shadow-2xs"
                    >
                      <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0" />
                      <span className="truncate max-w-[200px]">{f.title}</span>
                      <span className="font-mono text-[10px] text-rose-700 font-bold">+{f.riskWeight}</span>
                    </span>
                  ))}
                {primaryCase.findings.filter((f) => f.reviewState !== 'RESOLVED').length > 3 && (
                  <span className="text-[11px] text-slate-400 font-medium">
                    +{primaryCase.findings.filter((f) => f.reviewState !== 'RESOLVED').length - 3} more
                  </span>
                )}
                {primaryCase.findings.filter((f) => f.reviewState !== 'RESOLVED').length === 0 && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    All flagged findings resolved
                  </span>
                )}
              </div>
            </div>

            {/* Right: Score & Fast Action Buttons */}
            <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200">
              <div className="text-right">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                  Risk Score
                </span>
                <RiskScoreBadge score={primaryCase.riskScore} />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs bg-white text-slate-700 hover:text-slate-900 border-slate-200"
                  onClick={() => setSelectedCase(primaryCase)}
                >
                  <Eye className="h-3.5 w-3.5 mr-1 text-slate-500" />
                  Quick View
                </Button>
                <Button
                  variant="specular"
                  size="sm"
                  className="text-xs font-semibold gap-1.5 shadow-xs"
                  onClick={() => navigate(`/applications/${primaryCase.id}/review`)}
                >
                  <span>Scrutiny Workspace</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Analytics Section: Recharts Trend & Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Application Velocity & Scrutiny Pace</CardTitle>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-blue-900">
                <span className="h-2 w-2 rounded-full bg-blue-900" />
                Dossiers
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                Validated
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <TrendChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle>Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <StatusDistributionChart applications={applications} />
          </CardContent>
        </Card>
      </div>

      {/* 4. Priority Review Queue */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <CardTitle>Priority Regulatory Review Queue</CardTitle>
              <Badge variant="outline" size="sm" className="font-mono text-[11px]">
                {filteredQueue.length} of {metrics.totalApplications}
              </Badge>
            </div>

            {/* Queue Filter Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-44 sm:w-56">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by ID or institute..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border border-slate-200 bg-white py-1.5 px-2 text-xs text-slate-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING_REVIEW">Pending Review</option>
                <option value="VALIDATION_EXCEPTION">Validation Exception</option>
                <option value="UNDER_AI_REVIEW">Under AI Review</option>
                <option value="VERIFIED">Verified</option>
                <option value="APPROVAL_RECOMMENDED">Approval Recommended</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-md border border-slate-200 bg-white py-1.5 px-2 text-xs text-slate-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="ALL">All Priorities</option>
                <option value="HIGH">High Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="LOW">Low Priority</option>
              </select>

              {(searchQuery || statusFilter !== 'ALL' || priorityFilter !== 'ALL') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  className="h-7 px-2 text-xs text-slate-500 hover:text-slate-800"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {filteredQueue.length === 0 ? (
            <div className="py-12 px-4 text-center max-w-sm mx-auto">
              <p className="text-sm font-semibold text-slate-700">No applications match criteria</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="mt-3 text-xs gap-1.5"
              >
                <RotateCcw className="h-3 w-3" />
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Application</th>
                    <th className="py-2.5 px-4 font-semibold">Institution Name</th>
                    <th className="py-2.5 px-4 font-semibold">Type</th>
                    <th className="py-2.5 px-4 font-semibold">Status</th>
                    <th className="py-2.5 px-4 font-semibold">Risk & Priority</th>
                    <th className="py-2.5 px-4 font-semibold">Flags</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQueue.map((app) => (
                    <tr
                      key={app.id}
                      className={`hover:bg-slate-50/70 transition-colors group ${
                        app.applicationId === 'DEMO-EoA-2026-0142' ? 'bg-amber-50/20' : ''
                      }`}
                    >
                      <td className="py-2.5 px-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span>{app.applicationId}</span>
                          {app.applicationId === 'DEMO-EoA-2026-0142' && (
                            <span className="rounded bg-amber-200/80 text-amber-900 px-1 text-[9px] font-bold">
                              DEMO
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans">
                          {app.state}
                        </div>
                      </td>

                      <td className="py-2.5 px-4">
                        <div className="font-semibold text-slate-900 truncate max-w-[220px]">
                          {app.institutionName}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {app.programType}
                        </div>
                      </td>

                      <td className="py-2.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                        {app.applicationCategory}
                      </td>

                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <StatusBadge status={app.status} />
                      </td>

                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <RiskScoreBadge score={app.riskScore} />
                          <PriorityBadge priority={app.priority} />
                        </div>
                      </td>

                      <td className="py-2.5 px-4 whitespace-nowrap">
                        {app.issueCount > 0 ? (
                          <span className="font-semibold text-rose-600">
                            {app.issueCount} flags
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs px-2 text-slate-600 hover:text-slate-900"
                            onClick={() => setSelectedCase(app)}
                            title="Quick Drawer"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            className="h-7 text-xs px-2.5 font-bold bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 border border-amber-400/80 shadow-2xs"
                            onClick={() => navigate(`/applications/${app.id}/review`)}
                          >
                            Review <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 5. Bottom Two-Column: Regulatory Issue Category Summary & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Regulatory Issue Category Summary</CardTitle>
              <Badge variant="outline" size="sm">
                Aggregated
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <IssueCategoryList applications={applications} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Scrutiny Activity</CardTitle>
              <span className="text-[11px] font-mono text-slate-400">
                Live Audit Stream
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <ActivityTimeline />
          </CardContent>
        </Card>
      </div>

      {/* Minimal Footer */}
      <div className="text-center py-2 text-[11px] text-slate-400">
        SIH26261 · Simulated Regulatory Prototype · APH 2024–27 Standard
      </div>

      {/* Case Review Drawer / Modal */}
      <CaseReviewDrawer
        application={selectedCase}
        onClose={() => setSelectedCase(null)}
      />
    </div>
  );
}
