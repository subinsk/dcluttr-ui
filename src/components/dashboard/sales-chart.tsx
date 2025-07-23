"use client"

import { ArrowUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, Line, ComposedChart, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BaseChart } from "./base-chart"

export const description = "An area chart with gradient fill"

// Generate random data for the chart with Y values less than 8
const generateRandomData = () => {
  const months = ["09", "10", "11", "12", "01", "02", "03"];
  return months.map(month => ({
    month,
    currentMonth: Math.round((Math.random() * 6 + 1) * 10) / 10, // Random between 1-7
    lastMonth: Math.round((Math.random() * 6 + 1) * 10) / 10, // Random between 1-7
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

export function SalesChart() {
  return (
    <BaseChart title="Sales (MRP)" className="">
      <div className="flex items-center justify-between px-3 py-3">
        <p className="text-lg font-bold text-text-primary">
          125.49
        </p>
        <div className="flex flex-col">
          <div className="flex items-center justify-end">
            <ArrowUp className="w-4 h-4 text-text-success-icon" />
            <span className="text-sm font-bold text-text-success ml-1">2.4%</span>
          </div>
          <p className="text-sm text-text-muted">vs 119.69 last month</p>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-full w-full m-0 px-3">
        <ComposedChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 24,
            right: 24,
            top: 12,
            bottom: 12,
          }}
          className=""
        >
          <CartesianGrid vertical={false} className=""/>
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            domain={[0, 8]}
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
            type="linear"
            fill="url(#fillCurrentMonth)"
            fillOpacity={0.4}
            stroke="var(--color-currentMonth)"
            strokeWidth={2}
          />
          <Line
            dataKey="lastMonth"
            type="linear"
            stroke="var(--color-lastMonth)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            activeDot={{ r: 4 }}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </ComposedChart>
      </ChartContainer>
    </BaseChart>
  )
}
