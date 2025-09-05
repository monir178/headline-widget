import { motion } from "framer-motion";
import { useHeadlineStore } from "@/store/headline-store";

export const HeadlineDisplay = () => {
  const { settings } = useHeadlineStore();
  const { text, typography, gradient, animation, effects, wordStyling } =
    settings;

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

  // Create a unique key for visual changes (excluding font to allow animation)
  const gradientKey = `${
    gradient.enabled
      ? `${gradient.startColor}-${gradient.endColor}-${gradient.direction}`
      : "no-gradient"
  }-${animation.textShadow}-${animation.outline}-${animation.hoverGlow}`;

  // Create a separate key for font changes to trigger smooth font transitions
  const fontKey = `${typography.fontFamily}-${typography.fontWeight}`;

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
            -${effects.outlineWidth}px 0px 0 ${gradient.startColor},
            ${effects.outlineWidth}px 0px 0 ${gradient.endColor},
            ${effects.outlineWidth}px ${effects.outlineWidth}px 0 ${gradient.endColor},
            0px ${effects.outlineWidth}px 0 ${gradient.endColor},
            -${effects.outlineWidth}px ${effects.outlineWidth}px 0 ${gradient.endColor}
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

  const motionProps = {
    initial: { opacity: 0, y: 8, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      opacity: { duration: 0.4 },
    },
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
      <div className="glass-panel p-4 lg:p-8 text-center">
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
                  progress =
                    (letters.length - 1 - index) / (letters.length - 1);
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
                // For outline mode with horizontal gradient, create gradient outline using shadows
                textShadow: animation.outline
                  ? `
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
                      .trim()
                  : "none",
                WebkitTextStroke: "none",
              };
            };

            return (
              <motion.span
                key={`${index}-${fontKey}-${gradientKey}`}
                style={getLetterStyle()}
                initial={
                  animation.perLetter
                    ? { opacity: 0, y: 20, scale: 0.8 }
                    : animation.fadeIn
                    ? { opacity: 0, y: 20 }
                    : { opacity: 0 }
                }
                animate={
                  animation.perLetter
                    ? { opacity: 1, y: 0, scale: 1 }
                    : animation.fadeIn
                    ? { opacity: 1, y: 0 }
                    : { opacity: 1 }
                }
                transition={{
                  duration: animation.perLetter ? 0.6 : 0.5,
                  delay: animation.perLetter ? index * 0.08 : index * 0.05,
                  ease: animation.perLetter ? "backOut" : ("easeOut" as const),
                  type: animation.perLetter ? "spring" : "tween",
                  bounce: animation.perLetter ? 0.4 : 0,
                }}
                className="cursor-default">
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            );
          })}
        </div>
      </div>
    );
  }

  // Render with word styling
  return (
    <div className="glass-panel p-4 lg:p-8 text-center">
      <motion.h1
        key={`${fontKey}-${gradientKey}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ...motionProps.transition,
          duration: 0.4,
          ease: "easeInOut" as const,
        }}
        style={{
          ...motionProps.style,
          // Apply gradient to the entire text container to maintain flow
          background:
            gradient.enabled && !animation.outline
              ? `linear-gradient(${directionMap[gradient.direction]}, ${
                  gradient.startColor
                }, ${gradient.endColor})`
              : "none",
          WebkitBackgroundClip:
            gradient.enabled && !animation.outline ? "text" : "initial",
          WebkitTextFillColor:
            gradient.enabled && !animation.outline ? "transparent" : "initial",
          backgroundClip:
            gradient.enabled && !animation.outline ? "text" : "initial",
        }}
        onMouseEnter={motionProps.onMouseEnter}
        onMouseLeave={motionProps.onMouseLeave}
        className="cursor-default select-none leading-tight mobile-headline">
        {processedText.map((segment, index) => {
          if (!segment.styling) {
            // For unstyled text, don't override the parent gradient
            return <span key={index}>{segment.text}</span>;
          }

          const wordStyle: React.CSSProperties = {
            position: "relative",
            display: "inline-block",
          };

          // Create overlay styles for word styling effects
          const overlayStyles: React.CSSProperties = {};

          if (segment.styling.highlight) {
            // Highlight overlay - ensure text is visible
            overlayStyles.background = gradient.enabled
              ? `linear-gradient(90deg, ${gradient.startColor}40, ${gradient.endColor}40)`
              : "rgba(251, 191, 36, 0.4)";
            overlayStyles.padding = "2px 6px";
            overlayStyles.borderRadius = "6px";
            overlayStyles.boxShadow = gradient.enabled
              ? `0 0 8px ${gradient.startColor}30, 0 0 16px ${gradient.endColor}20`
              : "0 0 8px rgba(251, 191, 36, 0.3)";

            // Force text to be visible when highlighted
            overlayStyles.color = "#ffffff";
            overlayStyles.WebkitTextFillColor = "#ffffff";
            overlayStyles.WebkitBackgroundClip = "border-box";
            overlayStyles.backgroundClip = "border-box";
          }

          if (segment.styling.underline) {
            // Underline styling - ensure text is visible
            const underlineColor = gradient.enabled
              ? gradient.endColor
              : "#06b6d4";

            overlayStyles.textDecoration = "underline";
            overlayStyles.textDecorationColor = underlineColor;
            overlayStyles.textDecorationThickness = "3px";
            overlayStyles.textUnderlineOffset = "4px";
            overlayStyles.textDecorationStyle = "solid";
            overlayStyles.filter = `drop-shadow(0 2px 4px ${underlineColor}40)`;

            // Force text to be visible when underlined
            if (gradient.enabled) {
              // Show gradient text for underlined words
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
            // Block styling - this overrides the gradient
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
            overlayStyles.boxShadow = gradient.enabled
              ? `0 0 12px ${gradient.startColor}40, 0 0 24px ${gradient.endColor}30`
              : `0 0 12px ${segment.styling.backgroundColor}40`;
            overlayStyles.fontWeight = "600";
          }

          return (
            <motion.span
              key={`${index}-${
                segment.styling ? JSON.stringify(segment.styling) : "unstyled"
              }`}
              style={wordStyle}
              initial={{
                scale: segment.styling ? 0.95 : 1,
                opacity: segment.styling ? 0.7 : 1,
                y: segment.styling ? -2 : 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: "backOut",
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              whileHover={{
                scale: segment.styling ? 1.03 : 1,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              layout>
              {/* Animated overlay for styling effects */}
              <motion.span
                style={overlayStyles}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  rotateX: -15,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: "backOut",
                  delay: 0.1,
                }}
                className="inline-block"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.15 },
                }}>
                {segment.text}
              </motion.span>
            </motion.span>
          );
        })}
      </motion.h1>
    </div>
  );
};
