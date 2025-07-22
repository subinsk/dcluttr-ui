"use client";

import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import DateRangePicker from "@/components/ui/date-range-picker";
import { Icon } from "@iconify/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeSection } from "@/sections/home";


export default function Index() {
  const tabsList: { id: "blinkit" | "instamart" | "zepto"; label: string; icon: string }[] = [
    {
      id: 'blinkit',
      label: 'Blinkit',
      icon: '/brands/blinkit.png'
    },
    {
      id: 'zepto',
      label: 'Zepto',
      icon: '/brands/zepto.png'
    },
    {
      id: 'instamart',
      label: 'Instamart',
      icon: '/brands/instamart.png'
    }
  ]

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#FAFAFA] flex">
        <AppSidebar />
        <div className="flex-1 p-5 bg-white">
          <div className="max-w-[1112px] mx-auto bg-gray-50 border rounded-t-lg">
            <div className="bg-white rounded-t-lg">
              <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-dark-text">Quick Commerce</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="py-2 px-2 gap-2 bg-white border rounded-lg flex items-center">
                    <Icon icon="ph:chart-line" className="w-6 h-6" />
                    <Switch defaultChecked />
                  </div>
                  <DateRangePicker />
                </div>
              </div>
              <div className="flex items-center px-4 py-3">
                <Tabs defaultValue="blinkit" className="">
                  <TabsList>
                    {tabsList.map(tab => (
                      <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1.5">
                        <img src={tab.icon} alt={tab.label} className="w-4 h-4" />
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {
                    tabsList.map(tab => (
                      <TabsContent key={tab.id} value={tab.id}>
                       <HomeSection type={tab.id} />
                      </TabsContent>
                    ))
                  }
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
