import { motion } from "framer-motion";
import { HeadlineDisplay } from "../HeadlineDisplay";
import { CompactControlPanel } from "../CompactControlPanel";

interface DesktopLayoutProps {
  isLoaded: boolean;
}

export const DesktopLayout = ({ isLoaded }: DesktopLayoutProps) => (
  <div className="hidden lg:flex h-full">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
      className="w-md flex-shrink-0 p-4">
      <CompactControlPanel />
    </motion.div>
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
);
