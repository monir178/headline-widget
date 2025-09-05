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

const fontFamilies = [
  {
    value: "'Bebas Neue', Impact, Arial, sans-serif",
    label: "Bebas Neue",
    category: "Ultra Condensed",
  },
  {
    value: "'Orbitron', 'Courier New', monospace",
    label: "Orbitron",
    category: "Futuristic",
  },
  {
    value: "Impact, 'Arial Black', Arial, sans-serif",
    label: "Impact",
    category: "Bold & Wide",
  },
  {
    value: "Georgia, 'Times New Roman', serif",
    label: "Georgia",
    category: "Classic Serif",
  },
  {
    value: "'Courier New', Courier, monospace",
    label: "Courier New",
    category: "Monospace",
  },
  {
    value: "'Trebuchet MS', Arial, sans-serif",
    label: "Trebuchet MS",
    category: "Modern Sans",
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

export const TypographyControls = () => {
  const { settings, updateSettings, updateTypography } = useHeadlineStore();
  const { text, typography } = settings;

  return (
    <div className="space-y-6">
      {/* Text Content */}
      <div className="space-y-3">
        <Label
          htmlFor="headline-text"
          className="text-sm font-medium text-white/80">
          Headline Text
        </Label>
        <Input
          id="headline-text"
          value={text}
          onChange={(e) => updateSettings({ text: e.target.value })}
          placeholder="Enter your amazing headline..."
          className="text-base"
        />
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
          onValueChange={(value) => updateTypography({ fontFamily: value })}>
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
            {fontWeights.map((weight) => (
              <SelectItem key={weight.value} value={weight.value.toString()}>
                <span
                  style={{
                    fontWeight: weight.value,
                    fontFamily: typography.fontFamily,
                  }}
                  className="text-sm">
                  {weight.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
