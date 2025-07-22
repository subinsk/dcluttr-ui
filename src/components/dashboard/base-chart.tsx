import { ReactNode } from "react";
import { HelpCircle } from "lucide-react";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

interface BaseChartProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const BaseChart = ({ title, children, className = "" }: BaseChartProps) => {
  return (
    <Card className={`p-0 gap-0 h-full max-h-full ${className}`}>
      <CardHeader className="flex items-center p-3 justify-between">
        <CardTitle className="text-gray-600 text-sm">{title}</CardTitle>
        <CardAction>
          <HelpCircle className="w-4 h-4 text-gray-600" />
        </CardAction>
      </CardHeader>
      <Separator />
      <CardContent className="w-full p-0">
        {children}
      </CardContent>
    </Card>
  );
};
