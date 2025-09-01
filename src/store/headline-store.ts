import { create } from 'zustand';
import type { HeadlineSettings } from '@/types/headline';

interface HeadlineStore {
    settings: HeadlineSettings;
    updateSettings: (newSettings: Partial<HeadlineSettings>) => void;
    updateTypography: (typography: Partial<HeadlineSettings['typography']>) => void;
    updateGradient: (gradient: Partial<HeadlineSettings['gradient']>) => void;
    updateAnimation: (animation: Partial<HeadlineSettings['animation']>) => void;
    updateEffects: (effects: Partial<HeadlineSettings['effects']>) => void;
    resetSettings: () => void;
}

const initialSettings: HeadlineSettings = {
    text: "Your Amazing Headline",
    typography: {
        fontSize: 48,
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 700,
    },
    gradient: {
        enabled: false,
        direction: '→',
        startColor: 'hsl(var(--primary))',
        endColor: 'hsl(var(--accent))',
    },
    wordStyling: [],
    animation: {
        fadeIn: true,
        hoverGlow: false,
        perLetter: false,
        textShadow: false,
        outline: false,
    },
    effects: {
        textShadow: '2px 2px 4px hsl(var(--muted-foreground) / 0.3)',
        outlineColor: 'hsl(var(--foreground))',
        outlineWidth: 1,
    },
};

export const useHeadlineStore = create<HeadlineStore>((set) => ({
    settings: initialSettings,

    updateSettings: (newSettings) =>
        set((state) => ({
            settings: { ...state.settings, ...newSettings },
        })),

    updateTypography: (typography) =>
        set((state) => ({
            settings: {
                ...state.settings,
                typography: { ...state.settings.typography, ...typography },
            },
        })),

    updateGradient: (gradient) =>
        set((state) => ({
            settings: {
                ...state.settings,
                gradient: { ...state.settings.gradient, ...gradient },
            },
        })),

    updateAnimation: (animation) =>
        set((state) => ({
            settings: {
                ...state.settings,
                animation: { ...state.settings.animation, ...animation },
            },
        })),

    updateEffects: (effects) =>
        set((state) => ({
            settings: {
                ...state.settings,
                effects: { ...state.settings.effects, ...effects },
            },
        })),

    resetSettings: () => set({ settings: initialSettings }),
}));
