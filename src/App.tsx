import { HeadlineDisplay } from "./components/HeadlineDisplay";
import { CompactControlPanel } from "./components/CompactControlPanel";
import { FloatingExportActions } from "./components/FloatingExportActions";
import SiriOrb from "./components/smoothui/ui/SiriOrb";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="dark min-h-screen relative overflow-hidden bg-black">
      {/* Enhanced Background */}
      <div className="fixed inset-0 z-0">
        {/* Animated gradient orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-violet-600/20 rounded-full blur-3xl "></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Siri Orb Background */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-1">
        <SiriOrb size="300px" className="opacity-20" />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/30 via-transparent to-slate-950/30 z-2"></div>

      {/* Main Layout */}
      <div className="relative z-10 h-screen">
        {/* Desktop Layout */}
        <div className="hidden lg:flex h-full">
          {/* Left Sidebar - Controls */}
          <div className="min-w-md flex-shrink-0 p-4">
            <CompactControlPanel />
          </div>

          {/* Center Content - Headline Display */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-4xl">
              <HeadlineDisplay />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden h-full flex flex-col">
          {/* Mobile Header with Headline */}
          <div className="flex-1 flex items-center justify-center p-4 pt-16">
            <div className="w-full max-w-lg">
              <HeadlineDisplay />
            </div>
          </div>

          {/* Mobile Controls Panel */}
          <CompactControlPanel />
        </div>

        {/* Floating Export Actions */}
        <FloatingExportActions />
      </div>

      {/* Enhanced Toast notifications */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          top: 24,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(0, 0, 0, 0.85)",
            color: "#fff",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "16px 20px",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
          },
        }}
      />
    </div>
  );
}

export default App;
