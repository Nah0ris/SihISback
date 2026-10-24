import { FindingType } from '@/types';

export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export interface BackendHealth {
  status?: string;
  version?: string;
  ocrAvailable?: boolean;
  ocrEngineInfo?: string;
  pypdfAvailable?: boolean;
  uploadDir?: string;
  maxFileSizeMb?: number;
  evaluationCycle?: string;
  supportedFormats?: string[];
  isOnline: boolean;
}

export interface ExtractedFieldDto {
  label: string;
  value: string;
  confidence?: number;
  isFlagged?: boolean;
  highlightNote?: string;
}

export interface ValidationCheckDto {
  id: string;
  name: string;
  status: 'PASS' | 'FAIL' | 'WARNING' | 'SKIPPED';
  detail: string;
}

export interface GeneratedFindingDto {
  id: string;
  title: string;
  description?: string;
  category?:
    | 'Affiliation & Approvals'
    | 'Mandatory Documentation'
    | 'Academic & Seat Intake'
    | 'Visual & Forensic Analysis'
    | 'State Registry Cross-Check'
    | 'External Source Integration'
    | 'Land & Infrastructure'
    | 'Faculty & Cadre';
  severity?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  type?: FindingType;
  status?: 'FLAGGED' | 'RESOLVED' | 'VERIFIED' | 'REQUIRES_MANUAL_INSPECTION' | 'UNAVAILABLE_OFFLINE';
  clauseRef?: string;
  observedValue?: string;
  expectedValue?: string;
  explanation?: string;
  recommendedAction?: string;
  riskWeight?: number;
}

export interface DocumentUploadResponseDto {
  id: string;
  name: string;
  documentType: string;
  category: string;
  uploadDate: string;
  status: 'VERIFIED' | 'FLAGGED' | 'MISSING' | 'MANUAL_INSPECTION' | 'OFFLINE_STANDBY';
  fileSize: string;
  fileSizeBytes: number;
  pagesCount: number;
  fileHash: string;
  mimeType: string;
  applicationId?: string;
  issuingAuthority?: string;
  referenceNumber?: string;
  validityWindow?: string;
  extractedIntakeValue?: number;
  extractedFields: ExtractedFieldDto[];
  validationChecks: ValidationCheckDto[];
  associatedFindingIds: string[];
  rawTextExcerpt?: string;
  processingTimeMs: number;
  ocrEngineUsed?: string;
  isScanned: boolean;
  hasVisualAnomaly: boolean;
  anomalyDetails?: string;
  hasForensicHeatmap?: boolean;
  tamperingScore?: number;
  duplicateHashDetected: boolean;
  findingsGenerated?: GeneratedFindingDto[];
  fullRawText?: string;
  downloadUrl?: string;
}

export interface InfrastructureAnalysisResponse {
  facilityType: string;
  complianceStatus: 'COMPLIANT' | 'DEFICIENT' | 'INSPECTION_RECOMMENDED';
  readinessScore: number;
  detectedCapacity: number;
  declaredCapacity: number;
  aphNormClause: string;
  geoVerification: string;
  processingTimeMs: number;
  checks: Array<{ name: string; status: 'PASS' | 'FAIL' | 'WARNING'; detail: string }>;
  deficiencyFindings: Array<any>;
}

export async function checkBackendHealth(): Promise<BackendHealth | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) return { isOnline: false };
    const data = await res.json();
    return { ...data, isOnline: true };
  } catch {
    return { isOnline: false };
  }
}

export async function uploadDocumentApi(
  file: File,
  category: string,
  documentType: string,
  applicationId?: string
): Promise<DocumentUploadResponseDto> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);
  formData.append('documentType', documentType);
  if (applicationId) {
    formData.append('applicationId', applicationId);
  }

  const res = await fetch(`${API_BASE_URL}/documents/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to upload document.');
  }

  return res.json();
}

export async function analyzeInfrastructureApi(
  file: File,
  facilityType: string = 'Computing Center / Computer Lab',
  declaredCapacity: number = 60,
  applicationId?: string
): Promise<InfrastructureAnalysisResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('facilityType', facilityType);
  formData.append('declaredCapacity', String(declaredCapacity));
  if (applicationId) {
    formData.append('applicationId', applicationId);
  }

  const res = await fetch(`${API_BASE_URL}/infrastructure/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Infrastructure analysis failed.');
  }

  return res.json();
}

