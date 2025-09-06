import type { HeadlineSettings } from '@/types/headline';

export interface ImportResult {
    success: boolean;
    data?: HeadlineSettings;
    error?: string;
}

export const parseJSONImport = (jsonString: string): ImportResult => {
    try {
        const parsed = JSON.parse(jsonString);

        if (!parsed.settings) {
            return {
                success: false,
                error: "Invalid JSON format. Expected 'settings' property."
            };
        }

        const settings = parsed.settings;
        const requiredProps = ['text', 'typography', 'gradient', 'wordStyling', 'animation', 'effects'];
        for (const prop of requiredProps) {
            if (!settings[prop]) {
                return {
                    success: false,
                    error: `Missing required property: ${prop}`
                };
            }
        }

        // Validate typography
        if (!settings.typography.fontSize || !settings.typography.fontFamily || !settings.typography.fontWeight) {
            return {
                success: false,
                error: "Invalid typography settings. Missing fontSize, fontFamily, or fontWeight."
            };
        }

        // Validate gradient
        if (typeof settings.gradient.enabled !== 'boolean' || !settings.gradient.direction || !settings.gradient.startColor || !settings.gradient.endColor) {
            return {
                success: false,
                error: "Invalid gradient settings. Missing required gradient properties."
            };
        }

        // Validate animation
        const animationProps = ['fadeIn', 'hoverGlow', 'perLetter', 'textShadow', 'outline'];
        for (const prop of animationProps) {
            if (typeof settings.animation[prop] !== 'boolean') {
                return {
                    success: false,
                    error: `Invalid animation settings. ${prop} must be a boolean.`
                };
            }
        }

        // Validate effects
        if (!settings.effects.textShadow || !settings.effects.outlineColor || typeof settings.effects.outlineWidth !== 'number') {
            return {
                success: false,
                error: "Invalid effects settings. Missing or invalid effects properties."
            };
        }

        return {
            success: true,
            data: settings as HeadlineSettings
        };

    } catch (error) {
        return {
            success: false,
            error: "Invalid JSON format. Please check your JSON syntax."
        };
    }
};

export const parseCSSImport = (cssString: string): ImportResult => {
    try {
        // Extract headline text from CSS (this is a simplified parser)
        const textMatch = cssString.match(/\.headline-widget[^}]*{([^}]*)}/);
        if (!textMatch) {
            return {
                success: false,
                error: "No valid headline CSS found. Please provide CSS with .headline-widget class."
            };
        }

        // Extract font-family
        const fontFamilyMatch = cssString.match(/font-family:\s*([^;]+);/);
        const fontFamily = fontFamilyMatch ? fontFamilyMatch[1].trim().replace(/['"]/g, '') : "Inter, system-ui, sans-serif";

        // Extract font-size
        const fontSizeMatch = cssString.match(/font-size:\s*(\d+)px;/);
        const fontSize = fontSizeMatch ? parseInt(fontSizeMatch[1]) : 56;

        // Extract font-weight
        const fontWeightMatch = cssString.match(/font-weight:\s*(\d+);/);
        const fontWeight = fontWeightMatch ? parseInt(fontWeightMatch[1]) : 700;

        // Extract gradient colors
        const gradientMatch = cssString.match(/background:\s*linear-gradient\([^,]+,\s*([^,]+),\s*([^)]+)\)/);
        let gradient = {
            enabled: false,
            direction: '→' as const,
            startColor: '#cb3cff',
            endColor: '#00d5ff'
        };

        if (gradientMatch) {
            gradient = {
                enabled: true,
                direction: '→',
                startColor: gradientMatch[1].trim(),
                endColor: gradientMatch[2].trim()
            };
        }

        // Extract text shadow
        const textShadowMatch = cssString.match(/text-shadow:\s*([^;]+);/);
        const textShadow = textShadowMatch ? textShadowMatch[1].trim() : '0 0 20px rgba(59, 130, 246, 0.6)';

        // Extract outline
        const outlineMatch = cssString.match(/-webkit-text-stroke:\s*(\d+)px\s*([^;]+);/);
        const outline = {
            enabled: !!outlineMatch,
            color: outlineMatch ? outlineMatch[2].trim() : '#ffffff',
            width: outlineMatch ? parseInt(outlineMatch[1]) : 1
        };

        // Create settings object
        const settings: HeadlineSettings = {
            text: "Imported Headline", // Default text since CSS doesn't contain text
            typography: {
                fontSize,
                fontFamily,
                fontWeight
            },
            gradient,
            wordStyling: [],
            animation: {
                fadeIn: cssString.includes('animation:') || cssString.includes('@keyframes'),
                hoverGlow: cssString.includes(':hover'),
                perLetter: cssString.includes('span') && cssString.includes('animation'),
                textShadow: !!textShadowMatch,
                outline: outline.enabled
            },
            effects: {
                textShadow,
                outlineColor: outline.color,
                outlineWidth: outline.width
            }
        };

        return {
            success: true,
            data: settings
        };

    } catch (error) {
        return {
            success: false,
            error: "Failed to parse CSS. Please ensure it's valid CSS with headline styling."
        };
    }
};

export const validateImportedSettings = (settings: HeadlineSettings): ImportResult => {
    // Additional validation for imported settings
    if (settings.typography.fontSize < 8 || settings.typography.fontSize > 200) {
        return {
            success: false,
            error: "Font size must be between 8px and 200px."
        };
    }

    if (settings.typography.fontWeight < 100 || settings.typography.fontWeight > 900) {
        return {
            success: false,
            error: "Font weight must be between 100 and 900."
        };
    }

    if (settings.effects.outlineWidth < 0 || settings.effects.outlineWidth > 10) {
        return {
            success: false,
            error: "Outline width must be between 0 and 10px."
        };
    }

    return {
        success: true,
        data: settings
    };
};
