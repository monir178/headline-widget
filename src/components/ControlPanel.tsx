import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ControlPanelProps {
  children: ReactNode;
}

export const ControlPanel = ({ children }: ControlPanelProps) => {
  return (
    <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-500">
      <CardHeader className="pb-6 border-b border-white/10">
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
          ✨ Headline Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 p-6">
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
    <div className="space-y-4 p-6 rounded-3xl bg-white/5 border-2 border-white/10 backdrop-blur-sm hover:bg-white/7 transition-all duration-300">
      <div className="flex items-center space-x-3">
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
          {title}
        </h3>
        <Separator className="flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};
