export const formatCurrency = (value: number) => {
  if (value === 0) return "₹0";
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}k`;
  return `₹${value.toFixed(2)}`;
};

export const formatNumber = (value: number) => {
  if (value === 0) return "0";
  if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toString();
};

export const formatPercentage = (value: number) => {
  return `${value}%`;
};


type Totals = {
  sales: number;
  outOfStock: number;
  totalInventory: number;
  averageRank: number;
  estTraffic: number;
  estImpressions: number;
  ctr: number;
};

import type { DataItem, MetricKeys, MetricField } from "./types";

export const calculateTotals = (data: DataItem[]): Totals => {
  return data.reduce((acc, item) => ({
    sales: acc.sales + item.sales.current,
    outOfStock: acc.outOfStock + item.outOfStock.current,
    totalInventory: acc.totalInventory + item.totalInventory.current,
    averageRank: acc.averageRank + item.averageRank.current,
    estTraffic: acc.estTraffic + item.estTraffic.current,
    estImpressions: acc.estImpressions + item.estImpressions.current,
    ctr: acc.ctr + item.ctr.current
  }), {
    sales: 0,
    outOfStock: 0,
    totalInventory: 0,
    averageRank: 0,
    estTraffic: 0,
    estImpressions: 0,
    ctr: 0
  });
};

export const sortData = (data: DataItem[], sortField: MetricKeys, sortDirection: "asc" | "desc") => {
  if (!sortField) return data;
  return [...data].sort((a, b) => {
    const aValue = (a[sortField] as MetricField)?.current || 0;
    const bValue = (b[sortField] as MetricField)?.current || 0;
    if (sortDirection === "asc") {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });
};
