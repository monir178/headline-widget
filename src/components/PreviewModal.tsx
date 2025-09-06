import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Monitor,
  Smartphone,
  Tablet,
  Twitter,
  Linkedin,
  Instagram,
  Eye,
} from "lucide-react";
import { useHeadlineStore } from "@/store/headline-store";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PreviewMode =
  | "desktop"
  | "tablet"
  | "mobile"
  | "twitter"
  | "linkedin"
  | "instagram";

export const PreviewModal = ({ isOpen, onClose }: PreviewModalProps) => {
  const { settings } = useHeadlineStore();
  const [activeMode, setActiveMode] = useState<PreviewMode>("desktop");

  // Clean text-only component for previews
  const PreviewText = () => {
    const { text, typography, gradient, animation, effects, wordStyling } =
      settings;

    // Process text for word styling
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

  const previewModes = [
    {
      id: "desktop" as PreviewMode,
      name: "Desktop",
      icon: Monitor,
      description: "Full desktop view",
      color: "blue",
    },
    {
      id: "tablet" as PreviewMode,
      name: "Tablet",
      icon: Tablet,
      description: "iPad/Tablet view",
      color: "purple",
    },
    {
      id: "mobile" as PreviewMode,
      name: "Mobile",
      icon: Smartphone,
      description: "iPhone/Android view",
      color: "green",
    },
    {
      id: "twitter" as PreviewMode,
      name: "Twitter",
      icon: Twitter,
      description: "Twitter post preview",
      color: "sky",
    },
    {
      id: "linkedin" as PreviewMode,
      name: "LinkedIn",
      icon: Linkedin,
      description: "LinkedIn post preview",
      color: "blue",
    },
    {
      id: "instagram" as PreviewMode,
      name: "Instagram",
      icon: Instagram,
      description: "Instagram story preview",
      color: "pink",
    },
  ];

  const getPreviewContent = () => {
    switch (activeMode) {
      case "desktop":
        return (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto scrollbar-hide">
            <div className="p-2 sm:p-4 md:p-6 lg:p-8 min-h-full flex items-center justify-center">
              <div className="w-full max-w-[280px] sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
                <PreviewText />
              </div>
            </div>
          </div>
        );

      case "tablet":
        return (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto scrollbar-hide">
            <div className="p-2 sm:p-3 md:p-4 lg:p-6 min-h-full flex items-center justify-center">
              <div className="w-full max-w-[240px] sm:max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                <PreviewText />
              </div>
            </div>
          </div>
        );

      case "mobile":
        return (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto scrollbar-hide">
            <div className="p-1.5 sm:p-2 md:p-3 lg:p-4 min-h-full flex items-center justify-center">
              <div className="w-full max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-md">
                <PreviewText />
              </div>
            </div>
          </div>
        );

      case "twitter":
        return (
          <div className="w-full h-full bg-white overflow-y-auto scrollbar-hide">
            <div className="p-2 sm:p-3 md:p-4 lg:p-6 min-h-full flex items-center justify-center">
              <div className="w-full max-w-[260px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border border-gray-200 p-2 sm:p-3 md:p-4 lg:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Twitter className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                      Your Brand
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      @yourbrand
                    </div>
                  </div>
                </div>
                <div className="text-gray-900">
                  <PreviewText />
                </div>
                <div className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm text-gray-500">
                  2h
                </div>
              </div>
            </div>
          </div>
        );

      case "linkedin":
        return (
          <div className="w-full h-full bg-gray-50 overflow-y-auto scrollbar-hide">
            <div className="p-2 sm:p-3 md:p-4 lg:p-6 min-h-full flex items-center justify-center">
              <div className="w-full max-w-[260px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-3 md:p-4 lg:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                      Your Name
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Professional Title
                    </div>
                  </div>
                </div>
                <div className="text-gray-900">
                  <PreviewText />
                </div>
                <div className="mt-2 sm:mt-3 md:mt-4 flex items-center gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm text-gray-500">
                  <span>👍 12</span>
                  <span>💬 3</span>
                  <span>🔄 1</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "instagram":
        return (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 overflow-y-auto scrollbar-hide">
            <div className="p-2 sm:p-3 md:p-4 lg:p-6 min-h-full flex items-center justify-center">
              <div className="w-full max-w-[240px] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-2 sm:p-3 md:p-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Instagram className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                        yourbrand
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4 md:p-6 bg-white">
                  <PreviewText />
                </div>
                <div className="p-2 sm:p-3 md:p-4 border-t border-gray-200">
                  <div className="flex items-center gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm text-gray-500">
                    <span>❤️ 24</span>
                    <span>💬 5</span>
                    <span>📤</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getPreviewContainer = () => {
    if (activeMode === "mobile") {
      return (
        <div className="flex items-center justify-center p-1 sm:p-2 md:p-4 lg:p-6 h-full">
          <div className="relative">
            {/* Custom iPhone-style mockup - Larger for mobile devices */}
            <div className="relative w-[240px] h-[480px] sm:w-[280px] sm:h-[560px] md:w-[320px] md:h-[640px] lg:w-[360px] lg:h-[720px] xl:w-[400px] xl:h-[800px] bg-gray-800 rounded-[48px] sm:rounded-[56px] md:rounded-[64px] lg:rounded-[72px] xl:rounded-[80px] p-2 sm:p-2.5 md:p-3 lg:p-3.5 xl:p-4 shadow-2xl">
              {/* iPhone frame */}
              <div className="w-full h-full bg-black rounded-[44px] sm:rounded-[52px] md:rounded-[60px] lg:rounded-[68px] xl:rounded-[76px] overflow-hidden relative">
                {/* Dynamic Island - Better responsive */}
                <div className="absolute top-3 sm:top-4 md:top-5 lg:top-6 xl:top-7 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-4 sm:h-5 md:h-6 lg:h-7 xl:h-8 bg-black rounded-full z-10"></div>

                {/* Screen content - Scrollable */}
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto scrollbar-hide">
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 min-h-full flex items-center justify-center">
                    <div className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[300px] xl:max-w-[340px]">
                      <PreviewText />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Home indicator - Better responsive */}
            <div className="absolute bottom-2 sm:bottom-2.5 md:bottom-3 lg:bottom-3.5 xl:bottom-4 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-1 sm:h-1 md:h-1.5 lg:h-1.5 xl:h-2 bg-white/30 rounded-full"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 bg-none overflow-hidden rounded-3xl border-none">
        {getPreviewContent()}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-2 md:p-4">
            <div className="glass-panel w-full max-w-[95vw] sm:max-w-2xl md:max-w-4xl lg:max-w-6xl max-h-[98vh] sm:max-h-[90vh] overflow-hidden border border-white/20 rounded-xl sm:rounded-2xl md:rounded-3xl">
              {/* Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-white/10">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-orange-500/20 rounded-lg">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-white/90">
                      Preview Modes
                    </h2>
                    <p className="text-xs sm:text-sm text-white/60 hidden sm:block">
                      See how your headline looks on different devices and
                      platforms
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col sm:flex-row h-[calc(98vh-80px)] sm:h-[calc(90vh-120px)] overflow-hidden">
                {/* Preview Mode Selector */}
                <div className="w-full sm:w-48 lg:w-64 p-2 sm:p-3 lg:p-4 border-b sm:border-b-0 sm:border-r border-white/10 overflow-y-auto flex-shrink-0">
                  <div className="space-y-1 sm:space-y-2">
                    {previewModes.map((mode) => {
                      const Icon = mode.icon;
                      const isActive = activeMode === mode.id;

                      return (
                        <motion.button
                          key={mode.id}
                          onClick={() => setActiveMode(mode.id)}
                          className={`w-full p-2 sm:p-3 rounded-lg transition-all duration-200 text-left ${
                            isActive
                              ? "bg-orange-500/20 text-orange-400 border border-orange-400/30"
                              : "bg-white/5 text-white/70 hover:bg-white/10 border border-transparent"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}>
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                            <div>
                              <div className="text-xs sm:text-sm font-medium">
                                {mode.name}
                              </div>
                              <div className="text-xs text-white/60 hidden sm:block">
                                {mode.description}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 p-1 sm:p-2 md:p-4 lg:p-6 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMode}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full min-h-[400px]">
                      {getPreviewContainer()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
