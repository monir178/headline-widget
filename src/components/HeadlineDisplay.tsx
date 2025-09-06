import { motion } from "framer-motion";
import { useHeadlineStore } from "@/store/headline-store";
import { useMemo, useCallback, useEffect, useState, useRef } from "react";

const MAX_CHARACTERS = 100;

interface CSSPropertiesWithVars extends React.CSSProperties {
  "--dynamic-font-size"?: string;
}

export const HeadlineDisplay = () => {
  const { settings } = useHeadlineStore();
  const { text, typography, gradient, animation, effects, wordStyling } =
    settings;

  const prevTextRef = useRef(text);
  const prevPerLetterRef = useRef(animation.perLetter);
  const [isInitialAnimation, setIsInitialAnimation] = useState(false);
  useEffect(() => {
    if (animation.perLetter) {
      if (!prevPerLetterRef.current) {
        setIsInitialAnimation(true);

        const animationDuration = Math.max(1000, text.length * 50 + 1000);
        const timer = setTimeout(() => {
          setIsInitialAnimation(false);
        }, animationDuration);

        prevPerLetterRef.current = true;
        prevTextRef.current = text;
        return () => clearTimeout(timer);
      }
      if (text !== prevTextRef.current) {
        prevTextRef.current = text;
      }
    } else {
      prevTextRef.current = text;
      prevPerLetterRef.current = false;
    }
  }, [text, animation.perLetter]);

  // Memoize text processing for performance
  const processedText = useMemo(() => {
    if (!wordStyling || wordStyling.length === 0) {
      return [{ text, styling: null }];
    }

    const words = text.split(/(\s+)/); // Keep whitespace in the split
    return words.map((word) => {
      const cleanWord = word.replace(/[^\w]/g, ""); // Remove punctuation for matching
      const style = wordStyling.find((s) => s.text === cleanWord);
      return { text: word, styling: style || null };
    });
  }, [text, wordStyling]);

  const baseStyle = {
    fontSize: `${typography.fontSize}px`,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight,
    textShadow: animation.textShadow ? effects.textShadow : "none",
    WebkitTextStroke: animation.outline
      ? `${effects.outlineWidth}px ${effects.outlineColor}`
      : "none",
  };

  // Memoize keys for performance
  const gradientKey = useMemo(
    () =>
      `${
        gradient.enabled
          ? `${gradient.startColor}-${gradient.endColor}-${gradient.direction}`
          : "no-gradient"
      }-${animation.textShadow}-${animation.outline}-${animation.hoverGlow}`,
    [gradient, animation]
  );

  const fontKey = useMemo(
    () => `${typography.fontFamily}-${typography.fontWeight}`,
    [typography]
  );

  // Memoize direction map for performance
  const directionMap = useMemo(
    () => ({
      "→": "to right",
      "←": "to left",
      "↓": "to bottom",
      "↑": "to top",
    }),
    []
  );

  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Memoize filter functions for performance
  const createMinimalisticGlow = useCallback(() => {
    if (!gradient.enabled) {
      return `drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 8px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.4))`;
    }

    const startGlow = hexToRgba(gradient.startColor, 0.4);
    const endGlow = hexToRgba(gradient.endColor, 0.3);

    return `drop-shadow(0 0 12px ${startGlow}) drop-shadow(0 0 18px ${endGlow})`;
  }, [gradient]);

  const getBaseFilter = useCallback(() => {
    if (gradient.enabled && animation.textShadow) {
      return "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))";
    }
    return "none";
  }, [gradient, animation]);

  const getCombinedFilter = useCallback(
    (isHover: boolean) => {
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
    },
    [getBaseFilter, createMinimalisticGlow, animation]
  );

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

  // Memoize letter styles calculation for performance
  const letterStyles = useMemo(() => {
    if (!animation.perLetter) return [];

    const letters = text.split("");
    return letters.map((_, index) => {
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

      const baseLetterStyle = {
        fontSize: `${typography.fontSize}px`,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeight,
        textShadow: animation.textShadow ? effects.textShadow : "none",
      };

      if (!gradient.enabled) {
        return {
          ...baseLetterStyle,
          color: animation.outline ? "transparent" : "#ffffff",
          WebkitTextStroke: "none",
          textShadow: animation.outline
            ? `
                      -${effects.outlineWidth}px -${effects.outlineWidth}px 0 ${effects.outlineColor},
                      0px -${effects.outlineWidth}px 0 ${effects.outlineColor},
                      ${effects.outlineWidth}px -${effects.outlineWidth}px 0 ${effects.outlineColor},
                      -${effects.outlineWidth}px 0px 0 ${effects.outlineColor},
                      ${effects.outlineWidth}px 0px 0 ${effects.outlineColor},
                      ${effects.outlineWidth}px ${effects.outlineWidth}px 0 ${effects.outlineColor},
                      0px ${effects.outlineWidth}px 0 ${effects.outlineColor},
                      -${effects.outlineWidth}px ${effects.outlineWidth}px 0 ${effects.outlineColor}
                    `
                .replace(/\s+/g, " ")
                .trim()
            : "none",
        };
      }

      // For vertical directions, use background gradient
      if (gradient.direction === "↓" || gradient.direction === "↑") {
        return animation.outline
          ? {
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
        color: animation.outline ? "transparent" : `rgb(${r}, ${g}, ${b})`,
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
    });
  }, [text, typography, gradient, animation, effects, directionMap]);

  if (animation.perLetter) {
    return (
      <div className="glass-panel p-4 lg:p-8 text-center max-h-[60vh] sm:max-h-[65vh] lg:max-h-[70vh] overflow-y-auto scrollbar-hide">
        {/* Character limit indicator */}
        {text.length > MAX_CHARACTERS * 0.8 && (
          <div className="mb-4 flex justify-center">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                text.length > MAX_CHARACTERS
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              }`}>
              {text.length > MAX_CHARACTERS
                ? `⚠️ Text exceeds limit (${text.length}/${MAX_CHARACTERS})`
                : `📝 Approaching limit (${text.length}/${MAX_CHARACTERS})`}
            </div>
          </div>
        )}
        <div
          key={gradientKey}
          className="flex flex-wrap justify-center group"
          style={
            {
              transition: animation.hoverGlow
                ? "filter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                : "none",
              filter: getCombinedFilter(false),
              // Set CSS custom property for responsive font sizing
              "--dynamic-font-size": `${typography.fontSize}px`,
              // Prevent word breaking
              wordBreak: "keep-all",
              whiteSpace: "normal",
              lineHeight: "1.2",
            } as CSSPropertiesWithVars
          }
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
          {processedText
            .map((segment, segmentIndex) => {
              if (!segment.styling) {
                // For unstyled segments, render letters normally
                return segment.text.split("").map((letter, letterIndex) => {
                  // Calculate global index more reliably
                  let globalIndex = 0;
                  for (let i = 0; i < segmentIndex; i++) {
                    globalIndex += processedText[i].text.length;
                  }
                  globalIndex += letterIndex;
                  const letterKey = `${segmentIndex}-${letterIndex}-${letter}`;
                  const shouldAnimate = animation.perLetter;
                  const newLetterDelay = isInitialAnimation
                    ? globalIndex * 0.05
                    : 0;

                  return (
                    <span
                      key={letterKey}
                      style={{
                        ...(letterStyles[globalIndex] || {}),
                        animation: shouldAnimate
                          ? `letterAppear 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${newLetterDelay}s both`
                          : animation.fadeIn && !animation.perLetter
                          ? `fadeInUp 0.5s ease-out ${globalIndex * 0.05}s both`
                          : "none",
                      }}
                      className="cursor-default">
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  );
                });
              }

              // For styled segments, apply word styling to the entire word, not individual letters
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
                overlayStyles.boxShadow = gradient.enabled
                  ? `0 0 8px ${gradient.startColor}30, 0 0 16px ${gradient.endColor}20`
                  : "0 0 8px rgba(251, 191, 36, 0.3)";
                overlayStyles.WebkitBackgroundClip = "border-box";
                overlayStyles.backgroundClip = "border-box";
                // Don't override color if text outline is enabled
                if (!animation.outline) {
                  overlayStyles.color = "#ffffff";
                  overlayStyles.WebkitTextFillColor = "#ffffff";
                }
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
                overlayStyles.filter = `drop-shadow(0 2px 4px ${underlineColor}40)`;

                if (gradient.enabled) {
                  overlayStyles.background = `linear-gradient(${
                    directionMap[gradient.direction]
                  }, ${gradient.startColor}, ${gradient.endColor})`;
                  overlayStyles.WebkitBackgroundClip = "text";
                  overlayStyles.WebkitTextFillColor = "transparent";
                  overlayStyles.backgroundClip = "text";
                } else {
                  // Don't override color if text outline is enabled
                  if (!animation.outline) {
                    overlayStyles.color = "#ffffff";
                    overlayStyles.WebkitTextFillColor = "#ffffff";
                  }
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
                overlayStyles.WebkitBackgroundClip = "border-box";
                overlayStyles.backgroundClip = "border-box";
                overlayStyles.padding = "4px 8px";
                overlayStyles.borderRadius = "8px";
                overlayStyles.margin = "0 2px";
                overlayStyles.boxShadow = gradient.enabled
                  ? `0 0 12px ${gradient.startColor}40, 0 0 24px ${gradient.endColor}30`
                  : `0 0 12px ${segment.styling.backgroundColor}40`;
                overlayStyles.fontWeight = "600";
                // Don't override color if text outline is enabled
                if (!animation.outline) {
                  overlayStyles.color = "#ffffff";
                  overlayStyles.WebkitTextFillColor = "#ffffff";
                }
              }

              // Render the styled word with per-letter animation inside
              return (
                <span
                  key={`styled-${segmentIndex}`}
                  style={wordStyle}
                  className="cursor-default">
                  <span
                    style={{
                      ...overlayStyles,
                      // Remove underline from outer span since we apply it to each letter
                      ...(segment.styling?.underline
                        ? {
                            textDecoration: "none",
                            filter: "none",
                            background: "none",
                            WebkitBackgroundClip: "initial",
                            backgroundClip: "initial",
                          }
                        : {}),
                    }}
                    className="inline-block">
                    {segment.text.split("").map((letter, letterIndex) => {
                      // Calculate global index more reliably
                      let globalIndex = 0;
                      for (let i = 0; i < segmentIndex; i++) {
                        globalIndex += processedText[i].text.length;
                      }
                      globalIndex += letterIndex;
                      const letterKey = `${segmentIndex}-${letterIndex}-${letter}`;
                      const shouldAnimate = animation.perLetter;
                      const newLetterDelay = isInitialAnimation
                        ? globalIndex * 0.05
                        : 0;

                      // For styled words, apply styling while preserving text outline
                      const letterStyle = {
                        // Always include base letter styles for font size, weight, etc.
                        ...(letterStyles[globalIndex] || {}),
                        // For styled words, apply styling while preserving text outline
                        ...(segment.styling
                          ? {
                              // Preserve text outline from base styles
                              textShadow:
                                letterStyles[globalIndex]?.textShadow || "none",
                              WebkitTextStroke:
                                letterStyles[globalIndex]?.WebkitTextStroke ||
                                "none",
                              // Apply word styling
                              ...overlayStyles,
                            }
                          : {}),
                        animation: shouldAnimate
                          ? `letterAppear 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${newLetterDelay}s both`
                          : animation.fadeIn && !animation.perLetter
                          ? `fadeInUp 0.5s ease-out ${globalIndex * 0.05}s both`
                          : "none",
                      };

                      return (
                        <span
                          key={letterKey}
                          style={letterStyle}
                          className="cursor-default">
                          {letter === " " ? "\u00A0" : letter}
                        </span>
                      );
                    })}
                  </span>
                </span>
              );
            })
            .flat()}
        </div>
      </div>
    );
  }

  // Render with word styling
  return (
    <div className="glass-panel p-4 lg:p-8 text-center max-h-[60vh] sm:max-h-[65vh] lg:max-h-[70vh] overflow-y-auto scrollbar-hide">
      {/* Character limit indicator */}
      {text.length > MAX_CHARACTERS * 0.8 && (
        <div className="mb-4 flex justify-center">
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              text.length > MAX_CHARACTERS
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            }`}>
            {text.length > MAX_CHARACTERS
              ? `⚠️ Text exceeds limit (${text.length}/${MAX_CHARACTERS})`
              : `📝 Approaching limit (${text.length}/${MAX_CHARACTERS})`}
          </div>
        </div>
      )}
      <motion.h1
        key={`${fontKey}-${gradientKey}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ...motionProps.transition,
          duration: 0.4,
          ease: "easeInOut" as const,
        }}
        style={
          {
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
              gradient.enabled && !animation.outline
                ? "transparent"
                : "initial",
            backgroundClip:
              gradient.enabled && !animation.outline ? "text" : "initial",
            // Set CSS custom property for responsive font sizing
            "--dynamic-font-size": `${typography.fontSize}px`,
            // Prevent word breaking
            wordBreak: "keep-all",
            whiteSpace: "normal",
            lineHeight: "1.2",
          } as CSSPropertiesWithVars
        }
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

            overlayStyles.WebkitBackgroundClip = "border-box";
            overlayStyles.backgroundClip = "border-box";
            // Don't override color if text outline is enabled
            if (!animation.outline) {
              overlayStyles.color = "#ffffff";
              overlayStyles.WebkitTextFillColor = "#ffffff";
            }
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
              // Don't override color if text outline is enabled
              if (!animation.outline) {
                overlayStyles.color = "#ffffff";
                overlayStyles.WebkitTextFillColor = "#ffffff";
              }
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
            overlayStyles.WebkitBackgroundClip = "border-box";
            overlayStyles.backgroundClip = "border-box";
            overlayStyles.padding = "4px 8px";
            overlayStyles.borderRadius = "8px";
            overlayStyles.margin = "0 2px";
            overlayStyles.boxShadow = gradient.enabled
              ? `0 0 12px ${gradient.startColor}40, 0 0 24px ${gradient.endColor}30`
              : `0 0 12px ${segment.styling.backgroundColor}40`;
            overlayStyles.fontWeight = "600";
            // Don't override color if text outline is enabled
            if (!animation.outline) {
              overlayStyles.color = "#ffffff";
              overlayStyles.WebkitTextFillColor = "#ffffff";
            }
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
