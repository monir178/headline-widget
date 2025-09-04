import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-slate-400 selection:bg-blue-500/30 selection:text-white",
        // Subtle liquid glass effect
        "backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl shadow-lg shadow-black/10",
        "flex h-11 w-full min-w-0 px-4 py-3 text-sm text-white transition-all duration-300 outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Subtle focus and hover effects
        "focus:border-white/[0.12] focus:bg-white/[0.05] focus:shadow-xl focus:ring-1 focus:ring-white/10",
        "hover:bg-white/[0.04] hover:border-white/[0.10]",
        "aria-invalid:ring-red-500/30 aria-invalid:border-red-500/50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
