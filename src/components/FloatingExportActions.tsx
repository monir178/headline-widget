import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Copy, Share2, Check, X } from "lucide-react";
import { useHeadlineStore } from "@/store/headline-store";
import {
  exportSettings,
  downloadJSON,
  generateEmbedCode,
} from "@/utils/headline-utils";
import toast from "react-hot-toast";

export const FloatingExportActions = () => {
  const { settings } = useHeadlineStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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
      <div className="relative">
        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="glass-panel p-3 lg:p-4 border border-white/20 hover:border-white/30 transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}>
            {isExpanded ? (
              <X className="w-4 h-4 lg:w-5 lg:h-5 text-white/80" />
            ) : (
              <Share2 className="w-4 h-4 lg:w-5 lg:h-5 text-white/80 group-hover:text-white" />
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
  );
};
