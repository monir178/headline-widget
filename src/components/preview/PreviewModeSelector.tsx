import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Tablet,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

type PreviewMode =
  | "desktop"
  | "tablet"
  | "mobile"
  | "twitter"
  | "linkedin"
  | "instagram";

interface PreviewModeSelectorProps {
  activeMode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
}

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

export const PreviewModeSelector = ({
  activeMode,
  onModeChange,
}: PreviewModeSelectorProps) => (
  <div className="w-full sm:w-48 lg:w-64 p-2 sm:p-3 lg:p-4 border-b sm:border-b-0 sm:border-r border-white/10 overflow-y-auto flex-shrink-0">
    <div className="space-y-1 sm:space-y-2">
      {previewModes.map((mode) => {
        const Icon = mode.icon;
        const isActive = activeMode === mode.id;

        return (
          <motion.button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
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
);
