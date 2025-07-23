"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

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
        <AppSidebar />
        <SidebarInset className="min-h-screen overflow-hidden">
          <div className="bg-white flex flex-col p-5 h-full">
            <DashboardHeader />
            <Tabs defaultValue="blinkit" className="gap-0 flex-1 overflow-hidden">
              <div className="flex bg-white items-center px-3 py-2 border-x border-b border-border-secondary flex-shrink-0">
                <TabsList>
                  {tabsList.map(tab => (
                    <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1.5">
                      <img src={tab.icon} alt={tab.label} className="w-4 h-4" />
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {
                tabsList.map(tab => (
                  <TabsContent key={tab.id} value={tab.id} className="h-full overflow-hidden">
                    <HomeSection type={tab.id} />
                  </TabsContent>
                ))
              }
            </Tabs>
          </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
