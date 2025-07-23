"use client"

import { ReactNode } from "react";
import { ArrowUp, HelpCircle } from "lucide-react";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { useSidebar } from "../ui/sidebar";

interface BaseChartProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const BaseChart = ({ title, children, className = "" }: BaseChartProps) => {
  const { isCollapsed } = useSidebar()

  return (
    <Card className={`p-0 gap-0 max-h-full ${isCollapsed ? 'w-[350px]' : 'w-[272px]'} ${isCollapsed ? 'h-[390px]' : 'h-[345px]'} ${className} border-border-light`}>
      <CardHeader className="flex items-center p-3 justify-between">
        <CardTitle className="text-text-placeholder text-sm">{title}</CardTitle>
        <CardAction>
          <HelpCircle className="w-4 h-4 text-text-primary" />
        </CardAction>
      </CardHeader>
      <Separator />
      <CardContent className="w-full p-0">
        {children}
      </CardContent>
    </Card>
  );
};
