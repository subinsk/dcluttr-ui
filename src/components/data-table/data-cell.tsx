import { ChangeIndicator } from "./change-indicator";
import { formatCurrency, formatNumber, formatPercentage } from "./utils";


interface DataValue {
  current: number;
  previous?: number;
  change?: number;
}

import type { MetricField } from "./types";

interface DataCellProps {
  item: Record<string, MetricField>;
  field: string;
  isSelected: boolean;
}

export const DataCell = ({ item, field, isSelected }: DataCellProps) => {
  const data = item[field];
  if (!data) return <span className="text-sm text-gray-600">-</span>;

  const formatValue = (value: number, field: string) => {
    switch (field) {
      case 'sales':
        return formatCurrency(value);
      case 'outOfStock':
      case 'ctr':
        return formatPercentage(value);
      default:
        return formatNumber(value);
    }
  };

  if (isSelected && data.previous !== undefined) {
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="font-semibold text-sm text-gray-600">
          {formatValue(data.current, field)}
        </span>
        <span className="text-xs text-gray-500">
          {formatValue(data.previous, field)}
        </span>
        <ChangeIndicator change={data.change ?? 0} />
      </div>
    );
  }

  return (
    <span className="text-sm text-gray-600">
      {formatValue(data.current, field)}
    </span>
  );
};
