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
        "peer data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500/70 data-[state=checked]:to-purple-600/70 data-[state=unchecked]:bg-white/[0.08] focus:ring-1 focus:ring-white/10 backdrop-blur-xl inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-white/[0.12] transition-all duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:shadow-blue-500/25 data-[state=checked]:border-blue-400/30 data-[state=checked]:shadow-lg data-[state=checked]:glow",
        "box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);",
        "data-[state=checked]:box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.08), 0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(147, 51, 234, 0.2);",
        className
      )}
      {...props}>
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-white shadow-lg pointer-events-none block size-5 rounded-full transition-transform duration-300 data-[state=checked]:translate-x-[calc(100%-4px)] data-[state=unchecked]:translate-x-0.5",
          "box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.1);"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
