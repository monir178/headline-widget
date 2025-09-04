import { motion } from "framer-motion";
import { useHeadlineStore } from "@/store/headline-store";

export const HeadlineDisplay = () => {
  const { settings } = useHeadlineStore();
  const { text, typography, gradient, animation, effects, wordStyling } =
    settings;

  console.log("HeadlineDisplay render:", {
    text,
    gradient,
    typography,
    wordStyling,
  });

  // Process text with word styling
  const processTextWithStyling = (inputText: string) => {
    if (!wordStyling || wordStyling.length === 0) {
      return [{ text: inputText, styling: null }];
    }

    const words = inputText.split(/(\s+)/); // Keep whitespace in the split
    return words.map((word) => {
      const cleanWord = word.replace(/[^\w]/g, ""); // Remove punctuation for matching
      const style = wordStyling.find((s) => s.text === cleanWord);
      return { text: word, styling: style || null };
    });
  };

  const processedText = processTextWithStyling(text);

  const baseStyle = {
    fontSize: `${typography.fontSize}px`,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight,
    textShadow: animation.textShadow ? effects.textShadow : "none",
    WebkitTextStroke: animation.outline
      ? `${effects.outlineWidth}px ${effects.outlineColor}`
      : "none",
  };

  // Create a unique key for all visual changes to force re-render
  const gradientKey = `${
    gradient.enabled
      ? `${gradient.startColor}-${gradient.endColor}-${gradient.direction}`
      : "no-gradient"
  }-${animation.textShadow}-${animation.outline}-${animation.hoverGlow}`;

  // Simple gradient implementation with proper direction support
  const directionMap = {
    "→": "to right",
    "←": "to left",
    "↓": "to bottom",
    "↑": "to top",
  };

  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const createMinimalisticGlow = () => {
    if (!gradient.enabled) {
      return `drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 8px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.4))`;
    }

    const startGlow = hexToRgba(gradient.startColor, 0.4);
    const endGlow = hexToRgba(gradient.endColor, 0.3);

    return `drop-shadow(0 0 12px ${startGlow}) drop-shadow(0 0 18px ${endGlow})`;
  };

  // Get base filter (text shadow) that should persist
  const getBaseFilter = () => {
    if (gradient.enabled && animation.textShadow) {
      return "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))";
    }
    return "none";
  };

  // Combine base filter with hover glow
  const getCombinedFilter = (isHover: boolean) => {
    const baseFilter = getBaseFilter();
    const glowFilter =
      isHover && animation.hoverGlow ? createMinimalisticGlow() : "";

    if (baseFilter !== "none" && glowFilter) {
      return `${baseFilter} ${glowFilter}`;
    } else if (baseFilter !== "none") {
      return baseFilter;
    } else if (glowFilter) {
      return glowFilter;
    }
    return "none";
  };

  const textStyle = gradient.enabled
    ? animation.outline
      ? {
          // When gradient + outline: transparent text with gradient outline using multiple shadows
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
            ${effects.outlineWidth}px 0px 0 ${gradient.endColor},
            ${effects.outlineWidth}px ${effects.outlineWidth}px 0 ${gradient.endColor},
            0px ${effects.outlineWidth}px 0 ${gradient.endColor},
            -${effects.outlineWidth}px ${effects.outlineWidth}px 0 ${gradient.endColor},
            -${effects.outlineWidth}px 0px 0 ${gradient.startColor}
          `
            .replace(/\s+/g, " ")
            .trim(),
          WebkitTextStroke: "none",
          filter: getCombinedFilter(false),
        }
      : {
          // When gradient only: show gradient fill, no outline
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
          filter: getCombinedFilter(false),
        }
    : {
        ...baseStyle,
        // When gradient is off and outline is on, make text transparent to show white outline
        color: animation.outline ? "transparent" : "#ffffff",
        WebkitTextStroke: animation.outline
          ? `${effects.outlineWidth}px ${effects.outlineColor}`
          : "none",
        filter: getCombinedFilter(false),
      };

  console.log("Final textStyle:", textStyle);

  const motionProps = {
    initial: animation.fadeIn ? { opacity: 0, y: 20 } : {},
    animate: animation.fadeIn ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease: "easeOut" as const },
    style: {
      ...textStyle,
      transition: animation.hoverGlow
        ? "filter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        : "none",
    },
    onMouseEnter: animation.hoverGlow
      ? (e: React.MouseEvent<HTMLElement>) => {
          e.currentTarget.style.filter = getCombinedFilter(true);
        }
      : undefined,
    onMouseLeave: animation.hoverGlow
      ? (e: React.MouseEvent<HTMLElement>) => {
          e.currentTarget.style.filter = getCombinedFilter(false);
        }
      : undefined,
  };

  if (animation.perLetter) {
    const letters = text.split("");

    return (
      <div
        key={gradientKey}
        className="flex flex-wrap justify-center group"
        style={{
          transition: animation.hoverGlow
            ? "filter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            : "none",
          filter: getCombinedFilter(false),
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          if (animation.hoverGlow) {
            e.currentTarget.style.filter = getCombinedFilter(true);
          }
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
          if (animation.hoverGlow) {
            e.currentTarget.style.filter = getCombinedFilter(false);
          }
        }}>
        {letters.map((letter, index) => {
          // Calculate each letter's position in the gradient based on direction
          let progress = 0;

          if (letters.length > 1) {
            switch (gradient.direction) {
              case "→": // Left to Right
                progress = index / (letters.length - 1);
                break;
              case "←": // Right to Left
                progress = (letters.length - 1 - index) / (letters.length - 1);
                break;
              case "↓": // Top to Bottom - start color at top, end color at bottom
                progress = 0; // All letters get start color for top-to-bottom
                break;
              case "↑": // Bottom to Top - end color at top, start color at bottom
                progress = 1; // All letters get end color for bottom-to-top
                break;
              default:
                progress = index / (letters.length - 1);
            }
          }

          // For vertical gradients, we need to use CSS gradient instead of per-letter colors
          const getLetterStyle = () => {
            const baseLetterStyle = {
              fontSize: `${typography.fontSize}px`,
              fontFamily: typography.fontFamily,
              fontWeight: typography.fontWeight,
              textShadow: animation.textShadow ? effects.textShadow : "none",
            };

            if (!gradient.enabled) {
              return {
                ...baseLetterStyle,
                // When gradient is off and outline is on, make text transparent to show white outline
                color: animation.outline ? "transparent" : "#ffffff",
                WebkitTextStroke: animation.outline
                  ? `${effects.outlineWidth}px ${effects.outlineColor}`
                  : "none",
              };
            }

            // For vertical directions, use background gradient
            if (gradient.direction === "↓" || gradient.direction === "↑") {
              return animation.outline
                ? {
                    // Outline mode: transparent text with gradient outline using shadows
                    ...baseLetterStyle,
                    color: "transparent",
                    background: "none",
                    WebkitBackgroundClip: "initial",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "initial",
                    textShadow: `
                      -${effects.outlineWidth}px -${effects.outlineWidth}px 0 ${gradient.startColor},
                      0px -${effects.outlineWidth}px 0 ${gradient.startColor},
                      ${effects.outlineWidth}px -${effects.outlineWidth}px 0 ${gradient.startColor},
                      ${effects.outlineWidth}px 0px 0 ${gradient.endColor},
                      ${effects.outlineWidth}px ${effects.outlineWidth}px 0 ${gradient.endColor},
                      0px ${effects.outlineWidth}px 0 ${gradient.endColor},
                      -${effects.outlineWidth}px ${effects.outlineWidth}px 0 ${gradient.endColor},
                      -${effects.outlineWidth}px 0px 0 ${gradient.startColor}
                    `
                      .replace(/\s+/g, " ")
                      .trim(),
                    WebkitTextStroke: "none",
                  }
                : {
                    // Gradient fill mode: show gradient text
                    ...baseLetterStyle,
                    color: "transparent",
                    background: `linear-gradient(${
                      directionMap[gradient.direction]
                    }, ${gradient.startColor}, ${gradient.endColor})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                    WebkitTextStroke: "none",
                  };
            }

            // For horizontal directions, use calculated color
            const startColor = gradient.startColor;
            const endColor = gradient.endColor;

            // Convert hex to RGB
            const hexToRgb = (hex: string) => {
              const r = parseInt(hex.slice(1, 3), 16);
              const g = parseInt(hex.slice(3, 5), 16);
              const b = parseInt(hex.slice(5, 7), 16);
              return { r, g, b };
            };

            const start = hexToRgb(startColor);
            const end = hexToRgb(endColor);

            // Interpolate RGB values
            const r = Math.round(start.r + (end.r - start.r) * progress);
            const g = Math.round(start.g + (end.g - start.g) * progress);
            const b = Math.round(start.b + (end.b - start.b) * progress);

            return {
              ...baseLetterStyle,
              color: animation.outline
                ? "transparent"
                : `rgb(${r}, ${g}, ${b})`,
              // Simple stroke outline like gradient-off mode, but using gradient start color
              textShadow: "none",
              WebkitTextStroke: animation.outline
                ? `${effects.outlineWidth}px ${gradient.startColor}`
                : "none",
            };
          };

          return (
            <motion.span
              key={`${index}-${gradientKey}`}
              style={getLetterStyle()}
              initial={animation.fadeIn ? { opacity: 0, y: 20 } : {}}
              animate={animation.fadeIn ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut" as const,
              }}
              className="cursor-default">
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          );
        })}
      </div>
    );
  }

  // Render with word styling
  return (
    <motion.h1
      key={gradientKey}
      initial={motionProps.initial}
      animate={motionProps.animate}
      transition={motionProps.transition}
      style={{
        ...motionProps.style,
        background:
          gradient.enabled && !animation.outline
            ? `linear-gradient(${directionMap[gradient.direction]}, ${
                gradient.startColor
              }, ${gradient.endColor})`
            : "none",
      }}
      onMouseEnter={motionProps.onMouseEnter}
      onMouseLeave={motionProps.onMouseLeave}
      className="text-center cursor-default select-none leading-tight">
      {processedText.map((segment, index) => {
        if (!segment.styling) {
          return <span key={index}>{segment.text}</span>;
        }

        const wordStyle: React.CSSProperties = {};

        if (segment.styling.highlight) {
          wordStyle.backgroundColor = "rgba(251, 191, 36, 0.3)"; // Yellow highlight
          wordStyle.padding = "2px 4px";
          wordStyle.borderRadius = "4px";
        }

        if (segment.styling.underline) {
          wordStyle.textDecoration = "underline";
          wordStyle.textDecorationColor = "#06b6d4"; // Cyan underline
          wordStyle.textDecorationThickness = "2px";
          wordStyle.textUnderlineOffset = "4px";
        }

        if (
          segment.styling.backgroundColor &&
          segment.styling.backgroundColor !== "transparent"
        ) {
          wordStyle.backgroundColor = segment.styling.backgroundColor;
          wordStyle.padding = "4px 8px";
          wordStyle.borderRadius = "6px";
          wordStyle.margin = "0 2px";
        }

        return (
          <span key={index} style={wordStyle}>
            {segment.text}
          </span>
        );
      })}
    </motion.h1>
  );
};
