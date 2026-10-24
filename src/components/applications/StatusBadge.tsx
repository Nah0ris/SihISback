import { ApplicationStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  switch (status) {
    case 'PENDING_REVIEW':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800',
            className
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Pending Review
        </span>
      );
    case 'VALIDATION_EXCEPTION':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-800',
            className
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Validation Exception
        </span>
      );
    case 'UNDER_AI_REVIEW':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-800',
            className
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          Under AI Review
        </span>
      );
    case 'VERIFIED':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800',
            className
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Verified
        </span>
      );
    case 'APPROVAL_RECOMMENDED':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-800',
            className
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          Approval Recommended
        </span>
      );
    case 'REJECTED':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700',
            className
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          Rejected
        </span>
      );
    default:
      return (
        <span className={cn('inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600', className)}>
          {status}
        </span>
      );
  }
}
