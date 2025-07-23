import React, { JSX, useState } from "react"
import { Check, ChevronRight, ChevronsLeft, ChevronsUpDown, Plus, Settings, Users } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "./ui/button";

const data: {
    navMain: {
        title: string
        url: string
        icon?: React.ElementType | JSX.Element
        items?: {
            title: string
            url: string
            icon?: React.ElementType | JSX.Element
        }[]
    }[]
    navSecondary: {
        title: string
        url: string
        icon: React.ElementType | JSX.Element
    }[]
} = {
    navMain: [
        {
            title: "Overview",
            url: "#",
            icon: <Icon className="text-gray-600" icon="lsicon:house-outline" />,
        },
        {
            title: "Channels",
            url: "#",
            icon: <Icon className="text-gray-600" icon="iconoir:presentation" />,
            items: [
                {
                    title: "Meta Ads",
                    url: "#",
                },
                {
                    title: "Google Ads",
                    url: "#",
                },
                {
                    title: "Quick Commerce",
                    url: "#",
                },
            ],
        },
        {
            title: "Creatives",
            url: "#",
            icon: <Icon className="text-gray-600" icon="ph:images-square-light" />,
        }
    ],
    navSecondary: [
        {
            title: "Help",
            url: "#",
            icon: <Icon className="text-gray-600" icon="carbon:help" />,
        },
        {
            title: "Settings",
            url: "#",
            icon: <Settings className="w-6 h-6 text-gray-600" />,
        },
    ],
}

const brands = [
    {
        value: "test_brand_1",
        label: "Test Brand 1",
    },
    {
        value: "test_brand_2",
        label: "Test Brand 2",
    },
    {
        value: "test_brand_3",
        label: "Test Brand 3",
    },
]

