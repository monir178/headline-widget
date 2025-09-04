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
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <div className="space-y-1">
            <Label
              htmlFor="gradient-enabled"
              className="font-medium text-slate-200">
              Enable Gradient
            </Label>
            <p className="text-xs text-slate-400">
              Apply gradient colors to text
            </p>
          </div>
          <Switch
            id="gradient-enabled"
            checked={gradient.enabled}
            onCheckedChange={(enabled) => {
              if (enabled) {
                // Set default gradient colors when enabling gradient
                updateGradient({
                  enabled,
                  startColor: "#cb3cff",
                  endColor: "#00d5ff",
                });
              } else {
                updateGradient({ enabled });
              }
            }}
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
                      value={gradient.startColor}
                      onChange={(e) =>
                        updateGradient({ startColor: e.target.value })
                      }
                      className="w-10 h-10 rounded-full  cursor-pointer color-input"
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
                      value={gradient.endColor}
                      onChange={(e) =>
                        updateGradient({ endColor: e.target.value })
                      }
                      className="w-10 h-10 rounded-2xl border-2 border-white/20 cursor-pointer color-input"
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
