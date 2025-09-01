import { motion } from 'framer-motion';
import { useHeadlineStore } from '@/store/headline-store';
import { generateGradientCSS } from '@/utils/headline-utils';

export const HeadlineDisplay = () => {
  const { settings } = useHeadlineStore();
  const { text, typography, gradient, animation, effects } = settings;

  const gradientStyle = gradient.enabled
    ? {
        background: generateGradientCSS(gradient),
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }
    : {};

  const baseStyle = {
    fontSize: `${typography.fontSize}px`,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight,
    textShadow: animation.textShadow ? effects.textShadow : 'none',
    WebkitTextStroke: animation.outline
      ? `${effects.outlineWidth}px ${effects.outlineColor}`
      : 'none',
    ...gradientStyle,
  };

  const motionProps = {
    initial: animation.fadeIn ? { opacity: 0, y: 20 } : {},
    animate: animation.fadeIn ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease: "easeOut" as const },
    whileHover: animation.hoverGlow
      ? { filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.5))' }
      : {},
  };

  if (animation.perLetter) {
    const letters = text.split('');
    return (
      <div className="flex flex-wrap justify-center">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            style={baseStyle}
            initial={animation.fadeIn ? { opacity: 0, y: 20 } : {}}
            animate={animation.fadeIn ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: "easeOut" as const,
            }}
            whileHover={animation.hoverGlow
              ? { 
                  scale: 1.1, 
                  filter: 'drop-shadow(0 0 15px hsl(var(--primary) / 0.6))' 
                }
              : {}
            }
            className="cursor-default"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
    );
  }

  return (
    <motion.h1
      {...motionProps}
      style={baseStyle}
      className="text-center cursor-default select-none leading-tight"
    >
      {text}
    </motion.h1>
  );
};
