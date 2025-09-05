import { useHeadlineStore } from "@/store/headline-store";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const WordStylingControls = () => {
  const { settings, updateSettings } = useHeadlineStore();
  const [selectedWord, setSelectedWord] = useState("");
  const [appliedStyle, setAppliedStyle] = useState<string | null>(null);

  // Get unique words from the headline text
  const words = settings.text
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word) => word.replace(/[^\w]/g, "")) // Remove punctuation
    .filter((word) => word.length > 0);

  const uniqueWords = [...new Set(words)];

  const applyWordStyling = (
    word: string,
    styleType: "highlight" | "underline" | "block"
  ) => {
    // Show animation feedback
    setAppliedStyle(styleType);
    setTimeout(() => setAppliedStyle(null), 1000);

    const existingStyleIndex = settings.wordStyling.findIndex(
      (style) => style.text === word
    );

    // Use gradient colors if enabled, otherwise use default colors
    const getStyleColor = () => {
      if (settings.gradient.enabled) {
        switch (styleType) {
          case "highlight":
            return "gradient"; // Will be handled in HeadlineDisplay
          case "underline":
            return "gradient"; // Will be handled in HeadlineDisplay
          case "block":
            return "gradient"; // Will be handled in HeadlineDisplay
          default:
            return "transparent";
        }
      } else {
        switch (styleType) {
          case "highlight":
            return "transparent"; // Handled by highlight flag
          case "underline":
            return "transparent"; // Handled by underline flag
          case "block":
            return "#8b5cf6"; // Purple block
          default:
            return "transparent";
        }
      }
    };

    if (existingStyleIndex >= 0) {
      // Update existing style
      const updatedStyling = [...settings.wordStyling];
      updatedStyling[existingStyleIndex] = {
        ...updatedStyling[existingStyleIndex],
        highlight: styleType === "highlight",
        underline: styleType === "underline",
        backgroundColor:
          styleType === "block" ? getStyleColor() : "transparent",
      };
      updateSettings({ wordStyling: updatedStyling });
    } else {
      // Add new style
      const newStyle = {
        text: word,
        highlight: styleType === "highlight",
        underline: styleType === "underline",
        backgroundColor:
          styleType === "block" ? getStyleColor() : "transparent",
      };
      updateSettings({
        wordStyling: [...settings.wordStyling, newStyle],
      });
    }
  };

  const removeWordStyling = (word: string) => {
    const updatedStyling = settings.wordStyling.filter(
      (style) => style.text !== word
    );
    updateSettings({ wordStyling: updatedStyling });
  };

  const getWordStyle = (word: string) => {
    return settings.wordStyling.find((style) => style.text === word);
  };

  return (
    <div className="space-y-4">
      {/* Word Selection */}
      <div className="space-y-3">
        <div className="text-sm text-white/80">Select words to style:</div>
        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto scrollbar-hide">
          {uniqueWords.map((word, index) => {
            const wordStyle = getWordStyle(word);
            const isSelected = selectedWord === word;

            return (
              <button
                key={`${word}-${index}`}
                onClick={() => setSelectedWord(isSelected ? "" : word)}
                className={`
                  px-2 py-1 rounded-lg text-xs transition-all duration-200
                  ${
                    isSelected
                      ? "bg-blue-500/30 border border-blue-400/50 text-blue-300"
                      : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                  }
                  ${wordStyle ? "ring-1 ring-purple-400/30" : ""}
                `}>
                {word}
                {wordStyle && (
                  <span className="ml-1 text-purple-400">
                    {wordStyle.highlight && "🔥"}
                    {wordStyle.underline && "_"}
                    {wordStyle.backgroundColor !== "transparent" && "⬛"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Style Controls */}
      {selectedWord && (
        <div className="space-y-3 pt-3 border-t border-white/10">
          <div className="text-xs text-white/60">Style "{selectedWord}"</div>
          <div className="grid grid-cols-3 gap-2">
            <motion.button
              onClick={() => applyWordStyling(selectedWord, "highlight")}
              className="glass-panel p-2 border border-yellow-400/30 hover:bg-yellow-500/10 transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <AnimatePresence>
                {appliedStyle === "highlight" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 bg-yellow-400/20 rounded-lg"
                  />
                )}
              </AnimatePresence>
              <div className="text-center relative z-10">
                <motion.div
                  className="text-xs font-medium text-yellow-400"
                  animate={
                    appliedStyle === "highlight" ? { scale: [1, 1.2, 1] } : {}
                  }
                  transition={{ duration: 0.3 }}>
                  🔥
                </motion.div>
                <div className="text-xs text-white/60">Highlight</div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => applyWordStyling(selectedWord, "underline")}
              className="glass-panel p-2 border border-cyan-400/30 hover:bg-cyan-500/10 transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <AnimatePresence>
                {appliedStyle === "underline" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 bg-cyan-400/20 rounded-lg"
                  />
                )}
              </AnimatePresence>
              <div className="text-center relative z-10">
                <motion.div
                  className="text-xs font-medium text-cyan-400"
                  animate={
                    appliedStyle === "underline" ? { scale: [1, 1.2, 1] } : {}
                  }
                  transition={{ duration: 0.3 }}>
                  _
                </motion.div>
                <div className="text-xs text-white/60">Underline</div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => applyWordStyling(selectedWord, "block")}
              className="glass-panel p-2 border border-purple-400/30 hover:bg-purple-500/10 transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <AnimatePresence>
                {appliedStyle === "block" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 bg-purple-400/20 rounded-lg"
                  />
                )}
              </AnimatePresence>
              <div className="text-center relative z-10">
                <motion.div
                  className="text-xs font-medium text-purple-400"
                  animate={
                    appliedStyle === "block" ? { scale: [1, 1.2, 1] } : {}
                  }
                  transition={{ duration: 0.3 }}>
                  ⬛
                </motion.div>
                <div className="text-xs text-white/60">Block</div>
              </div>
            </motion.button>
          </div>

          {getWordStyle(selectedWord) && (
            <button
              onClick={() => removeWordStyling(selectedWord)}
              className="w-full glass-panel p-2 border border-red-400/30 text-red-400 hover:bg-red-500/10 transition-colors">
              <div className="text-xs">Remove Styling</div>
            </button>
          )}
        </div>
      )}

      {/* Applied Styles Summary */}
      {settings.wordStyling.length > 0 && (
        <div className="space-y-2 pt-3 border-t border-white/10">
          <div className="text-xs text-white/60">Applied Styles</div>
          <div className="flex flex-wrap gap-1">
            {settings.wordStyling.map((style, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs">
                <span className="text-purple-300">{style.text}</span>
                <div className="flex gap-1">
                  {style.highlight && <span>🔥</span>}
                  {style.underline && <span>_</span>}
                  {style.backgroundColor !== "transparent" && <span>⬛</span>}
                </div>
                <button
                  onClick={() => removeWordStyling(style.text)}
                  className="text-red-400 hover:text-red-300 ml-1">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
