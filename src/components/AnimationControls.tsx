import { useHeadlineStore } from "@/store/headline-store";
import { ControlSection } from "./ControlPanel";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const AnimationControls = () => {
  const { settings, updateAnimation } = useHeadlineStore();
  const { animation } = settings;

  return (
    <ControlSection title="✨ Animations & Effects">
      <div className="space-y-4">
        {/* Fade In Animation */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="fade-in" className="font-medium">
              Fade In Animation
            </Label>
            <p className="text-xs text-muted-foreground">
              Smooth entrance effect
            </p>
          </div>
          <Switch
            id="fade-in"
            checked={animation.fadeIn}
            onCheckedChange={(fadeIn) => updateAnimation({ fadeIn })}
          />
        </div>

        <Separator />

        {/* Hover Glow */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="hover-glow" className="font-medium">
              Hover Glow
            </Label>
            <p className="text-xs text-muted-foreground">
              Glow effect on hover
            </p>
          </div>
          <Switch
            id="hover-glow"
            checked={animation.hoverGlow}
            onCheckedChange={(hoverGlow) => updateAnimation({ hoverGlow })}
          />
        </div>

        <Separator />

        {/* Per Letter Animation */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="per-letter">Per Letter Animation</Label>
            <p className="text-xs text-muted-foreground">
              Animate each letter individually
            </p>
          </div>
          <Switch
            id="per-letter"
            checked={animation.perLetter}
            onCheckedChange={(perLetter) => updateAnimation({ perLetter })}
          />
        </div>

        <Separator />

        {/* Text Shadow */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="text-shadow">Text Shadow</Label>
            <p className="text-xs text-muted-foreground">
              Add depth with shadow
            </p>
          </div>
          <Switch
            id="text-shadow"
            checked={animation.textShadow}
            onCheckedChange={(textShadow) => updateAnimation({ textShadow })}
          />
        </div>

        <Separator />

        {/* Text Outline */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="text-outline">Text Outline</Label>
            <p className="text-xs text-muted-foreground">
              Add text stroke outline
            </p>
          </div>
          <Switch
            id="text-outline"
            checked={animation.outline}
            onCheckedChange={(outline) => updateAnimation({ outline })}
          />
        </div>
      </div>
    </ControlSection>
  );
};
