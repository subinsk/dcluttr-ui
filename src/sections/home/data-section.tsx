import { SalesChart } from "@/components/dashboard/sales-chart"
import { TopCitiesChart } from "@/components/dashboard/top-cities-chart"
import { TotalQuantitySoldChart } from "@/components/dashboard/total-quantity-sold-chart"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, Badge, HelpCircle, LineChart, PieChart } from "lucide-react"

export const DataSection = () => {
  return (
    <div className="flex items-center flex-wrap gap-4 mr-auto">
      <div className="h-full">
        <SalesChart />
      </div>
      <div className="h-full">
        <TotalQuantitySoldChart/>
      </div>
      <div className="h-full">
       <TopCitiesChart/>
      </div>
    </div>
  )
}