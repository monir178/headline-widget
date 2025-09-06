import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Copy, Share2, Check, X, Upload, Eye } from "lucide-react";
import { useHeadlineStore } from "@/store/headline-store";
import {
  exportSettings,
  downloadJSON,
  generateEmbedCode,
} from "@/utils/headline-utils";
import { ImportModal } from "./ImportModal";
import { PreviewModal } from "./PreviewModal";
import toast from "react-hot-toast";

export const FloatingExportActions = () => {
  const { settings } = useHeadlineStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleExportJSON = () => {
    try {
      const exportData = exportSettings(settings);
      downloadJSON(exportData);
      toast.success("Settings exported successfully! 🎉", {
        style: {
          background: "rgba(16, 185, 129, 0.15)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          color: "#10b981",
          backdropFilter: "blur(20px)",
        },
      });
      setIsExpanded(false);
    } catch {
      toast.error("Failed to export settings", {
        style: {
          background: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#ef4444",
          backdropFilter: "blur(20px)",
        },
      });
    }
  };

  const handleCopyEmbedCode = async () => {
    try {
      const embedCode = generateEmbedCode(settings);
      await navigator.clipboard.writeText(embedCode);

      setCopySuccess(true);
      toast.success("Embed code copied to clipboard! 📋", {
        style: {
          background: "rgba(59, 130, 246, 0.15)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          color: "#3b82f6",
          backdropFilter: "blur(20px)",
        },
      });

      setTimeout(() => {
        setCopySuccess(false);
        setIsExpanded(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy embed code", {
        style: {
          background: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#ef4444",
          backdropFilter: "blur(20px)",
        },
      });
    }
  };

  const actions = [
    {
      id: "download",
      icon: Download,
      label: "Export JSON",
      color: "emerald",
      onClick: handleExportJSON,
    },
    {
      id: "copy",
      icon: copySuccess ? Check : Copy,
      label: copySuccess ? "Copied!" : "Copy CSS",
      color: copySuccess ? "green" : "blue",
      onClick: handleCopyEmbedCode,
    },
  ];

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex gap-3">
        {/* Preview Button */}
        <div className="relative">
          <motion.button
            onClick={() => setIsPreviewModalOpen(true)}
            className="glass-panel p-3 lg:p-4 border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: `
                0 0 20px rgba(251, 146, 60, 0.3),
                0 0 40px rgba(249, 115, 22, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
            }}>
            {/* Animated glow background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-600/10 rounded-2xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="relative z-10"
              animate={{
                filter: [
                  "drop-shadow(0 0 8px rgba(251, 146, 60, 0.8)) drop-shadow(0 0 16px rgba(249, 115, 22, 0.6))",
                  "drop-shadow(0 0 12px rgba(251, 146, 60, 1)) drop-shadow(0 0 24px rgba(249, 115, 22, 0.8))",
                  "drop-shadow(0 0 8px rgba(251, 146, 60, 0.8)) drop-shadow(0 0 16px rgba(249, 115, 22, 0.6))",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}>
              <Eye
                className="w-4 h-4 lg:w-5 lg:h-5 text-orange-300 transition-colors duration-300"
                style={{
                  filter:
                    "drop-shadow(0 0 6px rgba(251, 146, 60, 0.8)) drop-shadow(0 0 12px rgba(249, 115, 22, 0.4))",
                }}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Import Button */}
        <div className="relative">
          <motion.button
            onClick={() => setIsImportModalOpen(true)}
            className="glass-panel p-3 lg:p-4 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: `
                0 0 20px rgba(147, 51, 234, 0.3),
                0 0 40px rgba(236, 72, 153, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
            }}>
            {/* Animated glow background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-600/10 rounded-2xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="relative z-10"
              animate={{
                filter: [
                  "drop-shadow(0 0 8px rgba(147, 51, 234, 0.8)) drop-shadow(0 0 16px rgba(236, 72, 153, 0.6))",
                  "drop-shadow(0 0 12px rgba(147, 51, 234, 1)) drop-shadow(0 0 24px rgba(236, 72, 153, 0.8))",
                  "drop-shadow(0 0 8px rgba(147, 51, 234, 0.8)) drop-shadow(0 0 16px rgba(236, 72, 153, 0.6))",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}>
              <Upload
                className="w-4 h-4 lg:w-5 lg:h-5 text-purple-300 transition-colors duration-300"
                style={{
                  filter:
                    "drop-shadow(0 0 6px rgba(147, 51, 234, 0.8)) drop-shadow(0 0 12px rgba(236, 72, 153, 0.4))",
                }}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Export Button */}
        <div className="relative">
          {/* Main Toggle Button - Glowing */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="glass-panel p-3 lg:p-4 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: `
              0 0 20px rgba(59, 130, 246, 0.3),
              0 0 40px rgba(147, 51, 234, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
            }}>
            {/* Animated glow background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-2xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10">
              {isExpanded ? (
                <X className="w-4 h-4 lg:w-5 lg:h-5 text-white drop-shadow-lg" />
              ) : (
                <motion.div
                  className="relative"
                  animate={{
                    filter: [
                      "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 16px rgba(147, 51, 234, 0.6))",
                      "drop-shadow(0 0 12px rgba(59, 130, 246, 1)) drop-shadow(0 0 24px rgba(147, 51, 234, 0.8))",
                      "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 16px rgba(147, 51, 234, 0.6))",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}>
                  <Share2
                    className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-300 transition-colors duration-300"
                    style={{
                      filter:
                        "drop-shadow(0 0 6px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.4))",
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          </motion.button>

          {/* Action Buttons */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-3 right-0 space-y-2 min-w-[140px] lg:min-w-[160px]">
                {actions.map((action, index) => {
                  const Icon = action.icon;
                  const colorClasses = {
                    emerald:
                      "border-emerald-400/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400",
                    blue: "border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400",
                    green:
                      "border-green-400/30 bg-green-500/10 hover:bg-green-500/20 text-green-400",
                  };

                  return (
                    <motion.button
                      key={action.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={action.onClick}
                      className={`glass-panel w-full p-2 lg:p-3 border transition-all duration-300 flex items-center gap-2 lg:gap-3 ${
                        colorClasses[action.color as keyof typeof colorClasses]
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      <Icon className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span className="text-xs lg:text-sm font-medium">
                        {action.label}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Import Modal */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
      />
    </div>
  );
};
