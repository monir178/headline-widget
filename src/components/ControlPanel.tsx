import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ControlPanelProps {
  children: ReactNode;
}

export const ControlPanel = ({ children }: ControlPanelProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Headline Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Separator className="flex-1" />
      </div>
      {children}
    </div>
  );
};
