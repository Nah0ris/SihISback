import { PriorityLevel } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';

interface PriorityBadgeProps {
  priority: PriorityLevel;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  switch (priority) {
    case 'HIGH':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-0.5 text-[11px] font-semibold text-rose-600',
            className
          )}
        >
          <ArrowUp className="h-3 w-3" />
          High
        </span>
      );
    case 'MEDIUM':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-0.5 text-[11px] font-medium text-amber-600',
            className
          )}
        >
          <ArrowRight className="h-3 w-3" />
          Med
        </span>
      );
    case 'LOW':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-0.5 text-[11px] font-medium text-slate-500',
            className
          )}
        >
          <ArrowDown className="h-3 w-3" />
          Low
        </span>
      );
  }
}
