import { useHeadlineStore } from "@/store/headline-store";
import { ControlSection } from "./ControlPanel";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, ArrowDown, ArrowUp } from "lucide-react";

const directions = [
  { value: "→" as const, icon: ArrowRight, label: "Right" },
  { value: "←" as const, icon: ArrowLeft, label: "Left" },
  { value: "↓" as const, icon: ArrowDown, label: "Down" },
  { value: "↑" as const, icon: ArrowUp, label: "Up" },
];

export const GradientControls = () => {
  const { settings, updateGradient } = useHeadlineStore();
  const { gradient } = settings;

  return (
    <ControlSection title="🌈 Gradient">
      <div className="space-y-6">
        {/* Gradient Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
          <div className="space-y-1">
            <Label htmlFor="gradient-enabled" className="font-medium">Enable Gradient</Label>
            <p className="text-xs text-muted-foreground">Apply gradient colors to text</p>
          </div>
          <Switch
            id="gradient-enabled"
            checked={gradient.enabled}
            onCheckedChange={(enabled) => updateGradient({ enabled })}
          />
        </div>

        {gradient.enabled && (
          <>
            {/* Direction Controls */}
            <div className="space-y-3">
              <Label>Direction</Label>
              <div className="grid grid-cols-2 gap-2">
                {directions.map(({ value, icon: Icon, label }) => (
                  <Button
                    key={value}
                    variant={
                      gradient.direction === value ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => updateGradient({ direction: value })}
                    className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Pickers */}
            <div className="space-y-3">
              <Label>Colors</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs">Start Color</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={
                        gradient.startColor.includes("hsl")
                          ? "#3B82F6"
                          : gradient.startColor
                      }
                      onChange={(e) =>
                        updateGradient({ startColor: e.target.value })
                      }
                      className="w-8 h-8 rounded border border-border cursor-pointer"
                    />
                    <Badge variant="secondary" className="text-xs">
                      Start
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">End Color</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={
                        gradient.endColor.includes("hsl")
                          ? "#8B5CF6"
                          : gradient.endColor
                      }
                      onChange={(e) =>
                        updateGradient({ endColor: e.target.value })
                      }
                      className="w-8 h-8 rounded border border-border cursor-pointer"
                    />
                    <Badge variant="secondary" className="text-xs">
                      End
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Gradient Preview */}
            <div className="space-y-2">
              <Label className="text-xs">Preview</Label>
              <div
                className="h-8 rounded border border-border"
                style={{
                  background: `linear-gradient(${
                    gradient.direction === "→"
                      ? "to right"
                      : gradient.direction === "←"
                      ? "to left"
                      : gradient.direction === "↓"
                      ? "to bottom"
                      : "to top"
                  }, ${gradient.startColor}, ${gradient.endColor})`,
                }}
              />
            </div>
          </>
        )}
      </div>
    </ControlSection>
  );
};
