import { useHeadlineStore } from "@/store/headline-store";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-6">
      {/* Gradient Toggle */}
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="space-y-1">
          <Label
            htmlFor="gradient-enabled"
            className="font-medium text-white/80">
            Enable Gradient
          </Label>
          <p className="text-xs text-white/60">Apply gradient colors</p>
        </div>
        <Switch
          id="gradient-enabled"
          checked={gradient.enabled}
          onCheckedChange={(enabled) => {
            if (enabled) {
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
            <Label className="text-sm font-medium text-white/80">
              Direction
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {directions.map(({ value, icon: Icon, label }) => (
                <Button
                  key={value}
                  variant={gradient.direction === value ? "default" : "outline"}
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
            <Label className="text-sm font-medium text-white/80">Colors</Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={gradient.startColor}
                  onChange={(e) =>
                    updateGradient({ startColor: e.target.value })
                  }
                  className="w-8 h-8 rounded-lg cursor-pointer color-input"
                />
                <span className="text-xs text-white/60">Start</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={gradient.endColor}
                  onChange={(e) => updateGradient({ endColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer color-input"
                />
                <span className="text-xs text-white/60">End</span>
              </div>
            </div>
          </div>

          {/* Gradient Preview */}
          <div className="space-y-2">
            <Label className="text-xs text-white/60">Preview</Label>
            <div
              className="h-6 rounded-lg border border-white/20"
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
  );
};
