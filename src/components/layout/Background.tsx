import { motion } from "framer-motion";

interface BackgroundProps {
  isLoaded: boolean;
}

export const Background = ({ isLoaded }: BackgroundProps) => (
  <div className="fixed inset-0 z-0">
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="absolute inset-0 bg-gradient-to-br from-slate-950/30 via-transparent to-slate-950/30 z-2"
    />
  </div>
);
