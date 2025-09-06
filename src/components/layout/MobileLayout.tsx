import { motion } from "framer-motion";
import { HeadlineDisplay } from "../HeadlineDisplay";
import { CompactControlPanel } from "../CompactControlPanel";

interface MobileLayoutProps {
  isLoaded: boolean;
}

export const MobileLayout = ({ isLoaded }: MobileLayoutProps) => (
  <div className="lg:hidden h-full flex flex-col">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
      className="flex-1 flex items-center justify-center p-4 pt-16">
      <div className="w-full max-w-4xl">
        <HeadlineDisplay />
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}>
      <CompactControlPanel />
    </motion.div>
  </div>
);
