import { DataTable } from '@/components/data-table';
import { skuData } from '@/data/sku-data';
import { Icon } from '@iconify/react';

export const SKULevelTable = () => {
  return (
    <DataTable
      title="SKU level data"
      description="Analytics for all your SKUs"
      data={skuData}
      entityName="SKU"
      entityIcon={<Icon icon="ph:chart-line" className="w-6 h-6" />}
      entityNamePlural="SKUs"
      defaultSelected={["protein-bar", "choco-bar"]}
    />
  );
};
