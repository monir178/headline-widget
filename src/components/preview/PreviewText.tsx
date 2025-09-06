import { useHeadlineStore } from "@/store/headline-store";

export const PreviewText = () => {
  const { settings } = useHeadlineStore();
  const { text, typography, gradient, animation, effects, wordStyling } =
    settings;

  const processedText =
    wordStyling && wordStyling.length > 0
      ? text.split(/(\s+)/).map((word) => {
          const cleanWord = word.replace(/[^\w]/g, "");
          const style = wordStyling.find((s) => s.text === cleanWord);
          return { text: word, styling: style || null };
        })
      : [{ text, styling: null }];

  const baseStyle = {
    fontSize: `${typography.fontSize}px`,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight,
    textShadow: animation.textShadow ? effects.textShadow : "none",
    WebkitTextStroke: animation.outline
      ? `${effects.outlineWidth}px ${effects.outlineColor}`
      : "none",
  };

  const directionMap = {
    "→": "to right",
    "←": "to left",
    "↓": "to bottom",
    "↑": "to top",
  };

  const textStyle = gradient.enabled
    ? animation.outline
      ? {
          ...baseStyle,
          color: "transparent",
          background: "none",
          WebkitBackgroundClip: "initial",
          WebkitTextFillColor: "transparent",
          backgroundClip: "initial",
          textShadow: `
            -${effects.outlineWidth}px -${effects.outlineWidth}px 0 ${gradient.startColor},
            0px -${effects.outlineWidth}px 0 ${gradient.startColor},
            ${effects.outlineWidth}px -${effects.outlineWidth}px 0 ${gradient.startColor},
            -${effects.outlineWidth}px 0px 0 ${gradient.startColor},
            ${effects.outlineWidth}px 0px 0 ${gradient.endColor},
            ${effects.outlineWidth}px ${effects.outlineWidth}px 0 ${gradient.endColor},
            0px ${effects.outlineWidth}px 0 ${gradient.endColor},
            -${effects.outlineWidth}px ${effects.outlineWidth}px 0 ${gradient.endColor}
          `
            .replace(/\s+/g, " ")
            .trim(),
          WebkitTextStroke: "none",
        }
      : {
          ...baseStyle,
          color: "transparent",
          background: `linear-gradient(${directionMap[gradient.direction]}, ${
            gradient.startColor
          }, ${gradient.endColor})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "none",
          WebkitTextStroke: "none",
        }
    : {
        ...baseStyle,
        color: animation.outline ? "transparent" : "#ffffff",
        WebkitTextStroke: animation.outline
          ? `${effects.outlineWidth}px ${effects.outlineColor}`
          : "none",
      };

  return (
    <h1
      style={{
        ...textStyle,
        wordBreak: "keep-all",
        whiteSpace: "normal",
        lineHeight: "1.2",
      }}
      className="cursor-default select-none leading-tight">
      {processedText.map((segment, index) => {
        if (!segment.styling) {
          return <span key={index}>{segment.text}</span>;
        }

        const wordStyle: React.CSSProperties = {
          position: "relative",
          display: "inline-block",
        };

        const overlayStyles: React.CSSProperties = {};

        if (segment.styling.highlight) {
          overlayStyles.background = gradient.enabled
            ? `linear-gradient(90deg, ${gradient.startColor}40, ${gradient.endColor}40)`
            : "rgba(251, 191, 36, 0.4)";
          overlayStyles.padding = "2px 6px";
          overlayStyles.borderRadius = "6px";
          overlayStyles.color = "#ffffff";
          overlayStyles.WebkitTextFillColor = "#ffffff";
          overlayStyles.WebkitBackgroundClip = "border-box";
          overlayStyles.backgroundClip = "border-box";
        }

        if (segment.styling.underline) {
          const underlineColor = gradient.enabled
            ? gradient.endColor
            : "#06b6d4";
          overlayStyles.textDecoration = "underline";
          overlayStyles.textDecorationColor = underlineColor;
          overlayStyles.textDecorationThickness = "3px";
          overlayStyles.textUnderlineOffset = "4px";
          overlayStyles.textDecorationStyle = "solid";

          if (gradient.enabled) {
            overlayStyles.background = `linear-gradient(${
              directionMap[gradient.direction]
            }, ${gradient.startColor}, ${gradient.endColor})`;
            overlayStyles.WebkitBackgroundClip = "text";
            overlayStyles.WebkitTextFillColor = "transparent";
            overlayStyles.backgroundClip = "text";
          } else {
            overlayStyles.color = "#ffffff";
            overlayStyles.WebkitTextFillColor = "#ffffff";
          }
        }

        if (
          segment.styling.backgroundColor &&
          segment.styling.backgroundColor !== "transparent"
        ) {
          const blockColor = gradient.enabled
            ? `linear-gradient(135deg, ${gradient.startColor}, ${gradient.endColor})`
            : segment.styling.backgroundColor;

          overlayStyles.background = blockColor;
          overlayStyles.color = "#ffffff";
          overlayStyles.WebkitTextFillColor = "#ffffff";
          overlayStyles.WebkitBackgroundClip = "border-box";
          overlayStyles.backgroundClip = "border-box";
          overlayStyles.padding = "4px 8px";
          overlayStyles.borderRadius = "8px";
          overlayStyles.margin = "0 2px";
          overlayStyles.fontWeight = "600";
        }

        return (
          <span
            key={`${index}-${
              segment.styling ? JSON.stringify(segment.styling) : "unstyled"
            }`}
            style={wordStyle}>
            <span style={overlayStyles} className="inline-block">
              {segment.text}
            </span>
          </span>
        );
      })}
    </h1>
  );
};
