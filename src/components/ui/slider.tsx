"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max],
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}>
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          // Base track styles with glassmorphism
          "relative grow overflow-hidden rounded-full backdrop-blur-xl",
          "bg-white/[0.08] border border-white/[0.12]",
          // Enhanced shadows for depth
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.2),inset_0_-1px_0_rgba(255,255,255,0.05),0_1px_3px_rgba(0,0,0,0.1)]",
          // Smooth transitions
          "transition-all duration-300 ease-out",
          // Orientation styles
          "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
        )}>
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            // Enhanced gradient with stronger colors
            "bg-gradient-to-r from-blue-500 to-purple-600 absolute",
            // Constant multi-layer glow effect - always visible
            "shadow-[0_0_16px_rgba(59,130,246,0.8),0_0_32px_rgba(147,51,234,0.5),0_4px_12px_rgba(59,130,246,0.4),0_0_8px_rgba(255,255,255,0.2)]",
            // Smooth transitions with spring easing
            "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            // Orientation styles
            "data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            // Base thumb styles
            "block size-5 shrink-0 rounded-full bg-white border border-white/[0.2] cursor-grab active:cursor-grabbing",
            // Constant glow - always visible, not just on hover
            "shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.1),0_0_12px_rgba(59,130,246,0.6),0_0_24px_rgba(147,51,234,0.3),0_0_6px_rgba(255,255,255,0.4)]",
            // Smooth spring animations
            "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            // Interactive states with intensified glow
            "hover:scale-110 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.9),0_0_20px_rgba(59,130,246,0.8),0_0_40px_rgba(147,51,234,0.4),0_0_10px_rgba(255,255,255,0.6)]",
            "active:scale-105 active:shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.9),0_0_24px_rgba(59,130,246,1.0),0_0_48px_rgba(147,51,234,0.5),0_0_12px_rgba(255,255,255,0.8)]",
            // Focus states for accessibility
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
            "focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.9),0_0_20px_rgba(59,130,246,0.8),0_0_40px_rgba(147,51,234,0.4)]",
            // Disabled state
            "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
