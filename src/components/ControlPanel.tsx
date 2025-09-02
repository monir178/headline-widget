import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ControlPanelProps {
  children: ReactNode;
}

export const ControlPanel = ({ children }: ControlPanelProps) => {
  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-900/10 dark:shadow-slate-950/40">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
          🎨 Headline Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
        {children}
      </CardContent>
    </Card>
  );
};

interface ControlSectionProps {
  title: string;
  children: ReactNode;
}

export const ControlSection = ({ title, children }: ControlSectionProps) => {
  return (
    <div className="space-y-4 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/30 dark:border-slate-700/30">
      <div className="flex items-center space-x-3">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          {title}
        </h3>
        <Separator className="flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 dark:to-transparent" />
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};
