import { DataTable } from '@/components/data-table';
import { cityData } from '@/data/city-data';
import { Icon } from '@iconify/react';

export const CityLevelTable = () => {
  return (
    <DataTable
      title="City level data"
      description="Analytics for all your Cities"
      data={cityData}
      entityName="City"
      entityIcon={<Icon icon="ph:chart-line" className="w-6 h-6" />}
      entityNamePlural="Cities"
      defaultSelected={["delhi", "bengaluru"]}
    />
  );
};