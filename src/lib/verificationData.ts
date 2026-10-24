import {
  ApplicationRecord,
  VerificationRecord,
  VerificationSummaryMetrics,
  VerificationMethod,
  VerificationResult,
} from '@/types';

export const VERIFICATION_METHOD_META: Record<
  VerificationMethod,
  { label: string; description: string }
> = {
  CROSS_DOCUMENT_CONSISTENCY: {
    label: 'Cross-Document Consistency',
    description: 'Evaluates consistency across submitted forms, seat declarations, and affiliating body sanctions.',
  },
  IDENTITY_MATCHING: {
    label: 'Institutional Identity Matching',
    description: 'Verifies institution name, address, society trust deed, and statutory identifiers.',
  },
  DOCUMENT_VALIDITY: {
    label: 'Document Validity & Expiry',
    description: 'Validates issuing authority dates, academic year windows, and statutory tenure.',
  },
  REGISTRY_MATCHING: {
    label: 'Regulatory Registry Cross-Check',
    description: 'Cross-references state regulatory boards, council approvals, and university lists.',
  },
  DIGITAL_SIGNATURE: {
    label: 'Digital Signature & Tamper Analysis',
    description: 'Verifies PKI certificates, digital signers, OCSP revocation, and cryptohashes.',
  },
  DUPLICATE_DETECTION: {
    label: 'Duplicate & Plagiarism Detection',
    description: 'Identifies duplicate document hashes or reused institutional credentials.',
  },
  VISUAL_ANOMALIES: {
    label: 'Visual & Forensic Tampering',
    description: 'Detects raster artifacts, seal inconsistencies, spliced text, and layout shifts.',
  },
  EXTERNAL_SOURCE: {
    label: 'External Source Integration',
    description: 'Syncs with state higher education portals, municipal NOC databases, and revenue records.',
  },
};

