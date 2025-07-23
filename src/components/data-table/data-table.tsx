import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { BarChart3, X } from "lucide-react";
import React, { ReactNode, useState } from "react";
import { DataCell } from "./data-cell";
import { SortableHeader } from "./sortable-header";
import { FilterDialog } from "./filter-dialog";
import { FilterState, DataItem, MetricKeys, MetricField } from "./types";
import { calculateTotals, sortData, formatCurrency, formatNumber } from "./utils";

interface DataTableProps {
    title: string;
    description: string;
    data: DataItem[];
    entityName: string;
    entityNamePlural: string;
    entityIcon: ReactNode;
    defaultSelected: string[];
}

export const DataTable = ({
    title,
    description,
    data,
    entityName,
    entityIcon,
    entityNamePlural,
    defaultSelected
}: DataTableProps) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(defaultSelected);
    const [sortField, setSortField] = useState<MetricKeys | "">("");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        salesMin: "",
        salesMax: "",
        inventoryMin: "",
        inventoryMax: "",
        trafficMin: "",
        trafficMax: "",
        rankMin: "",
        rankMax: "",
        ctrMin: "",
        ctrMax: ""
    });
    const [appliedFilters, setAppliedFilters] = useState<FilterState>({
        salesMin: "",
        salesMax: "",
        inventoryMin: "",
        inventoryMax: "",
        trafficMin: "",
        trafficMax: "",
        rankMin: "",
        rankMax: "",
        ctrMin: "",
        ctrMax: ""
    });

    const handleItemToggle = (itemId: string) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handleSort = (field: string) => {
        if (sortField === field) {
            if (sortDirection === "desc") {
                setSortDirection("asc");
            } else if (sortDirection === "asc") {
                setSortField("");
                setSortDirection("desc");
            }
        } else {
            setSortField(field as MetricKeys);
            setSortDirection("desc");
        }
    };

    const applyFilters = () => {
        setAppliedFilters(filters);
        setFilterDialogOpen(false);
    };

    const clearAllFilters = () => {
        const emptyFilters = {
            salesMin: "",
            salesMax: "",
            inventoryMin: "",
            inventoryMax: "",
            trafficMin: "",
            trafficMax: "",
            rankMin: "",
            rankMax: "",
            ctrMin: "",
            ctrMax: ""
        };
        setFilters(emptyFilters);
        setAppliedFilters(emptyFilters);
    };

    const getActiveFiltersCount = () => {
        return Object.values(appliedFilters).filter(value => value.trim() !== "").length;
    };

    const getActiveFilters = () => {
        const activeFilters = [];
        if (appliedFilters.salesMin) activeFilters.push({ label: 'Sales Min', value: appliedFilters.salesMin, field: 'salesMin' });
        if (appliedFilters.salesMax) activeFilters.push({ label: 'Sales Max', value: appliedFilters.salesMax, field: 'salesMax' });
        if (appliedFilters.inventoryMin) activeFilters.push({ label: 'Inventory Min', value: appliedFilters.inventoryMin, field: 'inventoryMin' });
        if (appliedFilters.inventoryMax) activeFilters.push({ label: 'Inventory Max', value: appliedFilters.inventoryMax, field: 'inventoryMax' });
        if (appliedFilters.trafficMin) activeFilters.push({ label: 'Traffic Min', value: appliedFilters.trafficMin, field: 'trafficMin' });
        if (appliedFilters.trafficMax) activeFilters.push({ label: 'Traffic Max', value: appliedFilters.trafficMax, field: 'trafficMax' });
        if (appliedFilters.rankMin) activeFilters.push({ label: 'Rank Min', value: appliedFilters.rankMin, field: 'rankMin' });
        if (appliedFilters.rankMax) activeFilters.push({ label: 'Rank Max', value: appliedFilters.rankMax, field: 'rankMax' });
        if (appliedFilters.ctrMin) activeFilters.push({ label: 'CTR Min', value: appliedFilters.ctrMin, field: 'ctrMin' });
        if (appliedFilters.ctrMax) activeFilters.push({ label: 'CTR Max', value: appliedFilters.ctrMax, field: 'ctrMax' });
        return activeFilters;
    };

    const removeFilter = (field: string) => {
        const newAppliedFilters = { ...appliedFilters, [field]: "" };
        setAppliedFilters(newAppliedFilters);
        setFilters(newAppliedFilters);
    };

    const filteredData = data.filter(item => {
        if (appliedFilters.salesMin && item.sales.current < parseFloat(appliedFilters.salesMin)) return false;
        if (appliedFilters.salesMax && item.sales.current > parseFloat(appliedFilters.salesMax)) return false;
        
        if (appliedFilters.inventoryMin && item.totalInventory.current < parseInt(appliedFilters.inventoryMin)) return false;
        if (appliedFilters.inventoryMax && item.totalInventory.current > parseInt(appliedFilters.inventoryMax)) return false;
        
        if (appliedFilters.trafficMin && item.estTraffic.current < parseInt(appliedFilters.trafficMin)) return false;
        if (appliedFilters.trafficMax && item.estTraffic.current > parseInt(appliedFilters.trafficMax)) return false;
        
        if (appliedFilters.rankMin && item.averageRank.current < parseFloat(appliedFilters.rankMin)) return false;
        if (appliedFilters.rankMax && item.averageRank.current > parseFloat(appliedFilters.rankMax)) return false;
        
        if (appliedFilters.ctrMin && item.ctr.current < parseFloat(appliedFilters.ctrMin)) return false;
        if (appliedFilters.ctrMax && item.ctr.current > parseFloat(appliedFilters.ctrMax)) return false;
        
        return true;
    });

    const totals = calculateTotals(filteredData);
    const sortedData = sortField
      ? sortData(filteredData, sortField as MetricKeys, sortDirection)
      : filteredData;

    const columns = [
        { key: 'sales', label: 'Sales', parent: "availability" },
        { key: 'outOfStock', label: 'Out of Stock', parent: "availability" },
        { key: 'totalInventory', label: 'Total Inventory', parent: "availability" },
        { key: 'averageRank', label: 'Average Rank', parent: "visibility" },
        { key: 'estTraffic', label: 'Est. Traffic', parent: "visibility" },
        { key: 'estImpressions', label: 'Est. Impressions', parent: "visibility" }
    ];

    return (
        <div className="space-y-6 flex flex-col h-full">
            <div className="flex items-center justify-between flex-shrink-0">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-text-primary">{title}</h2>
                    <p className="text-sm text-text-secondary">{description}</p>
                </div>
                <FilterDialog
                    open={filterDialogOpen}
                    onOpenChange={setFilterDialogOpen}
                    filters={filters}
                    onFiltersChange={setFilters}
                    selectedCount={getActiveFiltersCount()}
                    entityName={entityNamePlural}
                    onApplyFilters={applyFilters}
                    onClearFilters={clearAllFilters}
                />
            </div>

            {getActiveFilters().length > 0 && (
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                    {getActiveFilters().map((filter, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-primary-background text-primary text-sm rounded-full"
                        >
                            <span className="font-medium">{filter.label}:</span>
                            <span>{filter.value}</span>
                            <button
                                onClick={() => removeFilter(filter.field)}
                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="border rounded-lg shadow-sm overflow-hidden flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-hidden">
                    <div className="table-container h-full">
                        <table className="w-full min-w-[1200px]">
                            <thead>
                                <tr className="bg-white border-b">
                                    <th rowSpan={2} className="sticky left-0 bg-white text-left p-4 font-bold text-sm text-text-dark border-r w-48 z-50">
                                        <div className="flex items-center gap-2">
                                            {entityIcon}
                                            {entityName} Name
                                        </div>
                                    </th>
                                    <th colSpan={3} className="text-center p-3 font-bold text-sm text-text-dark border-r">
                                        Availability
                                    </th>
                                    <th colSpan={3} className="text-center p-3 font-bold text-sm text-text-dark border-r">
                                        Visibility
                                    </th>
                                    <th rowSpan={2} className="text-center p-3 font-bold text-sm text-text-dark w-20">
                                        CTR
                                    </th>
                                </tr>
                            <tr className="bg-white border-b">
                                {(() => {
                                    const parentGroups: Record<string, { key: string; label: string }[]> = {};
                                    columns.forEach(col => {
                                        if (!parentGroups[col.parent]) parentGroups[col.parent] = [];
                                        parentGroups[col.parent].push(col);
                                    });

                                    return Object.entries(parentGroups).map(([parent, cols], groupIdx, arr) =>
                                        cols.map((col, idx) => {
                                            const isLast = idx === cols.length - 1;
                                            return (
                                                <th
                                                    key={col.key}
                                                    className={`text-center p-3 font-normal text-sm text-text-dark ${isLast ? " border-r" : ""}`}
                                                >
                                                    <SortableHeader
                                                        label={col.label}
                                                        field={col.key}
                                                        sortField={sortField}
                                                        sortDirection={sortDirection}
                                                        onSort={handleSort}
                                                    />
                                                </th>
                                            );
                                        })
                                    );
                                })()}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-12">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="text-gray-500 text-lg">No data found</div>
                                            <p className="text-gray-400 text-sm">No results match your current filters</p>
                                            <Button 
                                                variant="outline" 
                                                onClick={clearAllFilters}
                                                className="mt-2"
                                            >
                                                Clear Filters
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {sortedData.map((item, index) => {
                                        const isSelected = selectedItems.includes(item.id);
                                        return (
                                            <tr
                                                key={item.id}
                                                className={`border-b hover:bg-gray-100 ${isSelected ? 'bg-background-tertiary' : 'bg-background-secondary'
                                                    }`}
                                            >
                                                <td className="sticky left-0 bg-inherit p-4 border-r">
                                                    <div className="flex items-center gap-3">
                                                        <Checkbox
                                                            checked={isSelected}
                                                            onCheckedChange={() => handleItemToggle(item.id)}
                                                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                        />
                                                        <span className="font-semibold text-sm text-text-content underline hover:no-underline cursor-pointer">
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                    {columns.map((column, idx) => {
                                                        const parentCols = columns.filter(col => col.parent === column.parent);
                                                        const isLastOfParent = parentCols[parentCols.length - 1].key === column.key;
                                                        return (
                                                            <td
                                                                key={column.key}
                                                                className={`text-center text-border-cell p-3 ${isLastOfParent ? " border-r" : ""}`}
                                                            >
                                                                <DataCell item={{ [column.key]: item[column.key] as MetricField }} field={column.key} isSelected={isSelected} />
                                                            </td>
                                                        );
                                                    })}
                                                <td className="text-center p-3">
                                                    <DataCell item={{ ctr: item.ctr as MetricField }} field="ctr" isSelected={isSelected} />
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    <tr className="bg-background-secondary border-t font-bold">
                                        <td className="bg-background-secondary sticky left-0 p-4 text-text-content border-r">
                                            Total
                                        </td>
                                        <td className="text-center p-3 text-text-content">
                                            {formatCurrency(totals.sales)}
                                        </td>
                                        <td className="text-center p-3 text-text-content">
                                            {filteredData.length > 0 ? (totals.outOfStock / filteredData.length).toFixed(1) : 0}%
                                        </td>
                                        <td className="text-center p-3 text-text-content border-r">
                                            {formatNumber(totals.totalInventory)}
                                        </td>
                                        <td className="text-center p-3 text-text-content">
                                            {filteredData.length > 0 ? (totals.averageRank / filteredData.length).toFixed(1) : 0}
                                        </td>
                                        <td className="text-center p-3 text-text-content">
                                            {formatNumber(totals.estTraffic)}
                                        </td>
                                        <td className="text-center p-3 text-text-content">
                                            {formatNumber(totals.estImpressions)}
                                        </td>
                                        <td className="text-center p-3 text-text-content">
                                            {filteredData.length > 0 ? (totals.ctr / filteredData.length).toFixed(2) : 0}%
                                        </td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
};
