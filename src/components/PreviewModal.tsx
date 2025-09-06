import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye } from "lucide-react";
import { PreviewModeSelector } from "./preview/PreviewModeSelector";
import {
  MobileMockup,
  DesktopMockup,
  TabletMockup,
} from "./preview/DeviceMockups";
import {
  TwitterPreview,
  LinkedInPreview,
  InstagramPreview,
} from "./preview/SocialMediaPreviews";

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
  const [activeMode, setActiveMode] = useState<PreviewMode>("desktop");

  const getPreviewContent = () => {
    switch (activeMode) {
      case "desktop":
        return <DesktopMockup />;
      case "tablet":
        return <TabletMockup />;
      case "mobile":
        return <MobileMockup />;
      case "twitter":
        return <TwitterPreview />;
      case "linkedin":
        return <LinkedInPreview />;
      case "instagram":
        return <InstagramPreview />;
      default:
        return null;
    }
  };

  const getPreviewContainer = () => {
    if (["desktop", "tablet", "mobile"].includes(activeMode)) {
      return getPreviewContent();
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
            style={{ backdropFilter: "blur(20px)" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
            <div
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                willChange: "transform, opacity",
              }}
              className="w-full max-w-[95vw] sm:max-w-2xl md:max-w-4xl lg:max-w-6xl max-h-[80vh] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl">
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
              <div className="flex flex-col sm:flex-row h-[calc(80vh-80px)] overflow-hidden">
                <PreviewModeSelector
                  activeMode={activeMode}
                  onModeChange={setActiveMode}
                />

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
