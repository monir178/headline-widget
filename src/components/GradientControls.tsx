import { useHeadlineStore } from "@/store/headline-store";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, ArrowDown, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

const directions = [
  {
    value: "→" as const,
    icon: ArrowRight,
    label: "Right",
    gradient: "to right",
  },
  { value: "←" as const, icon: ArrowLeft, label: "Left", gradient: "to left" },
  {
    value: "↓" as const,
    icon: ArrowDown,
    label: "Down",
    gradient: "to bottom",
  },
  { value: "↑" as const, icon: ArrowUp, label: "Up", gradient: "to top" },
];

export const GradientControls = () => {
  const { settings, updateGradient } = useHeadlineStore();
  const { gradient } = settings;

  const getDirectionGradient = () => {
    const direction =
      directions.find((d) => d.value === gradient.direction)?.gradient ||
      "to right";
    return `linear-gradient(${direction}, ${gradient.startColor}, ${gradient.endColor})`;
  };

  return (
    <div className="space-y-6">
      {/* Gradient Toggle */}
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="space-y-1">
          <Label
            htmlFor="gradient-enabled"
            className="font-medium text-white/80">
            Enable Gradient
          </Label>
          <p className="text-xs text-white/60">Apply gradient colors</p>
        </div>
        <Switch
          id="gradient-enabled"
          checked={gradient.enabled}
          onCheckedChange={(enabled) => {
            if (enabled) {
              updateGradient({
                enabled,
                startColor: "#cb3cff",
                endColor: "#00d5ff",
              });
            } else {
              updateGradient({ enabled });
            }
          }}
        />
      </div>

      <AnimatePresence>
        {gradient.enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-6 overflow-hidden">
            {/* Direction Controls */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-white/80">
                Direction
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {directions.map(({ value, icon: Icon, label }) => {
                  const isActive = gradient.direction === value;

                  return (
                    <motion.button
                      key={value}
                      onClick={() => updateGradient({ direction: value })}
                      className={cn(
                        "relative p-3 rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group overflow-hidden",
                        isActive
                          ? "border-white/30 bg-white/10 shadow-[0_0_20px_rgba(59,130,246,0.3),0_0_40px_rgba(147,51,234,0.2)]"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      {/* Content */}
                      <div className="relative flex items-center gap-2 justify-center">
                        <Icon
                          className={cn(
                            "h-4 w-4 transition-all duration-300",
                            isActive ? "text-white" : "text-white/60"
                          )}
                        />
                        <span
                          className={cn(
                            "text-sm font-medium transition-all duration-300",
                            isActive ? "text-white" : "text-white/60"
                          )}>
                          {label}
                        </span>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeDirection"
                          className="absolute inset-0 border-2 border-blue-400/50 rounded-xl"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Color Pickers */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-white/80">
                Colors
              </Label>
              <div className="flex items-center gap-6">
                {/* Start Color */}
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white to-transparent opacity-60" />
                  <span className="text-xs text-white/60 font-medium">
                    Start
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative">
                    <input
                      type="color"
                      value={gradient.startColor}
                      onChange={(e) =>
                        updateGradient({ startColor: e.target.value })
                      }
                      className="w-12 h-12 rounded-full cursor-pointer border-2 border-white/30 transition-all duration-300 hover:border-white/50"
                      style={{ backgroundColor: gradient.startColor }}
                    />
                    <div
                      className="absolute inset-0 rounded-full transition-all duration-300 pointer-events-none -z-10"
                      style={{
                        boxShadow: `0 0 20px ${gradient.startColor}40`,
                      }}
                    />
                  </motion.div>
                </div>

                {/* End Color */}
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-transparent to-white opacity-60" />
                  <span className="text-xs text-white/60 font-medium">End</span>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative">
                    <input
                      type="color"
                      value={gradient.endColor}
                      onChange={(e) =>
                        updateGradient({ endColor: e.target.value })
                      }
                      className="w-12 h-12 rounded-full cursor-pointer border-2 border-white/30 transition-all duration-300 hover:border-white/50"
                      style={{ backgroundColor: gradient.endColor }}
                    />
                    <div
                      className="absolute inset-0 rounded-full transition-all duration-300 pointer-events-none -z-10"
                      style={{
                        boxShadow: `0 0 20px ${gradient.endColor}40`,
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Enhanced Gradient Preview */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-white/80">
                Preview
              </Label>
              <motion.div
                className="relative h-12 rounded-xl border border-white/20 overflow-hidden"
                style={{ background: getDirectionGradient() }}
                animate={{
                  background: getDirectionGradient(),
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}>
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.1)]" />

                {/* Direction indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    key={gradient.direction}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-lg border border-white/20">
                    {directions.find((d) => d.value === gradient.direction)
                      ?.icon &&
                      React.createElement(
                        directions.find((d) => d.value === gradient.direction)!
                          .icon,
                        {
                          className: "w-3 h-3 text-white/80",
                        }
                      )}
                    <span className="text-xs text-white/80 font-medium">
                      {
                        directions.find((d) => d.value === gradient.direction)
                          ?.label
                      }
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
