import { HeadlineDisplay } from "./components/HeadlineDisplay";
import { CompactControlPanel } from "./components/CompactControlPanel";
import { FloatingExportActions } from "./components/FloatingExportActions";
import { Toaster } from "react-hot-toast";
import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";

const App = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dark min-h-screen relative overflow-hidden bg-black">
      {/* Enhanced Background */}
      <div className="fixed inset-0 z-0">
        {/* Animated gradient orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="hidden lg:block absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-violet-600/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="absolute bottom-0 left-1/2 w-[120vw] h-[120vw] bg-gradient-to-br from-violet-500/20 to-blue-700/40 rounded-full blur-[170px] transform -translate-x-1/2 translate-y-11/12"
        />
      </div>

      {/* Noise texture overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute inset-0 bg-gradient-to-br from-slate-950/30 via-transparent to-slate-950/30 z-2"
      />

      {/* Main Layout */}
      <div className="relative z-10 h-screen">
        {/* Desktop Layout */}
        <div className="hidden lg:flex h-full">
          {/* Left Sidebar - Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="w-md flex-shrink-0 p-4">
            <CompactControlPanel />
          </motion.div>

          {/* Center Content - Headline Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
            className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-4xl">
              <HeadlineDisplay />
            </div>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden h-full flex flex-col">
          {/* Mobile Header with Headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="flex-1 flex items-center justify-center p-4 pt-16">
            <div className="w-full max-w-4xl">
              <HeadlineDisplay />
            </div>
          </motion.div>

          {/* Mobile Controls Panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}>
            <CompactControlPanel />
          </motion.div>
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
});

export default App;
