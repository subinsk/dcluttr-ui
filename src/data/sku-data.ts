import { DataItem } from '@/components/data-table';

export const skuData: DataItem[] = [
  {
    id: "protein-bar",
    name: "Protein Bar 100g",
    sales: { current: 93132.12, previous: 87532.12, change: 6.4 },
    outOfStock: { current: 1.68, previous: 2.1, change: -20.0 },
    totalInventory: { current: 931.9, previous: 845.3, change: 10.2 },
    averageRank: { current: 3.2, previous: 4.1, change: -21.9 },
    estTraffic: { current: 12303, previous: 11203, change: 9.8 },
    estImpressions: { current: 25005, previous: 23105, change: 8.2 },
    ctr: { current: 1.90, previous: 1.75, change: 8.6 }
  },
  {
    id: "choco-bar",
    name: "Choco Bar 100g",
    sales: { current: 8526.32, previous: 8331.45, change: 2.3 },
    outOfStock: { current: 6.79, previous: 6.63, change: 2.4 },
    totalInventory: { current: 679, previous: 663, change: 2.4 },
    averageRank: { current: 7, previous: 6.8, change: 2.9 },
    estTraffic: { current: 3005, previous: 2936, change: 2.4 },
    estImpressions: { current: 4231, previous: 4131, change: 2.4 },
    ctr: { current: 1.50, previous: 1.56, change: -3.8 }
  },
  {
    id: "sku-3",
    name: "SKU 3",
    sales: { current: 9313, previous: 8900, change: 4.6 },
    outOfStock: { current: 1.68, previous: 1.5, change: 12.0 },
    totalInventory: { current: 931.9, previous: 900, change: 3.5 },
    averageRank: { current: 11, previous: 10, change: 10.0 },
    estTraffic: { current: 1931.9, previous: 1850, change: 4.4 },
    estImpressions: { current: 931.9, previous: 900, change: 3.5 },
    ctr: { current: 1.90, previous: 1.80, change: 5.6 }
  },
  {
    id: "sku-4",
    name: "SKU 4",
    sales: { current: 0, previous: 0, change: 0 },
    outOfStock: { current: 0, previous: 0, change: 0 },
    totalInventory: { current: 0, previous: 0, change: 0 },
    averageRank: { current: 0, previous: 0, change: 0 },
    estTraffic: { current: 0, previous: 0, change: 0 },
    estImpressions: { current: 0, previous: 0, change: 0 },
    ctr: { current: 0, previous: 0, change: 0 }
  }
];
