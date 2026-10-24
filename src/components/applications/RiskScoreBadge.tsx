import { cn } from '@/lib/utils';

interface RiskScoreBadgeProps {
  score: number;
  className?: string;
}

export function RiskScoreBadge({ score, className }: RiskScoreBadgeProps) {
  let textColor = 'text-emerald-700 bg-emerald-50';
  let dotColor = 'bg-emerald-500';

  if (score >= 70) {
    textColor = 'text-rose-700 bg-rose-50';
    dotColor = 'bg-rose-500';
  } else if (score >= 40) {
    textColor = 'text-amber-700 bg-amber-50';
    dotColor = 'bg-amber-500';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-xs font-bold',
        textColor,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dotColor)} />
      {score}
      <span className="text-[10px] opacity-60 font-normal">/100</span>
    </span>
  );
}
