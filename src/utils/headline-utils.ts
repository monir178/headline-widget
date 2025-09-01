import type { HeadlineSettings, ExportData } from '@/types/headline';

export const generateGradientCSS = (gradient: HeadlineSettings['gradient']): string => {
  if (!gradient.enabled) return '';

  const directionMap = {
    '→': 'to right',
    '←': 'to left',
    '↓': 'to bottom',
    '↑': 'to top'
  };

  return `linear-gradient(${directionMap[gradient.direction]}, ${gradient.startColor}, ${gradient.endColor})`;
};

export const processTextWithStyling = (text: string, wordStyling: HeadlineSettings['wordStyling']): string => {
  let processedText = text;

  wordStyling.forEach((style, index) => {
    if (style.text && text.includes(style.text)) {
      const styledText = `<span class="word-styling-${index}">${style.text}</span>`;
      processedText = processedText.replace(style.text, styledText);
    }
  });

  return processedText;
};

export const generateEmbedCode = (settings: HeadlineSettings): string => {
  const css = `
    .headline-widget {
      font-family: ${settings.typography.fontFamily};
      font-size: ${settings.typography.fontSize}px;
      font-weight: ${settings.typography.fontWeight};
      ${settings.gradient.enabled ? `background: ${generateGradientCSS(settings.gradient)}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;` : ''}
      ${settings.animation.fadeIn ? 'animation: fadeIn 0.8s ease-in;' : ''}
      ${settings.animation.hoverGlow ? 'transition: all 0.3s ease;' : ''}
      ${settings.animation.textShadow ? `text-shadow: ${settings.effects.textShadow};` : ''}
      ${settings.animation.outline ? `-webkit-text-stroke: ${settings.effects.outlineWidth}px ${settings.effects.outlineColor};` : ''}
    }
    
    ${settings.animation.fadeIn ? `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }` : ''}
    
    ${settings.animation.hoverGlow ? `
    .headline-widget:hover {
      filter: drop-shadow(0 0 20px hsl(var(--primary) / 0.5));
      transform: scale(1.02);
    }` : ''}
  `;

  return `<style>${css}</style><div class="headline-widget">${settings.text}</div>`;
};

export const exportSettings = (settings: HeadlineSettings): ExportData => {
  return {
    settings,
    embedCode: generateEmbedCode(settings),
    timestamp: new Date().toISOString()
  };
};

export const downloadJSON = (data: ExportData, filename: string = 'headline-settings.json') => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
