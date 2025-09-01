import { useHeadlineStore } from '@/store/headline-store';
import { ControlSection } from './ControlPanel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const fontFamilies = [
  { value: 'Inter, system-ui, sans-serif', label: 'Inter' },
  { value: 'system-ui, sans-serif', label: 'System UI' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: '"Times New Roman", serif', label: 'Times New Roman' },
  { value: '"Courier New", monospace', label: 'Courier New' },
  { value: '"Helvetica Neue", sans-serif', label: 'Helvetica' },
  { value: 'Arial, sans-serif', label: 'Arial' },
];

const fontWeights = [
  { value: 100, label: 'Thin (100)' },
  { value: 200, label: 'Extra Light (200)' },
  { value: 300, label: 'Light (300)' },
  { value: 400, label: 'Normal (400)' },
  { value: 500, label: 'Medium (500)' },
  { value: 600, label: 'Semi Bold (600)' },
  { value: 700, label: 'Bold (700)' },
  { value: 800, label: 'Extra Bold (800)' },
  { value: 900, label: 'Black (900)' },
];

export const TypographyControls = () => {
  const { settings, updateSettings, updateTypography } = useHeadlineStore();
  const { text, typography } = settings;

  return (
    <>
      <ControlSection title="Text Content">
        <div className="space-y-2">
          <Label htmlFor="headline-text">Headline Text</Label>
          <Input
            id="headline-text"
            value={text}
            onChange={(e) => updateSettings({ text: e.target.value })}
            placeholder="Enter your headline..."
          />
        </div>
      </ControlSection>

      <ControlSection title="Typography">
        <div className="space-y-4">
          {/* Font Size */}
          <div className="space-y-2">
            <Label>Font Size: {typography.fontSize}px</Label>
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
          <div className="space-y-2">
            <Label>Font Family</Label>
            <Select
              value={typography.fontFamily}
              onValueChange={(value) => updateTypography({ fontFamily: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Weight */}
          <div className="space-y-2">
            <Label>Font Weight</Label>
            <Select
              value={typography.fontWeight.toString()}
              onValueChange={(value) => updateTypography({ fontWeight: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontWeights.map((weight) => (
                  <SelectItem key={weight.value} value={weight.value.toString()}>
                    {weight.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </ControlSection>
    </>
  );
};
