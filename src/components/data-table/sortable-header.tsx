import { ChevronDownIcon, ChevronUpIcon, ChevronsUpDown } from "lucide-react";

interface SortableHeaderProps {
  field: string;
  label: string;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
  className?: string;
}

export const SortableHeader = ({
  field,
  label,
  sortField,
  sortDirection,
  onSort,
  className = ""
}: SortableHeaderProps) => {
  const isActive = sortField === field;
  
  return (
    <button 
      onClick={() => onSort(field)}
      className={`flex items-center gap-1 group hover:text-primary w-full justify-center ${
        isActive ? 'text-primary font-bold' : 'font-semibold'
      } ${className}`}
    >
      {label}
      {isActive ? (
        sortDirection === 'desc' ? (
          <ChevronDownIcon className="w-4 h-4 text-primary" />
        ) : (
          <ChevronUpIcon className="w-4 h-4 text-primary" />
        )
      ) : (
        <ChevronDownIcon className="w-4 h-4 text-text-dark group-hover:text-primary" />
      )}
    </button>
  );
};
