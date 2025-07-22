import { SalesChart } from "@/components/dashboard/sales-chart"
import { TopCitiesChart } from "@/components/dashboard/top-cities-chart"
import { TotalQuantitySoldChart } from "@/components/dashboard/total-quantity-sold-chart"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, Badge, HelpCircle, LineChart, PieChart } from "lucide-react"

export const DataSection = () => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <div className="cols-span-1 h-full">
        <SalesChart />
      </div>
      <div className="cols-span-1 h-full">
        <TotalQuantitySoldChart/>
      </div>
      <div className="cols-span-1 h-full">
       <TopCitiesChart/>
      </div>
    </div>
  )
}