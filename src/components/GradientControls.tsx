import { useHeadlineStore } from "@/store/headline-store";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, ArrowDown, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Sketch } from "@uiw/react-color";

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
  const [isStartColorPickerOpen, setIsStartColorPickerOpen] = useState(false);
  const [isEndColorPickerOpen, setIsEndColorPickerOpen] = useState(false);
  const [startModalPosition, setStartModalPosition] = useState({ x: 0, y: 0 });
  const [endModalPosition, setEndModalPosition] = useState({ x: 0, y: 0 });
  const startColorButtonRef = React.useRef<HTMLButtonElement>(null);
  const endColorButtonRef = React.useRef<HTMLButtonElement>(null);

  // Handle escape key to close modals
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsStartColorPickerOpen(false);
        setIsEndColorPickerOpen(false);
      }
    };

    if (isStartColorPickerOpen || isEndColorPickerOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isStartColorPickerOpen, isEndColorPickerOpen]);

  // Simple and reliable popover positioning - always above the button
  const calculateModalPosition = (
    buttonRef: React.RefObject<HTMLButtonElement | null>,
    isStartColor: boolean
  ) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const popoverWidth = 280;
      const popoverHeight = 350;
      const margin = 10;

      // Always position above the button, centered horizontally
      let x = rect.left + rect.width / 2 - popoverWidth / 2;
      let y = rect.top - popoverHeight - margin;

      // Ensure popover stays within viewport bounds
      x = Math.max(margin, Math.min(x, viewportWidth - popoverWidth - margin));
      y = Math.max(margin, y);

      if (isStartColor) {
        setStartModalPosition({ x, y });
      } else {
        setEndModalPosition({ x, y });
      }
    }
  };

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
                  <motion.button
                    ref={startColorButtonRef}
                    onClick={() => {
                      // Small delay to ensure button is rendered
                      setTimeout(() => {
                        calculateModalPosition(startColorButtonRef, true);
                        setIsStartColorPickerOpen(true);
                      }, 10);
                    }}
                    className="relative w-12 h-12 rounded-full border-2 border-white/30 transition-all duration-300 hover:border-white/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    style={{ backgroundColor: gradient.startColor }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Start color">
                    <div
                      className="absolute inset-0 rounded-full transition-all duration-300 pointer-events-none -z-10"
                      style={{
                        boxShadow: `0 0 20px ${gradient.startColor}40`,
                      }}
                    />
                  </motion.button>
                </div>

                {/* End Color */}
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-transparent to-white opacity-60" />
                  <span className="text-xs text-white/60 font-medium">End</span>
                  <motion.button
                    ref={endColorButtonRef}
                    onClick={() => {
                      // Small delay to ensure button is rendered
                      setTimeout(() => {
                        calculateModalPosition(endColorButtonRef, false);
                        setIsEndColorPickerOpen(true);
                      }, 10);
                    }}
                    className="relative w-12 h-12 rounded-full border-2 border-white/30 transition-all duration-300 hover:border-white/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    style={{ backgroundColor: gradient.endColor }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="End color">
                    <div
                      className="absolute inset-0 rounded-full transition-all duration-300 pointer-events-none -z-10"
                      style={{
                        boxShadow: `0 0 20px ${gradient.endColor}40`,
                      }}
                    />
                  </motion.button>
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

      {/* Start Color Picker Popover */}
      {isStartColorPickerOpen &&
        createPortal(
          <AnimatePresence>
            <div
              className="fixed inset-0 z-50"
              onClick={() => setIsStartColorPickerOpen(false)}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border border-white/20 rounded-xl shadow-2xl p-4 w-[280px] fixed pointer-events-auto"
                style={{
                  left: `${startModalPosition.x}px`,
                  top: `${startModalPosition.y}px`,
                  background: "rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Start Color
                  </h3>
                  <button
                    onClick={() => setIsStartColorPickerOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200">
                    ✕
                  </button>
                </div>
                <Sketch
                  color={gradient.startColor}
                  onChange={(color) => {
                    updateGradient({ startColor: color.hex });
                  }}
                  style={{ width: "100%" }}
                />
              </motion.div>
            </div>
          </AnimatePresence>,
          document.body
        )}

      {/* End Color Picker Popover */}
      {isEndColorPickerOpen &&
        createPortal(
          <AnimatePresence>
            <div
              className="fixed inset-0 z-50"
              onClick={() => setIsEndColorPickerOpen(false)}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border border-white/20 rounded-xl shadow-2xl p-4 w-[280px] fixed pointer-events-auto"
                style={{
                  left: `${endModalPosition.x}px`,
                  top: `${endModalPosition.y}px`,
                  background: "rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    End Color
                  </h3>
                  <button
                    onClick={() => setIsEndColorPickerOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200">
                    ✕
                  </button>
                </div>
                <Sketch
                  color={gradient.endColor}
                  onChange={(color) => {
                    updateGradient({ endColor: color.hex });
                  }}
                  style={{ width: "100%" }}
                />
              </motion.div>
            </div>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
