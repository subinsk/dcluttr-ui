export type MetricField = { current: number; previous: number; change: number };
export type MetricKeys =
  | "sales"
  | "outOfStock"
  | "totalInventory"
  | "averageRank"
  | "estTraffic"
  | "estImpressions"
  | "ctr";
export interface DataItem {
  id: string;
  name: string;
  sales: { current: number; previous: number; change: number };
  outOfStock: { current: number; previous: number; change: number };
  totalInventory: { current: number; previous: number; change: number };
  averageRank: { current: number; previous: number; change: number };
  estTraffic: { current: number; previous: number; change: number };
  estImpressions: { current: number; previous: number; change: number };
  ctr: { current: number; previous: number; change: number };
  [key: string]: { current: number; previous: number; change: number } | string;
}

export interface FilterState {
  salesMin: string;
  salesMax: string;
  inventoryMin: string;
  inventoryMax: string;
  trafficMin: string;
  trafficMax: string;
  rankMin: string;
  rankMax: string;
  ctrMin: string;
  ctrMax: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
}

export interface TableHeaderGroup {
  label: string;
  columns: TableColumn[];
  colSpan?: number;
}
