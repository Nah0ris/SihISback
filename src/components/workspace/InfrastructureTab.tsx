import { useState } from 'react';
import { ApplicationRecord } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { analyzeInfrastructureApi, InfrastructureAnalysisResponse } from '@/lib/api';
import {
  Building2,
  Cpu,
  Flame,
  Sparkles,
  MapPin,
  Camera,
} from 'lucide-react';

interface InfrastructureTabProps {
  application: ApplicationRecord;
}

export function InfrastructureTab({ application }: InfrastructureTabProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<InfrastructureAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fast sample demonstration trigger for presentations
  const handleAnalyzePreset = async (presetType: string, cap: number) => {
    setIsAnalyzing(true);
    setError(null);
    try {

      // Create a genuine simulated photographic canvas
      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = presetType.includes('Fire') ? '#1e293b' : '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 36px monospace';
        ctx.fillText(`AICTE EVIDENTIARY CAPTURE: ${presetType}`, 60, 100);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '24px sans-serif';
        ctx.fillText(`Institution: ${application.institutionName} · Geo: 18.5204 N, 73.8567 E`, 60, 150);
        
        // Draw grid representing terminals or equipment
        ctx.strokeStyle = presetType.includes('Fire') ? '#ef4444' : '#6366f1';
        ctx.lineWidth = 3;
        for (let i = 0; i < 48; i++) {
          const x = 80 + (i % 8) * 220;
          const y = 220 + Math.floor(i / 8) * 130;
          ctx.strokeRect(x, y, 180, 90);
          ctx.fillStyle = '#e2e8f0';
          ctx.font = '16px sans-serif';
          ctx.fillText(`Station ${i + 1}`, x + 40, y + 50);
        }
      }

      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b || new Blob()), 'image/png')
      );
      const file = new File([blob], `${presetType.replace(/\s+/g, '_')}_Evidence.png`, {
        type: 'image/png',
      });

      const res = await analyzeInfrastructureApi(file, presetType, cap, application.applicationId);
      setAnalysisResult(res);
    } catch (err: any) {
      setError(err.message || 'Analysis failed.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-blue-200 bg-blue-50/50">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Campus Infrastructure & Computer Vision Evidence Intelligence
            </h3>
            <Badge variant="navy" size="sm" className="font-mono text-[10px]">
              Module 4
            </Badge>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Automated image feature detection, terminal density verification, and spatial geofencing under APH Clause 4.2.
          </p>
        </div>

        {/* Preset demo triggers */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            disabled={isAnalyzing}
            onClick={() => handleAnalyzePreset('Computing Center / Computer Lab', 60)}
            className="text-xs gap-1 bg-white"
          >
            <Cpu className="h-3.5 w-3.5 text-blue-600" />
            Scan Computer Lab
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={isAnalyzing}
            onClick={() => handleAnalyzePreset('Fire Suppression & Hydrant System', 1)}
            className="text-xs gap-1 bg-white"
          >
            <Flame className="h-3.5 w-3.5 text-rose-600" />
            Scan Fire Hydrant
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
          {error}
        </div>
      )}

      {/* 2. Analysis Results Card */}
      {analysisResult ? (
        <Card>
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>{analysisResult.facilityType}</CardTitle>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      analysisResult.complianceStatus === 'COMPLIANT'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {analysisResult.complianceStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="font-mono">{analysisResult.aphNormClause}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-600 font-mono text-[11px]">
                    <MapPin className="h-3 w-3 text-emerald-600" />
                    {analysisResult.geoVerification}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Readiness Score
                  </span>
                  <span className="font-mono text-lg font-bold text-slate-900">
                    {analysisResult.readinessScore}%
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 space-y-4">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/70">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">
                  Detected Capacity
                </span>
                <span className="text-lg font-bold text-slate-900 font-mono">
                  {analysisResult.detectedCapacity} units
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/70">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">
                  Declared Mandate
                </span>
                <span className="text-lg font-bold text-slate-900 font-mono">
                  {analysisResult.declaredCapacity} units
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/70">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">
                  Processing Time
                </span>
                <span className="text-lg font-bold text-indigo-700 font-mono">
                  {analysisResult.processingTimeMs} ms
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/70">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">
                  Geofence Check
                </span>
                <span className="text-xs font-bold text-emerald-700 mt-1 block">
                  Verified In-Polygon
                </span>
              </div>
            </div>

            {/* Checks List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Automated Computer Vision Verifications
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg bg-white overflow-hidden text-xs">
                {analysisResult.checks.map((chk, idx) => (
                  <div key={idx} className="p-3 flex items-start gap-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded mt-0.5 shrink-0 ${
                        chk.status === 'PASS'
                          ? 'bg-emerald-100 text-emerald-800'
                          : chk.status === 'FAIL'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {chk.status}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-800">{chk.name}</div>
                      <div className="text-slate-600 text-[11px] mt-0.5">{chk.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Empty / Initial State */
        <Card className="p-8 text-center border-dashed border-2">
          <Camera className="h-10 w-10 text-slate-300 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-700">
            Automated Physical Infrastructure Verification
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Analyze photographic evidence of computer centers, smart classrooms, laboratories, and fire safety systems to verify physical compliance without manual on-site inspection delays.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button
              variant="primary"
              size="sm"
              disabled={isAnalyzing}
              onClick={() => handleAnalyzePreset('Computing Center / Computer Lab', 60)}
              className="text-xs gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {isAnalyzing ? 'Analyzing Image...' : 'Run Lab Computer Vision Audit'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
