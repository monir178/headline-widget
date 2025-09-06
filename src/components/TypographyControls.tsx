import { useHeadlineStore } from "@/store/headline-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { memo } from "react";

const fontFamilies = [
  {
    value: "'Bebas Neue', Impact, Arial, sans-serif",
    label: "Bebas Neue",
    category: "Ultra Condensed",
    availableWeights: [400], // Only 400 available
  },
  {
    value: "'Orbitron', 'Courier New', monospace",
    label: "Orbitron",
    category: "Futuristic",
    availableWeights: [400, 700, 900], // 400, 700, 900 available
  },
  {
    value: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    label: "Inter",
    category: "Modern Sans",
    availableWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900], // All weights available
  },
  {
    value: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
    label: "Roboto",
    category: "Clean Sans",
    availableWeights: [100, 300, 400, 500, 700, 900], // 100, 300, 400, 500, 700, 900 available
  },
  {
    value: "Impact, 'Arial Black', Arial, sans-serif",
    label: "Impact",
    category: "Bold & Wide",
    availableWeights: [400], // Only 400 available
  },
  {
    value: "Georgia, 'Times New Roman', serif",
    label: "Georgia",
    category: "Classic Serif",
    availableWeights: [400, 700], // 400, 700 available
  },
  {
    value: "'Courier New', Courier, monospace",
    label: "Courier New",
    category: "Monospace",
    availableWeights: [400, 700], // 400, 700 available
  },
  {
    value: "'Trebuchet MS', Arial, sans-serif",
    label: "Trebuchet MS",
    category: "Modern Sans",
    availableWeights: [400, 700], // 400, 700 available
  },
];

const fontWeights = [
  { value: 100, label: "Thin (100)" },
  { value: 200, label: "Extra Light (200)" },
  { value: 300, label: "Light (300)" },
  { value: 400, label: "Normal (400)" },
  { value: 500, label: "Medium (500)" },
  { value: 600, label: "Semi Bold (600)" },
  { value: 700, label: "Bold (700)" },
  { value: 800, label: "Extra Bold (800)" },
  { value: 900, label: "Black (900)" },
];

const MAX_CHARACTERS = 50;

export const TypographyControls = memo(() => {
  const { settings, updateSettings, updateTypography } = useHeadlineStore();
  const { text, typography } = settings;

  // Handle font family change and adjust weight if needed
  const handleFontFamilyChange = (fontFamily: string) => {
    const selectedFont = fontFamilies.find((f) => f.value === fontFamily);
    const availableWeights = selectedFont?.availableWeights || [400];

    // If current weight is not available for the new font, set to the first available weight
    if (!availableWeights.includes(typography.fontWeight)) {
      updateTypography({
        fontFamily,
        fontWeight: availableWeights[0],
      });
    } else {
      updateTypography({ fontFamily });
    }
  };

  return (
    <div className="space-y-6">
      {/* Text Content */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="headline-text"
            className="text-sm font-medium text-white/80">
            Headline Text
          </Label>
          <div
            className={`px-2 py-1 rounded-lg text-xs font-mono transition-colors ${
              text.length > MAX_CHARACTERS
                ? "bg-red-500/20 text-red-400"
                : text.length > MAX_CHARACTERS * 0.8
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-white/10 text-white/70"
            }`}>
            {text.length}/{MAX_CHARACTERS}
          </div>
        </div>
        <Input
          id="headline-text"
          value={text}
          onChange={(e) => {
            const newText = e.target.value;
            if (newText.length <= MAX_CHARACTERS) {
              updateSettings({ text: newText });
            }
          }}
          placeholder="Enter your amazing headline..."
          className={`text-base transition-colors ${
            text.length > MAX_CHARACTERS
              ? "border-red-500/50 focus:border-red-500"
              : text.length > MAX_CHARACTERS * 0.8
              ? "border-yellow-500/50 focus:border-yellow-500"
              : ""
          }`}
          maxLength={MAX_CHARACTERS}
        />
        {text.length > MAX_CHARACTERS * 0.8 && (
          <p
            className={`text-xs transition-colors ${
              text.length > MAX_CHARACTERS ? "text-red-400" : "text-yellow-400"
            }`}>
            {text.length > MAX_CHARACTERS
              ? `Character limit exceeded! Please reduce by ${
                  text.length - MAX_CHARACTERS
                } characters.`
              : `Approaching character limit. ${
                  MAX_CHARACTERS - text.length
                } characters remaining.`}
          </p>
        )}
      </div>

      {/* Font Size */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-white/80">Font Size</Label>
          <div className="px-2 py-1 bg-white/10 rounded-lg text-xs font-mono text-white/70">
            {typography.fontSize}px
          </div>
        </div>
        <Slider
          value={[typography.fontSize]}
          onValueChange={(value) => updateTypography({ fontSize: value[0] })}
          min={12}
          max={120}
          step={1}
          className="w-full"
        />
      </div>

      {/* Font Family */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-white/80">Font Family</Label>
        <Select
          value={typography.fontFamily}
          onValueChange={handleFontFamilyChange}>
          <SelectTrigger className="w-full">
            <SelectValue>
              <span style={{ fontFamily: typography.fontFamily }}>
                {fontFamilies.find((f) => f.value === typography.fontFamily)
                  ?.label || "Select Font"}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {fontFamilies.map((font) => {
              const isActive = typography.fontFamily === font.value;
              return (
                <SelectItem key={font.value} value={font.value}>
                  <div className="flex flex-col items-start gap-1">
                    <span
                      style={{ fontFamily: font.value }}
                      className={`font-medium text-sm transition-colors ${
                        isActive ? "text-blue-400" : "text-white"
                      }`}>
                      {font.label}
                    </span>
                    <span
                      className={`text-xs transition-colors ${
                        isActive ? "text-blue-300/70" : "text-muted-foreground"
                      }`}>
                      {font.category}
                    </span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Font Weight */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-white/80">Font Weight</Label>
        <Select
          value={typography.fontWeight.toString()}
          onValueChange={(value) =>
            updateTypography({ fontWeight: parseInt(value) })
          }>
          <SelectTrigger className="w-full">
            <SelectValue>
              <span
                style={{
                  fontWeight: typography.fontWeight,
                  fontFamily: typography.fontFamily,
                }}>
                {fontWeights.find((w) => w.value === typography.fontWeight)
                  ?.label || "Select Weight"}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {(() => {
              // Get available weights for the current font
              const currentFont = fontFamilies.find(
                (f) => f.value === typography.fontFamily
              );
              const availableWeights = currentFont?.availableWeights || [400];

              return fontWeights
                .filter((weight) => availableWeights.includes(weight.value))
                .map((weight) => (
                  <SelectItem
                    key={weight.value}
                    value={weight.value.toString()}>
                    <span
                      style={{
                        fontWeight: weight.value,
                        fontFamily: typography.fontFamily,
                      }}
                      className="text-sm">
                      {weight.label}
                    </span>
                  </SelectItem>
                ));
            })()}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
});
