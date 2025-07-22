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
        <div className="py-6 h-full flex flex-col gap-12">
            <DataSection />

            <SKULevelTable />

            <CityLevelTable />
        </div>
    )
}