const sidebarBrands = [
    {
        id: 'mamaearth',
        label: 'Mamaearth',
        icon: '/brands/mamaearth.png'
    },
    {
        id: 'boat',
        label: 'Boat',
        icon: '/brands/boat.png'
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    const [open, setOpen] = useState(false)
    const [selectedBrand, setSelectedBrand] = useState("test_brand_1")
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <Sidebar {...props} isCollapsed={isCollapsed} className={`transition-all duration-300 ${isCollapsed ? 'w-20' : ''}`}>
            <SidebarContent className="gap-0">
                <div className="flex h-full">
                    {/* First Column */}
                    <div className="flex flex-col bg-white h-full items-center justify-between pt-5 pb-2 w-full">
                        <div className="flex flex-col items-center">
                            {isCollapsed && (
                                <div className="flex items-center mb-2">
                                    <ChevronsLeft
                                        className="w-6 h-6 cursor-pointer text-primary rotate-180"
                                        onClick={() => setIsCollapsed(!isCollapsed)}
                                    />
                                </div>
                            )}
                            <div className="flex items-center justify-center bg-white">
                                <div className="flex rounded-lg border-2 border-primary min-h-10 min-w-10">
                                    <Image
                                        src="/brands/perfora_brand.png"
                                        alt="Brand Logo"
                                        width={40}
                                        height={40}
                                        className="rounded-md"
                                        priority
                                    />
                                </div>
                            </div>
                            {
                                sidebarBrands.map((brand) => (
                                    <div key={brand.id} className="flex items-center p-1.5">
                                        <div className="rounded-xl cursor-pointer border">
                                            <Image
                                                src={brand.icon}
                                                alt={brand.label}
                                                width={40}
                                                height={40}
                                                className="rounded-xl"
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="flex items-center p-1.5">
                                <div className="rounded-xl cursor-pointer border flex items-center justify-center p-2.5 hover:bg-gray-100">
                                    <Plus className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <Users className="w-5 h-5 text-gray-600 cursor-pointer" />
                            <div className="cursor-pointer bg-brand-secondary text-white font-semibold text-xs flex items-center justify-center rounded-full h-7 w-7">
                                SS
                            </div>
                        </div>
                    </div>

                    {/* Second column */}
                    {
                        !isCollapsed &&
                        <div className="flex flex-col w-full">
                            <div className="bg-white border-gray-200 pl-1.5 pt-5.5 pb-5 pr-3">
                                <div className="flex items-center gap-4">
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-[180px] justify-between p-1.5"
                                            >
                                                {selectedBrand
                                                    ? <div className="flex items-center gap-2">
                                                        <div className="bg-brand-primary text-white text-xs font-semibold px-1.5 py-1 rounded">
                                                            {
                                                                `${brands.find((framework) => framework.value === selectedBrand)?.value.slice(0, 2).toUpperCase()}`
                                                            }
                                                        </div> {brands.find((framework) => framework.value === selectedBrand)?.label}</div>
                                                    : "Select brand..."}
                                                <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandList>
                                                    <CommandGroup>
                                                        {brands.map((framework) => (
                                                            <CommandItem
                                                                key={framework.value}
                                                                value={framework.value}
                                                                onSelect={(currentValue) => {
                                                                    setSelectedBrand(currentValue === selectedBrand ? "" : currentValue)
                                                                    setOpen(false)
                                                                }}
                                                            >
                                                                <div className="bg-brand-primary text-white text-xs font-semibold px-1.5 py-1 rounded">
                                                                    {
                                                                        `${framework.value.slice(0, 2).toUpperCase()}`
                                                                    }
                                                                </div>
                                                                {framework.label}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        selectedBrand === framework.value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <ChevronsLeft
                                        className="w-6 h-6 cursor-pointer text-primary ml-auto"
                                        onClick={() => setIsCollapsed(!isCollapsed)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-between w-full h-full">
                                <SidebarGroup className="px-4 py-6.5">
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {data.navMain.map((item) => (
                                                !item.items ? (
                                                    <SidebarMenuItem key={item.title}>
                                                        <SidebarMenuButton
                                                            asChild
                                                            isActive={pathname === item.url}
                                                            className="w-full justify-start"
                                                        >
                                                            <a href={item.url} className="flex items-center gap-2 w-full">
                                                                {
                                                                    item.icon
                                                                        ? React.isValidElement(item.icon)
                                                                            ? item.icon
                                                                            : typeof item.icon === "function"
                                                                                ? React.createElement(item.icon)
                                                                                : null
                                                                        : null
                                                                }
                                                                {item.title}
                                                            </a>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                ) : (
                                                    <Collapsible
                                                        key={item.title}
                                                        defaultOpen
                                                        className="group/collapsible"
                                                    >
                                                        <SidebarMenuItem>
                                                            <SidebarGroupLabel
                                                                asChild
                                                                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                                                            >
                                                                <CollapsibleTrigger className="flex items-center gap-2 w-full">
                                                                    {
                                                                        item.icon
                                                                            ? React.isValidElement(item.icon)
                                                                                ? item.icon
                                                                                : typeof item.icon === "function"
                                                                                    ? React.createElement(item.icon)
                                                                                    : null
                                                                            : null
                                                                    }
                                                                    {item.title}
                                                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                                                </CollapsibleTrigger>
                                                            </SidebarGroupLabel>
                                                        </SidebarMenuItem>
                                                        {item.items &&
                                                            <CollapsibleContent>
                                                                <SidebarGroupContent className="pl-4">
                                                                    {item.items.map((subItem) => (
                                                                        <SidebarMenuItem key={subItem.title}>
                                                                            <SidebarMenuButton asChild isActive={pathname === subItem.url} className="w-full justify-start">
                                                                                <a href={subItem.url} className="flex items-center gap-2 w-full">
                                                                                    {subItem.title}
                                                                                </a>
                                                                            </SidebarMenuButton>
                                                                        </SidebarMenuItem>
                                                                    ))}
                                                                </SidebarGroupContent>
                                                            </CollapsibleContent>
                                                        }
                                                    </Collapsible>
                                                )
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                                <SidebarGroup className="mt-auto">
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {data.navSecondary.map((item) => (
                                                <SidebarMenuItem key={item.title}>
                                                    <SidebarMenuButton asChild className="w-full justify-start">
                                                        <a href={item.url} className="flex items-center gap-2 w-full">
                                                            {
                                                                item.icon
                                                                    ? React.isValidElement(item.icon)
                                                                        ? item.icon
                                                                        : typeof item.icon === "function"
                                                                            ? React.createElement(item.icon)
                                                                            : null
                                                                    : null
                                                            }
                                                            {item.title}
                                                        </a>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            </div>
                        </div>
                    }
                </div>
            </SidebarContent>
        </Sidebar>
    )
}
