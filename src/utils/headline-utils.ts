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
  // Generate word styling CSS
  const wordStylingCSS = settings.wordStyling.map((style, index) => {
    let css = `
    .word-styling-${index} {`;

    if (style.highlight) {
      if (settings.gradient.enabled) {
        css += `
      background: linear-gradient(90deg, ${settings.gradient.startColor}40, ${settings.gradient.endColor}40);
      box-shadow: 0 0 8px ${settings.gradient.startColor}30, 0 0 16px ${settings.gradient.endColor}20;`;
      } else {
        css += `
      background: rgba(251, 191, 36, 0.4);
      box-shadow: 0 0 8px rgba(251, 191, 36, 0.3);`;
      }
      css += `
      padding: 2px 6px;
      border-radius: 6px;`;
    }

    if (style.underline) {
      const underlineColor = settings.gradient.enabled ? settings.gradient.endColor : "#06b6d4";
      css += `
      text-decoration: underline;
      text-decoration-color: ${underlineColor};
      text-decoration-thickness: 3px;
      text-underline-offset: 4px;
      filter: drop-shadow(0 2px 4px ${underlineColor}40);`;
    }

    if (style.backgroundColor && style.backgroundColor !== "transparent") {
      if (settings.gradient.enabled) {
        css += `
      background: linear-gradient(135deg, ${settings.gradient.startColor}, ${settings.gradient.endColor});
      color: #ffffff;
      box-shadow: 0 0 12px ${settings.gradient.startColor}40, 0 0 24px ${settings.gradient.endColor}30;`;
      } else {
        css += `
      background: ${style.backgroundColor};
      color: #ffffff;
      box-shadow: 0 0 12px ${style.backgroundColor}40;`;
      }
      css += `
      padding: 4px 8px;
      border-radius: 8px;
      margin: 0 2px;
      font-weight: 600;`;
    }

    css += `
    }`;
    return css;
  }).join('\n');

  const css = `
    .headline-widget {
      font-family: ${settings.typography.fontFamily};
      font-size: ${settings.typography.fontSize}px;
      font-weight: ${settings.typography.fontWeight};
      ${settings.gradient.enabled ? `background: ${generateGradientCSS(settings.gradient)}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;` : 'color: #ffffff;'}
      ${settings.animation.fadeIn ? 'animation: fadeIn 0.8s ease-in;' : ''}
      ${settings.animation.hoverGlow ? 'transition: all 0.3s ease;' : ''}
      ${settings.animation.textShadow ? `text-shadow: ${settings.effects.textShadow};` : ''}
      ${settings.animation.outline && settings.gradient.enabled ? `
        text-shadow: 
          -${settings.effects.outlineWidth}px -${settings.effects.outlineWidth}px 0 ${settings.gradient.startColor},
          0px -${settings.effects.outlineWidth}px 0 ${settings.gradient.startColor},
          ${settings.effects.outlineWidth}px -${settings.effects.outlineWidth}px 0 ${settings.gradient.startColor},
          -${settings.effects.outlineWidth}px 0px 0 ${settings.gradient.startColor},
          ${settings.effects.outlineWidth}px 0px 0 ${settings.gradient.endColor},
          ${settings.effects.outlineWidth}px ${settings.effects.outlineWidth}px 0 ${settings.gradient.endColor},
          0px ${settings.effects.outlineWidth}px 0 ${settings.gradient.endColor},
          -${settings.effects.outlineWidth}px ${settings.effects.outlineWidth}px 0 ${settings.gradient.endColor};
      ` : settings.animation.outline ? `-webkit-text-stroke: ${settings.effects.outlineWidth}px ${settings.effects.outlineColor};` : ''}
    }
    
    ${wordStylingCSS}
    
    ${settings.animation.fadeIn ? `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }` : ''}
    
    ${settings.animation.hoverGlow ? `
    .headline-widget:hover {
      filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
      transform: scale(1.02);
    }` : ''}
    
    ${settings.animation.perLetter ? `
    .headline-widget span {
      display: inline-block;
      animation: letterFadeIn 0.6s ease-out forwards;
      opacity: 0;
    }
    
    @keyframes letterFadeIn {
      from { opacity: 0; transform: translateY(20px) scale(0.8); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    
    .headline-widget span:nth-child(1) { animation-delay: 0.08s; }
    .headline-widget span:nth-child(2) { animation-delay: 0.16s; }
    .headline-widget span:nth-child(3) { animation-delay: 0.24s; }
    .headline-widget span:nth-child(4) { animation-delay: 0.32s; }
    .headline-widget span:nth-child(5) { animation-delay: 0.40s; }
    /* Add more nth-child selectors as needed */
    ` : ''}
  `;

  const processedHTML = processTextWithStyling(settings.text, settings.wordStyling);
  return `<style>${css}</style><div class="headline-widget">${processedHTML}</div>`;
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
