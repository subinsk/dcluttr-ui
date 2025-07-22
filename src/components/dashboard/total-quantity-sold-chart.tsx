"use client"

import { ArrowUp, HelpCircle, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, Line, ComposedChart, YAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { Icon } from "@iconify/react"

export const description = "An area chart with gradient fill"

const generateRandomData = () => {
  const months = ["09", "10", "11", "12", "01", "02", "03"];
  return months.map(month => ({
    month,
    currentMonth: Math.round((Math.random() * 6 + 1) * 10) / 10,
    lastMonth: Math.round((Math.random() * 6 + 1) * 10) / 10,
  }));
};

const chartData = generateRandomData();

const chartConfig = {
  lastMonth: {
    label: "Last Month",
    color: "var(--chart-1)",
  },
  currentMonth: {
    label: "This Month",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function TotalQuantitySoldChart() {
  return (
    <Card className="p-0 gap-0 h-full max-h-full">
      <CardHeader className="flex items-center p-3 justify-between">
        <CardTitle className="text-gray-600 text-sm">Total Quantity Sold</CardTitle>
        <CardAction>
          <HelpCircle className="w-4 h-4 text-gray-600" />
        </CardAction>
      </CardHeader>
      <Separator />
      <CardContent className="w-full p-0">
        <div className="flex items-center justify-between px-3 py-3">
          <p className="text-lg font-bold text-gray-800">
            125.49
          </p>
          <div className="flex flex-col">
            <div className="flex items-center justify-end">
              <ArrowUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary ml-1">2.4%</span>
            </div>
            <p className="text-sm text-gray-600">vs 119.69 last month</p>
          </div>
        </div>
        <ChartContainer config={chartConfig} className="h-full w-full px-3 m-0">
          <ComposedChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
            className="h-full w-full p-0 m-0"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
            dataKey={"currentMonth"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              width={10}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillCurrentMonth" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-currentMonth)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-currentMonth)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="currentMonth"
              type="natural"
              fill="url(#fillCurrentMonth)"
              fillOpacity={0.4}
              stroke="var(--color-currentMonth)"
              strokeWidth={2}
            />
            <Line
              dataKey="lastMonth"
              type="natural"
              stroke="var(--color-lastMonth)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 4 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
