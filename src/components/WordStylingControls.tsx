import { useHeadlineStore } from "@/store/headline-store";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const WordStylingControls = () => {
  const { settings, updateSettings } = useHeadlineStore();
  const [selectedWord, setSelectedWord] = useState("");
  const [appliedStyle, setAppliedStyle] = useState<string | null>(null);

  // Get unique words from the headline text with memoization
  const uniqueWords = useMemo(() => {
    const words = settings.text
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .map((word) => word.replace(/[^\w]/g, "")) // Remove punctuation
      .filter((word) => word.length > 0);

    return [...new Set(words)];
  }, [settings.text]);

  // Clean up word styling when text changes
  useEffect(() => {
    if (settings.wordStyling.length > 0) {
      // Filter out styling for words that no longer exist in the text
      const validStyling = settings.wordStyling.filter((style) =>
        uniqueWords.includes(style.text)
      );

      // Only update if there are changes
      if (validStyling.length !== settings.wordStyling.length) {
        updateSettings({ wordStyling: validStyling });
      }
    }

    // Clear selected word if it no longer exists
    if (selectedWord && !uniqueWords.includes(selectedWord)) {
      setSelectedWord("");
    }
  }, [uniqueWords, settings.wordStyling, selectedWord, updateSettings]);

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
        <div className="flex items-center justify-between">
          <div className="text-sm text-white/80">Select words to style:</div>
          {uniqueWords.length === 0 && (
            <div className="text-xs text-white/50 italic">
              Add some text to style words
            </div>
          )}
        </div>

        {uniqueWords.length > 0 ? (
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto scrollbar-hide">
            {uniqueWords.map((word, index) => {
              const wordStyle = getWordStyle(word);
              const isSelected = selectedWord === word;

              return (
                <motion.button
                  key={`${word}-${index}`}
                  onClick={() => setSelectedWord(isSelected ? "" : word)}
                  className={`
                    px-3 py-2 rounded-lg text-xs transition-all duration-200 relative overflow-hidden
                    ${
                      isSelected
                        ? "bg-blue-500/30 border border-blue-400/50 text-blue-300 shadow-lg shadow-blue-500/20"
                        : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
                    }
                    ${
                      wordStyle
                        ? "ring-1 ring-purple-400/30 shadow-lg shadow-purple-500/10"
                        : ""
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}>
                  {/* Style indicators */}
                  {wordStyle && (
                    <div className="absolute -top-1 -right-1 flex gap-0.5">
                      {wordStyle.highlight && (
                        <div
                          className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                          title="Highlighted"
                        />
                      )}
                      {wordStyle.underline && (
                        <div
                          className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                          title="Underlined"
                        />
                      )}
                      {wordStyle.backgroundColor !== "transparent" && (
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                          title="Block styled"
                        />
                      )}
                    </div>
                  )}

                  <span className="font-medium">{word}</span>

                  {wordStyle && (
                    <div className="flex gap-1 mt-1 justify-center">
                      {wordStyle.highlight && (
                        <span className="text-yellow-400 text-xs">🔥</span>
                      )}
                      {wordStyle.underline && (
                        <span className="text-cyan-400 text-xs">_</span>
                      )}
                      {wordStyle.backgroundColor !== "transparent" && (
                        <span className="text-purple-400 text-xs">⬛</span>
                      )}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-white/40">
            <div className="text-4xl mb-2">📝</div>
            <div className="text-sm">No words available to style</div>
            <div className="text-xs mt-1">
              Type some text in the headline to get started
            </div>
          </div>
        )}
      </div>

      {/* Style Controls */}
      {selectedWord && (
        <motion.div
          className="space-y-3 pt-3 border-t border-white/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          <div className="flex items-center justify-between">
            <div className="text-sm text-white/80">
              Style{" "}
              <span className="text-blue-400 font-medium">
                "{selectedWord}"
              </span>
            </div>
            <button
              onClick={() => setSelectedWord("")}
              className="text-white/40 hover:text-white/60 transition-colors text-xs">
              ✕
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <motion.button
              onClick={() => applyWordStyling(selectedWord, "highlight")}
              className={`glass-panel p-3 border transition-all duration-300 relative overflow-hidden ${
                getWordStyle(selectedWord)?.highlight
                  ? "border-yellow-400/60 bg-yellow-500/20 shadow-lg shadow-yellow-500/20"
                  : "border-yellow-400/30 hover:bg-yellow-500/10 hover:border-yellow-400/50"
              }`}
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
                  className="text-lg font-medium text-yellow-400"
                  animate={
                    appliedStyle === "highlight" ? { scale: [1, 1.2, 1] } : {}
                  }
                  transition={{ duration: 0.3 }}>
                  🔥
                </motion.div>
                <div className="text-xs text-white/70 mt-1">Highlight</div>
                {getWordStyle(selectedWord)?.highlight && (
                  <div className="text-xs text-yellow-400 mt-1 font-medium">
                    Active
                  </div>
                )}
              </div>
            </motion.button>

            <motion.button
              onClick={() => applyWordStyling(selectedWord, "underline")}
              className={`glass-panel p-3 border transition-all duration-300 relative overflow-hidden ${
                getWordStyle(selectedWord)?.underline
                  ? "border-cyan-400/60 bg-cyan-500/20 shadow-lg shadow-cyan-500/20"
                  : "border-cyan-400/30 hover:bg-cyan-500/10 hover:border-cyan-400/50"
              }`}
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
                  className="text-lg font-medium text-cyan-400"
                  animate={
                    appliedStyle === "underline" ? { scale: [1, 1.2, 1] } : {}
                  }
                  transition={{ duration: 0.3 }}>
                  _
                </motion.div>
                <div className="text-xs text-white/70 mt-1">Underline</div>
                {getWordStyle(selectedWord)?.underline && (
                  <div className="text-xs text-cyan-400 mt-1 font-medium">
                    Active
                  </div>
                )}
              </div>
            </motion.button>

            <motion.button
              onClick={() => applyWordStyling(selectedWord, "block")}
              className={`glass-panel p-3 border transition-all duration-300 relative overflow-hidden ${
                getWordStyle(selectedWord)?.backgroundColor !== "transparent"
                  ? "border-purple-400/60 bg-purple-500/20 shadow-lg shadow-purple-500/20"
                  : "border-purple-400/30 hover:bg-purple-500/10 hover:border-purple-400/50"
              }`}
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
                  className="text-lg font-medium text-purple-400"
                  animate={
                    appliedStyle === "block" ? { scale: [1, 1.2, 1] } : {}
                  }
                  transition={{ duration: 0.3 }}>
                  ⬛
                </motion.div>
                <div className="text-xs text-white/70 mt-1">Block</div>
                {getWordStyle(selectedWord)?.backgroundColor !==
                  "transparent" && (
                  <div className="text-xs text-purple-400 mt-1 font-medium">
                    Active
                  </div>
                )}
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
        </motion.div>
      )}

      {/* Applied Styles Summary */}
      {settings.wordStyling.length > 0 && (
        <motion.div
          className="space-y-3 pt-3 border-t border-white/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          <div className="flex items-center justify-between">
            <div className="text-sm text-white/80">Applied Styles</div>
            <div className="text-xs text-white/50">
              {settings.wordStyling.length} word
              {settings.wordStyling.length !== 1 ? "s" : ""} styled
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {settings.wordStyling.map((style, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs hover:bg-purple-500/20 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}>
                <span className="text-purple-300 font-medium">
                  {style.text}
                </span>
                <div className="flex gap-1">
                  {style.highlight && (
                    <span className="text-yellow-400" title="Highlighted">
                      🔥
                    </span>
                  )}
                  {style.underline && (
                    <span className="text-cyan-400" title="Underlined">
                      _
                    </span>
                  )}
                  {style.backgroundColor !== "transparent" && (
                    <span className="text-purple-400" title="Block styled">
                      ⬛
                    </span>
                  )}
                </div>
                <button
                  onClick={() => removeWordStyling(style.text)}
                  className="text-red-400 hover:text-red-300 ml-1 hover:bg-red-500/20 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                  title="Remove styling">
                  ×
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
