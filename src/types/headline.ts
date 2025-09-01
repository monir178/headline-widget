export interface TypographySettings {
    fontSize: number;
    fontFamily: string;
    fontWeight: number;
}

export interface GradientSettings {
    enabled: boolean;
    direction: '→' | '←' | '↓' | '↑';
    startColor: string;
    endColor: string;
}

export interface WordStyling {
    text: string;
    highlight: boolean;
    underline: boolean;
    backgroundColor: string;
}

export interface HeadlineSettings {
    text: string;
    typography: TypographySettings;
    gradient: GradientSettings;
    wordStyling: WordStyling[];
    animation: {
        fadeIn: boolean;
        hoverGlow: boolean;
        perLetter: boolean;
        textShadow: boolean;
        outline: boolean;
    };
    effects: {
        textShadow: string;
        outlineColor: string;
        outlineWidth: number;
    };
}

export interface ExportData {
    settings: HeadlineSettings;
    embedCode: string;
    timestamp: string;
}
