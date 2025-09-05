import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Base styles
        "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border backdrop-blur-xl outline-none disabled:cursor-not-allowed disabled:opacity-50",
        // Smooth transitions with spring-like easing
        "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        // Unchecked state
        "bg-white/[0.08] border-white/[0.12] shadow-[inset_0_1px_2px_rgba(0,0,0,0.15),inset_0_-1px_0_rgba(255,255,255,0.05),0_1px_3px_rgba(0,0,0,0.1)]",
        // Checked state with enhanced glow
        "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500/80 data-[state=checked]:to-purple-600/80",
        "data-[state=checked]:border-blue-400/40 data-[state=checked]:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2),inset_0_-1px_0_rgba(255,255,255,0.1),0_0_20px_rgba(59,130,246,0.6),0_0_40px_rgba(147,51,234,0.3),0_4px_20px_rgba(59,130,246,0.2)]",
        // Focus state
        "focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        className
      )}
      {...props}>
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Base thumb styles
          "pointer-events-none block size-5 rounded-full bg-white",
          // Enhanced smooth animation with spring easing
          "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          // Position and shadows
          "data-[state=checked]:translate-x-[calc(100%-4px)] data-[state=unchecked]:translate-x-0.5",
          "shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.1)]",
          // Enhanced glow when checked
          "data-[state=checked]:shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.1),0_0_12px_rgba(255,255,255,0.8)]",
          // Subtle scale effect
          "data-[state=checked]:scale-110"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
