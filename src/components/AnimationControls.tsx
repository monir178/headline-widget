import { useHeadlineStore } from "@/store/headline-store";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const AnimationControls = () => {
  const { settings, updateAnimation } = useHeadlineStore();
  const { animation } = settings;

  const animationOptions = [
    {
      id: "fade-in",
      label: "Fade In",
      description: "Smooth entrance",
      checked: animation.fadeIn,
      onChange: (fadeIn: boolean) => updateAnimation({ fadeIn }),
    },
    {
      id: "hover-glow",
      label: "Hover Glow",
      description: "Glow on hover",
      checked: animation.hoverGlow,
      onChange: (hoverGlow: boolean) => updateAnimation({ hoverGlow }),
    },
    {
      id: "per-letter",
      label: "Per Letter",
      description: "Letter by letter",
      checked: animation.perLetter,
      onChange: (perLetter: boolean) => updateAnimation({ perLetter }),
    },
    {
      id: "text-shadow",
      label: "Text Shadow",
      description: "Add depth",
      checked: animation.textShadow,
      onChange: (textShadow: boolean) => updateAnimation({ textShadow }),
    },
    {
      id: "text-outline",
      label: "Text Outline",
      description: "Stroke outline",
      checked: animation.outline,
      onChange: (outline: boolean) => updateAnimation({ outline }),
    },
  ];

  return (
    <div className="space-y-3">
      {animationOptions.map((option) => (
        <div
          key={option.id}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
          <div className="space-y-1">
            <Label
              htmlFor={option.id}
              className="font-medium text-white/80 text-sm">
              {option.label}
            </Label>
            <p className="text-xs text-white/60">{option.description}</p>
          </div>
          <Switch
            id={option.id}
            checked={option.checked}
            onCheckedChange={option.onChange}
          />
        </div>
      ))}
    </div>
  );
};