export function getVerificationRecords(applications: ApplicationRecord[]): VerificationRecord[] {
  const records: VerificationRecord[] = [];

  applications.forEach((app, appIdx) => {
    const appRefNum = app.applicationId.replace(/[^0-9]/g, '').slice(-4) || `${appIdx + 1}`.padStart(4, '0');

    // 1. Synthesize records from application findings
    app.findings.forEach((finding, findIdx) => {
      let method: VerificationMethod = 'CROSS_DOCUMENT_CONSISTENCY';
      let result: VerificationResult = 'MISMATCH_FLAGGED';

      if (finding.type === 'EXPIRED_AFFILIATION' || finding.type === 'MISSING_DOCUMENT') {
        method = 'DOCUMENT_VALIDITY';
        result = finding.reviewState === 'RESOLVED' ? 'MATCH_PASSED' : 'MISMATCH_FLAGGED';
      } else if (finding.type === 'INTAKE_MISMATCH') {
        method = 'CROSS_DOCUMENT_CONSISTENCY';
        result = finding.reviewState === 'RESOLVED' ? 'MATCH_PASSED' : 'MISMATCH_FLAGGED';
      } else if (finding.type === 'VISUAL_ANOMALY') {
        method = 'VISUAL_ANOMALIES';
        result = finding.reviewState === 'RESOLVED' ? 'MATCH_PASSED' : 'ANOMALY_DETECTED';
      } else if (finding.type === 'REGISTRY_MATCH') {
        method = 'REGISTRY_MATCHING';
        result = 'MATCH_PASSED';
      } else if (finding.type === 'SOURCE_UNAVAILABLE') {
        method = 'EXTERNAL_SOURCE';
        result = 'SOURCE_UNAVAILABLE';
      } else {
        method = 'DOCUMENT_VALIDITY';
        result = finding.status === 'VERIFIED' ? 'MATCH_PASSED' : 'MISMATCH_FLAGGED';
      }

      const relatedDoc = app.documents.find((d) => d.id === finding.relatedDocumentId);

      let reviewStatus: 'PENDING_OFFICER_REVIEW' | 'INSPECTED' | 'VERIFIED' | 'EXCEPTION_RECORDED' =
        'PENDING_OFFICER_REVIEW';
      if (finding.reviewState === 'RESOLVED') {
        reviewStatus = 'VERIFIED';
      } else if (finding.reviewState === 'REVIEWED') {
        reviewStatus = 'INSPECTED';
      } else if (finding.reviewState === 'ESCALATED') {
        reviewStatus = 'EXCEPTION_RECORDED';
      }

      records.push({
        id: `VRF-${appRefNum}-${String(findIdx + 1).padStart(2, '0')}`,
        applicationId: app.applicationId,
        appDbId: app.id,
        institutionName: app.institutionName,
        documentName: relatedDoc ? relatedDoc.name : 'Regulatory Dossier Submission',
        documentId: relatedDoc?.id,
        method,
        methodLabel: VERIFICATION_METHOD_META[method].label,
        result,
        timestamp: finding.detectedAt || app.lastUpdated || '2026-10-20 09:30',
        targetChecked: finding.title,
        expectedValue: finding.expectedValue || 'Statutory Compliance under APH 2024-27',
        observedValue: finding.observedValue || finding.description,
        explanation: finding.explanation || finding.description,
        recommendedAction: finding.recommendedAction || 'Scrutiny officer manual review required.',
        reviewStatus,
        findingId: finding.id,
        scoreContribution: finding.riskWeight || 15,
      });
    });

    // 2. Add standard baseline passes for institutional identity & certificates
    const passedCheckIndex = records.length;
    records.push({
      id: `VRF-${appRefNum}-${String(passedCheckIndex + 1).padStart(2, '0')}`,
      applicationId: app.applicationId,
      appDbId: app.id,
      institutionName: app.institutionName,
      documentName: 'Trust_Registration_Deed_Charity_Comm.pdf',
      method: 'IDENTITY_MATCHING',
      methodLabel: VERIFICATION_METHOD_META.IDENTITY_MATCHING.label,
      result: 'MATCH_PASSED',
      timestamp: app.submissionDate || '2026-10-18 10:00',
      targetChecked: 'Society / Trust Registration & Title Alignment',
      expectedValue: 'Registered Public Trust / Society Entity verified on State Portal',
      observedValue: 'Entity active and registered under Society Registration Act',
      explanation: 'Institutional identity cross-matched with charity registration record.',
      recommendedAction: 'No action needed. Registered entity matches application dossier.',
      reviewStatus: 'VERIFIED',
      scoreContribution: 0,
    });

    records.push({
      id: `VRF-${appRefNum}-${String(passedCheckIndex + 2).padStart(2, '0')}`,
      applicationId: app.applicationId,
      appDbId: app.id,
      institutionName: app.institutionName,
      documentName: 'Digital_Signature_Certificate_Validation.xml',
      method: 'DIGITAL_SIGNATURE',
      methodLabel: VERIFICATION_METHOD_META.DIGITAL_SIGNATURE.label,
      result: 'MATCH_PASSED',
      timestamp: app.submissionDate || '2026-10-18 10:02',
      targetChecked: 'Authorized Signatory Class-3 DSC Verification',
      expectedValue: 'Valid Class-3 Digital Signature Certificate with OCSP unrevoked status',
      observedValue: 'Valid digital signature chain anchored to National CCA root',
      explanation: 'Cryptographic signature verified successfully across all submitted PDFs.',
      recommendedAction: 'No action needed. Digital certificate authentic.',
      reviewStatus: 'VERIFIED',
      scoreContribution: 0,
    });
  });

  return records;
}

export function getVerificationSummaryMetrics(records: VerificationRecord[]): VerificationSummaryMetrics {
  return {
    totalChecks: records.length,
    successfulMatches: records.filter((r) => r.result === 'MATCH_PASSED').length,
    mismatchesRequiringReview: records.filter(
      (r) => r.result === 'MISMATCH_FLAGGED' || r.result === 'ANOMALY_DETECTED'
    ).length,
    sourceChecksUnavailable: records.filter((r) => r.result === 'SOURCE_UNAVAILABLE').length,
    pendingManualVerification: records.filter(
      (r) => r.result === 'PENDING_MANUAL' || r.reviewStatus === 'PENDING_OFFICER_REVIEW'
    ).length,
  };
}
