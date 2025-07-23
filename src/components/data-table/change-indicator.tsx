import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface ChangeIndicatorProps {
  change: number;
}

export const ChangeIndicator = ({ change }: ChangeIndicatorProps) => {
  if (change === 0) return null;
  
  const isPositive = change > 0;
  return (
    <div className="flex items-center justify-center gap-1">
      {isPositive ? (
        <ArrowUpIcon className="w-3 h-3 text-primary" />
      ) : (
        <ArrowDownIcon className="w-3 h-3 text-destructive" />
      )}
      <span className={`text-xs font-medium ${isPositive ? 'text-primary' : 'text-destructive'}`}>
        {Math.abs(change).toFixed(1)}%
      </span>
    </div>
  );
};
