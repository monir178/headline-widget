import { motion } from "framer-motion";
import { useHeadlineStore } from "@/store/headline-store";
import { generateGradientCSS } from "@/utils/headline-utils";

export const HeadlineDisplay = () => {
  const { settings } = useHeadlineStore();
  const { text, typography, gradient, animation, effects } = settings;

  const baseStyle: React.CSSProperties = {
    fontSize: `${typography.fontSize}px`,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight,
    textShadow: animation.textShadow ? effects.textShadow : "none",
    WebkitTextStroke: animation.outline
      ? `${effects.outlineWidth}px ${effects.outlineColor}`
      : "none",
  };

  // Apply gradient or regular color styles separately to avoid conflicts
  const gradientStyle: React.CSSProperties = gradient.enabled
    ? {
        background: generateGradientCSS(gradient),
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }
    : {
        color: "#ffffff",
      };

  const motionProps = {
    initial: animation.fadeIn ? { opacity: 0, y: 20 } : {},
    animate: animation.fadeIn ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, ease: "easeOut" as const },
    whileHover: animation.hoverGlow
      ? {
          filter: "drop-shadow(0 0 12px rgba(59, 130, 246, 0.4))",
          scale: 1.01,
        }
      : {},
  };

  const finalStyle = { ...baseStyle, ...gradientStyle };

  if (animation.perLetter) {
    const letters = text.split("");
    return (
      <div className="flex flex-wrap justify-center">
        {letters.map((letter, index) => (
          <motion.span
            key={`${index}-${gradient.enabled}`}
            style={finalStyle}
            initial={animation.fadeIn ? { opacity: 0, y: 20 } : {}}
            animate={animation.fadeIn ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: "easeOut" as const,
            }}
            whileHover={
              animation.hoverGlow
                ? {
                    scale: 1.05,
                    filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
                  }
                : {}
            }
            className="cursor-default">
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
    );
  }

  return (
    <motion.h1
      {...motionProps}
      key={`headline-${gradient.enabled}`}
      style={finalStyle}
      className="text-center cursor-default select-none leading-tight">
      {text}
    </motion.h1>
  );
};
