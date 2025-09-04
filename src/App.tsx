import { HeadlineDisplay } from "./components/HeadlineDisplay";
import { TypographyControls } from "./components/TypographyControls";
import { GradientControls } from "./components/GradientControls";
import { AnimationControls } from "./components/AnimationControls";
import { WordStylingControls } from "./components/WordStylingControls";
import SiriOrb from "./components/smoothui/ui/SiriOrb";
import { useHeadlineStore } from "./store/headline-store";
import {
  exportSettings,
  downloadJSON,
  generateEmbedCode,
} from "./utils/headline-utils";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

function App() {
  const { settings } = useHeadlineStore();
  const [copySuccess, setCopySuccess] = useState(false);

  const handleExportJSON = () => {
    try {
      const exportData = exportSettings(settings);
      downloadJSON(exportData);
      toast.success("Settings exported successfully! 🎉", {
        duration: 3000,
        style: {
          background: "rgba(16, 185, 129, 0.1)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          color: "#10b981",
          backdropFilter: "blur(16px)",
          borderRadius: "16px",
        },
        iconTheme: {
          primary: "#10b981",
          secondary: "#ffffff",
        },
      });
    } catch {
      toast.error("Failed to export settings 😞", {
        duration: 3000,
        style: {
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#ef4444",
          backdropFilter: "blur(16px)",
          borderRadius: "16px",
        },
      });
    }
  };

  const handleCopyEmbedCode = async () => {
    try {
      const embedCode = generateEmbedCode(settings);
      await navigator.clipboard.writeText(embedCode);

      // Show animated success feedback
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      toast.error("Failed to copy embed code 😞", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="dark min-h-screen relative overflow-hidden bg-black">
      {/* Gradient Balls Background */}
      <div className="fixed inset-0 z-0 gradient-balls">
        {/* Large gradient balls */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-lg"></div>

        <div className="absolute bottom-0 right-50 w-64 h-64 bg-gradient-to-br from-orange-500/16 to-red-600/16 rounded-full blur-lg"></div>
      </div>

      {/* Fixed Siri Orb Background - Center of screen */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-1">
        <SiriOrb
          size="300px"
          className="opacity-30"
          colors={{
            bg: "oklch(5% 0.02 264.695)",
            c1: "oklch(75% 0.25 350)",
            c2: "oklch(80% 0.22 200)",
            c3: "oklch(78% 0.24 280)",
          }}
          animationDuration={20}
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/20 via-black/10 to-slate-950/20 z-2"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header - Headline Display */}
          <div className="text-center">
            <div className="neon-card max-w-4xl mx-auto p-8">
              <HeadlineDisplay />
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-12 gap-6 auto-rows-min">
            {/* Typography Controls */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="neon-card neon-cyan h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="neon-icon neon-icon-cyan">
                    <span className="text-lg">Aa</span>
                  </div>
                  <h3 className="text-lg font-semibold text-cyan-400 neon-glow-text-cyan">
                    Typography
                  </h3>
                </div>
                <div className="space-y-6">
                  <TypographyControls />
                </div>
              </div>
            </div>

            {/* Colors & Effects */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="neon-card neon-purple h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="neon-icon neon-icon-purple">
                    <span className="text-lg">🎨</span>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-400 neon-glow-text-purple">
                    Colors & Effects
                  </h3>
                </div>
                <div className="space-y-6">
                  <GradientControls />
                </div>
              </div>
            </div>

            {/* Animation Controls */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="neon-card neon-emerald h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="neon-icon neon-icon-emerald">
                    <span className="text-lg">✨</span>
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-400 neon-glow-text-emerald">
                    Animation
                  </h3>
                </div>
                <div className="space-y-6">
                  <AnimationControls />
                </div>
              </div>
            </div>

            {/* Export & Share - Core Requirements */}
            <div className="col-span-12 md:col-span-6">
              <div className="neon-card neon-orange h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="neon-icon neon-icon-orange">
                    <span className="text-lg">🚀</span>
                  </div>
                  <h3 className="text-lg font-semibold text-orange-400 neon-glow-text-orange">
                    Export & Share
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleExportJSON}
                    className="neon-button neon-button-emerald">
                    <span className="text-base">💾</span>
                    <div className="text-left">
                      <div className="font-medium text-sm">Save JSON</div>
                      <div className="text-xs opacity-70">Settings export</div>
                    </div>
                  </button>
                  <button
                    onClick={handleCopyEmbedCode}
                    className="neon-button neon-button-purple relative">
                    {copySuccess ? (
                      <>
                        <span className="text-base animate-bounce">✅</span>
                        <div className="text-left">
                          <div className="font-medium text-sm text-green-400 animate-pulse">
                            Copied!
                          </div>
                          <div className="text-xs opacity-70">Success</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-base">📋</span>
                        <div className="text-left">
                          <div className="font-medium text-sm">Copy CSS</div>
                          <div className="text-xs opacity-70">Embed code</div>
                        </div>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Word/Segment Styling - Core Extra Feature */}
            <div className="col-span-12 md:col-span-6">
              <div className="neon-card neon-violet h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="neon-icon neon-icon-violet">
                    <span className="text-lg">✨</span>
                  </div>
                  <h3 className="text-lg font-semibold text-violet-400 neon-glow-text-violet">
                    Word Styling
                  </h3>
                </div>
                <div className="space-y-6">
                  <WordStylingControls />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          top: 80,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            fontSize: "14px",
            fontWeight: "500",
          },
        }}
      />
    </div>
  );
}

export default App;
