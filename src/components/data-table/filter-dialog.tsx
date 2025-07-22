import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, ChevronDownIcon } from "lucide-react";
import { FilterState } from "./types";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  selectedCount: number;
  entityName: string;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export const FilterDialog = ({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  selectedCount,
  entityName,
  onApplyFilters,
  onClearFilters
}: FilterDialogProps) => {
  const handleFilterChange = (field: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/80 text-white gap-2">
          <Filter className="w-4 h-4" />
          Filters({selectedCount})
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Filter {entityName}</DialogTitle>
          <DialogDescription>
            Apply filters to narrow down your {entityName.toLowerCase()} data
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Min Sales</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md text-sm"
                placeholder="0"
                value={filters.salesMin}
                onChange={(e) => handleFilterChange('salesMin', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Max Sales</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md text-sm"
                placeholder="100000"
                value={filters.salesMax}
                onChange={(e) => handleFilterChange('salesMax', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Min Traffic</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md text-sm"
                placeholder="0"
                value={filters.trafficMin}
                onChange={(e) => handleFilterChange('trafficMin', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Max Traffic</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md text-sm"
                placeholder="50000"
                value={filters.trafficMax}
                onChange={(e) => handleFilterChange('trafficMax', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Min Inventory</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md text-sm"
                placeholder="0"
                value={filters.inventoryMin}
                onChange={(e) => handleFilterChange('inventoryMin', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Max Inventory</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md text-sm"
                placeholder="10000"
                value={filters.inventoryMax}
                onChange={(e) => handleFilterChange('inventoryMax', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Min Rank</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md text-sm"
                placeholder="1"
                value={filters.rankMin}
                onChange={(e) => handleFilterChange('rankMin', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Max Rank</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md text-sm"
                placeholder="20"
                value={filters.rankMax}
                onChange={(e) => handleFilterChange('rankMax', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Min CTR (%)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md text-sm"
                placeholder="0"
                step="0.1"
                value={filters.ctrMin}
                onChange={(e) => handleFilterChange('ctrMin', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Max CTR (%)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md text-sm"
                placeholder="50"
                step="0.1"
                value={filters.ctrMax}
                onChange={(e) => handleFilterChange('ctrMax', e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="outline" onClick={onClearFilters}>
            Clear All
          </Button>
          <Button onClick={onApplyFilters}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
