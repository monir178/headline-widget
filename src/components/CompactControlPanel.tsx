import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Type,
  Palette,
  Sparkles,
  Wand2,
} from "lucide-react";
import { TypographyControls } from "./TypographyControls";
import { GradientControls } from "./GradientControls";
import { AnimationControls } from "./AnimationControls";
import { WordStylingControls } from "./WordStylingControls";

interface ControlSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  component: React.ReactNode;
}

const sections: ControlSection[] = [
  {
    id: "typography",
    title: "Typography",
    icon: <Type className="w-4 h-4" />,
    color: "cyan",
    component: <TypographyControls />,
  },
  {
    id: "gradient",
    title: "Colors & Effects",
    icon: <Palette className="w-4 h-4" />,
    color: "purple",
    component: <GradientControls />,
  },
  {
    id: "animation",
    title: "Animation",
    icon: <Sparkles className="w-4 h-4" />,
    color: "emerald",
    component: <AnimationControls />,
  },
  {
    id: "styling",
    title: "Word Styling",
    icon: <Wand2 className="w-4 h-4" />,
    color: "violet",
    component: <WordStylingControls />,
  },
];

const getColorClasses = (color: string, isExpanded: boolean) => {
  const colors = {
    cyan: {
      border: isExpanded ? "border-cyan-400/50" : "border-cyan-400/20",
      bg: isExpanded ? "bg-cyan-500/10" : "bg-cyan-500/5",
      text: "text-cyan-400",
      glow: isExpanded ? "shadow-cyan-500/20" : "",
    },
    purple: {
      border: isExpanded ? "border-purple-400/50" : "border-purple-400/20",
      bg: isExpanded ? "bg-purple-500/10" : "bg-purple-500/5",
      text: "text-purple-400",
      glow: isExpanded ? "shadow-purple-500/20" : "",
    },
    emerald: {
      border: isExpanded ? "border-emerald-400/50" : "border-emerald-400/20",
      bg: isExpanded ? "bg-emerald-500/10" : "bg-emerald-500/5",
      text: "text-emerald-400",
      glow: isExpanded ? "shadow-emerald-500/20" : "",
    },
    violet: {
      border: isExpanded ? "border-violet-400/50" : "border-violet-400/20",
      bg: isExpanded ? "bg-violet-500/10" : "bg-violet-500/5",
      text: "text-violet-400",
      glow: isExpanded ? "shadow-violet-500/20" : "",
    },
  };
  return colors[color as keyof typeof colors];
};

export const CompactControlPanel = () => {
  const [expandedSection, setExpandedSection] = useState<string>("typography");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? "" : sectionId);
  };

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block h-full">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <div className="glass-panel p-4 border border-white/10">
              <h2 className="text-lg font-semibold text-white/90 mb-1">
                Headline Controls
              </h2>
              <p className="text-sm text-white/60">
                Customize your headline appearance
              </p>
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide">
            {sections.map((section) => {
              const isExpanded = expandedSection === section.id;
              const colorClasses = getColorClasses(section.color, isExpanded);

              return (
                <div
                  key={section.id}
                  className={`glass-panel border transition-all duration-300 ${
                    colorClasses.border
                  } ${colorClasses.bg} ${
                    colorClasses.glow ? `shadow-lg ${colorClasses.glow}` : ""
                  }`}>
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg bg-white/10 ${colorClasses.text}`}>
                        {section.icon}
                      </div>
                      <span className={`font-medium ${colorClasses.text}`}>
                        {section.title}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={colorClasses.text}>
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </button>

                  {/* Section Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden">
                        <div className="px-4 pb-4 border-t border-white/10">
                          <div className="pt-4">{section.component}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Control Button */}
        <motion.button
          onClick={() => setIsMobileOpen(true)}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 glass-panel p-4 border border-white/20 hover:border-white/30 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white/80" />
            <span className="text-white/80 font-medium">Customize</span>
          </div>
        </motion.button>

        {/* Mobile Bottom Sheet */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />

              {/* Bottom Sheet */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-hidden">
                <div className="glass-panel rounded-t-3xl border-t border-x border-white/20 p-6">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-white/90">
                        Headline Controls
                      </h2>
                      <p className="text-sm text-white/60">
                        Customize your headline
                      </p>
                    </div>
                    <button
                      onClick={() => setIsMobileOpen(false)}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                      <ChevronDown className="w-5 h-5 text-white/80" />
                    </button>
                  </div>

                  {/* Mobile Sections - Horizontal Tabs */}
                  <div className="space-y-4">
                    {/* Tab Navigation */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                      {sections.map((section) => {
                        const isActive = expandedSection === section.id;
                        const colorClasses = getColorClasses(
                          section.color,
                          isActive
                        );

                        return (
                          <button
                            key={section.id}
                            onClick={() => toggleSection(section.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap ${
                              isActive
                                ? `${colorClasses.border} ${colorClasses.bg} ${colorClasses.text}`
                                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                            }`}>
                            {section.icon}
                            <span className="text-sm font-medium">
                              {section.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Section Content */}
                    <div className="max-h-[50vh] overflow-y-auto scrollbar-hide">
                      <AnimatePresence mode="wait">
                        {expandedSection && (
                          <motion.div
                            key={expandedSection}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}>
                            {
                              sections.find((s) => s.id === expandedSection)
                                ?.component
                            }
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
