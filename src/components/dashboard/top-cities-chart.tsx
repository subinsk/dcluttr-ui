import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { BaseChart } from "./base-chart"
import { useSidebar } from "../ui/sidebar"

export const TopCitiesChart = () => {
    const data = [
        {
            id: "new-delhi",
            label: "New Delhi",
            color: "var(--color-chart-purple)",
            price: 26.5,
            percentage: 35,
            changeInPercentage: 1.2,
        },
        {
            id: "mumbai",
            label: "Mumbai",
            color: "var(--color-chart-red)",
            price: 36.4,
            percentage: 23,
            changeInPercentage: -3.3,
        },
        {
            id: "west-bengal",
            label: "West Bengal",
            color: "var(--color-chart-yellow)",
            price: 12.2,
            percentage: 21,
            changeInPercentage: -2.3,
        },
        {
            id: "others",
            label: "Others",
            color: "var(--color-chart-gray)",
            price: 24.3,
            percentage: 9,
            changeInPercentage: 1.09,
        }
    ]

    const chartConfig = data.reduce((acc, item) => {
        acc[item.id] = {
            label: item.label,
            color: item.color,
        }
        return acc
    }, {} as ChartConfig)

    const totalPrice = data.reduce((acc, item) => acc + item.price, 0)

    const chartData = [{
        id: "top-cities",
        ...data.reduce((acc, item) => {
            acc[item.id] = item.price
            return acc
        }, {} as Record<string, number>),
    }]

    const { isCollapsed } = useSidebar()

    return (
        <BaseChart title="Top Cities">
            <div className="relative h-full">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-square"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={100}
                        outerRadius={160}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 43}
                                                    className="fill-muted-foreground font-normal text-sm"
                                                >
                                                    Total
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 19}
                                                    className="fill-foreground text-lg font-bold"
                                                >
                                                    ₹{totalPrice.toLocaleString()}L
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 0}
                                                    className={`${data.reduce((acc, item) => acc + item.changeInPercentage, 0) > 0 ? "fill-primary" : "fill-destructive"} text-sm`}
                                                >
                                                    {data.reduce((acc, item) => acc + item.changeInPercentage, 0).toFixed(2)}%
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        {
                            data.map((item) => (
                                <RadialBar
                                    key={item.id}
                                    dataKey={item.id}
                                    stackId="a"
                                    cornerRadius={0}
                                    fill={item.color}
                                    className="stroke-transparent stroke-2"
                                />
                            ))
                        }
                    </RadialBarChart>
                </ChartContainer>
                <div className={`absolute ${isCollapsed ? "bottom-3" : "-bottom-6"} left-0 right-0 flex flex-col gap-2 px-3 py-2`}>
                    {
                        data.map((item) => (
                            <div key={item.id} className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm font-normal text-text-tertiary">{item.label}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm font-bold mr-1">
                                        ₹{item.price.toLocaleString()}L
                                    </span>
                                    <span className="mr-1 text-sm bg-background-muted text-text-tertiary p-0.5 rounded w-10 flex items-center justify-center">
                                        {item.percentage}%
                                    </span>
                                    <div className="flex items-center">
                                        {item.changeInPercentage > 0 ? (
                                            <ArrowUpIcon className="w-4 h-4 text-primary" />
                                        ) : (
                                            <ArrowDownIcon className="w-4 h-4 text-destructive" />
                                        )}
                                        <span className={`w-9 justify-end flex text-xs ${item.changeInPercentage > 0 ? "text-primary" : "text-destructive"}`}>
                                            {Math.abs(item.changeInPercentage).toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </BaseChart>
    )
}