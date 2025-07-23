import { Switch } from "@/components/ui/switch";
import DateRangePicker from "@/components/ui/date-range-picker";
import { Icon } from "@iconify/react";

export const DashboardHeader = () => {
    return (
        <div className="bg-white rounded-t-[10px] border border-border-secondary">
            <div className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-text-primary">Quick Commerce</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="py-2 px-2 gap-2 bg-white border rounded-lg flex items-center">
                        <Icon icon="ph:chart-line" className="w-5 h-5" />
                        <Switch defaultChecked className="border-border-primary border" />
                    </div>
                    <DateRangePicker />
                </div>
            </div>
        </div>
    )
}