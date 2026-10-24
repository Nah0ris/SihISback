import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useApplicationContext } from '@/context/ApplicationContext';
import {
  X,
  Send,
  FileText,
  Printer,
  ShieldAlert,
  QrCode,
} from 'lucide-react';

interface RequestClarificationModalProps {
  applicationId: string;
  institutionName: string;
  onClose: () => void;
}

export function RequestClarificationModal({
  applicationId,
  institutionName,
  onClose,
}: RequestClarificationModalProps) {
  const { requestClarification } = useApplicationContext();

  const [mode, setMode] = useState<'form' | 'preview'>('form');
  const [subject, setSubject] = useState(
    'STATUTORY DEFICIENCY DIRECTIVE: Expired University Affiliation & Municipal NOC'
  );
  const [deadlineDays, setDeadlineDays] = useState(7);
  const [details, setDetails] = useState(
    `1. Furnish valid continuation affiliation order for AY 2026–27 from the affiliating University under APH Clause 2.4.1.\n2. Submit Form 4B Municipal Fire & Structural Safety Clearance Certificate under APH Clause 5.1.2.\n3. Reconcile applied B.Tech CSE seat intake (180 seats declared vs 120 seats recognized on affiliating University schedule).`
  );

  const noticeDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const refNumber = `F.No. AICTE/AB/WRO/2026/EoA-DEF-${applicationId.slice(-4)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestClarification(applicationId, subject, details);
    alert(`Official deficiency directive dispatched to ${institutionName}. Logged to regulatory audit trail.`);
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-navy-950 text-white px-5 py-3.5 border-b border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Statutory Deficiency Notice & Clarification Dispatch
              </h3>
              <p className="text-[11px] text-slate-400">
                {institutionName} · {applicationId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-navy-900 border border-navy-800 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setMode('form')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  mode === 'form' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Edit Directives
              </button>
              <button
                type="button"
                onClick={() => setMode('preview')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  mode === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Official Letter Preview
              </button>
            </div>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {mode === 'form' ? (
          /* Form Mode */
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Notice Subject & Citation
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Compliance Window (Business Days)
                </label>
                <input
                  type="number"
                  min={3}
                  max={30}
                  value={deadlineDays}
                  onChange={(e) => setDeadlineDays(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Formal Letterhead Reference
                </label>
                <input
                  type="text"
                  disabled
                  value={refNumber}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-mono text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Specific Statutory Deficiencies & Evidentiary Mandate
              </label>
              <textarea
                rows={5}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:border-blue-500 focus:outline-none leading-relaxed font-mono"
              />
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setMode('preview')}
                className="gap-1.5 text-xs"
              >
                <FileText className="h-3.5 w-3.5" />
                View Official Letterhead
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="gap-1.5">
                  <Send className="h-3.5 w-3.5" />
                  Dispatch Directive
                </Button>
              </div>
            </div>
          </form>
        ) : (
          /* Official AICTE Letterhead Preview */
          <div className="p-6 space-y-4 text-slate-800">
            <div className="border border-slate-300 rounded-xl p-6 bg-white shadow-xs space-y-4 font-serif text-xs leading-relaxed">
              {/* Header */}
              <div className="text-center pb-3 border-b-2 border-slate-800">
                <h2 className="text-sm font-bold tracking-wide text-slate-900 uppercase">
                  All India Council for Technical Education
                </h2>
                <h3 className="text-[11px] font-semibold text-slate-700 uppercase">
                  (A Statutory Body Under Ministry of Education, Govt. of India)
                </h3>
                <p className="text-[10px] text-slate-500 font-sans mt-0.5">
                  Bureau of Approval · Western Regional Scrutiny Directorate · Nelson Mandela Marg, New Delhi
                </p>
              </div>

              {/* Ref & Date */}
              <div className="flex justify-between font-sans text-[11px] text-slate-600">
                <span>Ref: <strong className="font-mono text-slate-800">{refNumber}</strong></span>
                <span>Date: <strong className="text-slate-800">{noticeDate}</strong></span>
              </div>

              {/* Addressee */}
              <div className="font-sans text-xs space-y-0.5">
                <p className="font-bold text-slate-900">To,</p>
                <p>The Principal / Director,</p>
                <p className="font-semibold text-slate-900">{institutionName}</p>
                <p className="text-slate-600">Application Reference: {applicationId}</p>
              </div>

              {/* Subject */}
              <div className="py-2 border-y border-slate-200 font-sans font-bold text-slate-900 text-xs">
                SUBJECT: {subject}
              </div>

              {/* Body */}
              <div className="space-y-2 text-justify font-sans text-xs text-slate-700 leading-relaxed">
                <p>Sir/Madam,</p>
                <p>
                  During automated preliminary scrutiny of your application dossier for the Extension of Approval (EoA) cycle 2026–2027 conducted under the statutory provisions of the <strong>AICTE Approval Process Handbook (APH 2024–2027)</strong>, the scrutiny committee has noted non-compliances and documentation gaps requiring immediate rectification:
                </p>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-[11px] whitespace-pre-line text-slate-900">
                  {details}
                </div>
                <p>
                  You are hereby directed to upload certified documentary evidence rectifying the cited deficiencies through the AICTE portal within <strong>{deadlineDays} business days</strong> from the receipt of this notice. Failure to submit required valid documents may lead to withholding of approval or capping of authorized intake under Chapter II of APH 2024–27.
                </p>
              </div>

              {/* Signatures */}
              <div className="pt-4 flex items-end justify-between font-sans">
                <div className="flex items-center gap-2 border border-slate-200 p-2 rounded bg-slate-50 text-[10px] text-slate-500">
                  <QrCode className="h-8 w-8 text-slate-700" />
                  <div>
                    <span className="font-bold text-slate-700 block">Digitally Authenticated</span>
                    <span>AICTE Regulatory Verification Ledger</span>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <p className="font-bold text-slate-900">Member Secretary / Scrutiny Officer</p>
                  <p className="text-slate-500">AICTE Approval Bureau</p>
                </div>
              </div>
            </div>

            {/* Print & Dispatch Footer */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="gap-1.5 text-xs text-slate-700"
              >
                <Printer className="h-3.5 w-3.5" />
                Print / Save PDF
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMode('form')}
                  className="text-xs"
                >
                  Edit Directive
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmit}
                  className="gap-1.5 text-xs"
                >
                  <Send className="h-3.5 w-3.5" />
                  Dispatch Official Notice
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
