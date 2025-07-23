import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpIcon } from "lucide-react"
import { DataSection } from "./data-section"
import { SKULevelTable } from "./sku-level-table"
import { CityLevelTable } from "./city-level-table"

export const HomeSection = ({
    type = "blinkit"
}: {
    type?: "blinkit" | "instamart" | "zepto"
}) => {
    return (
        <div className="h-full flex flex-col gap-6 bg-background-primary border-x border-border-secondary rounded-b-[10px] px-6 py-6 overflow-hidden">
            <div className="flex-shrink-0">
                <DataSection />
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
                <SKULevelTable />
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
                <CityLevelTable />
            </div>
        </div>
    )
}