import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Ultra-modern liquid glass with enhanced depth
        "relative overflow-hidden rounded-3xl backdrop-blur-xl",
        // Enhanced glass background with subtle gradients
        "bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-white/[0.04]",
        "border border-white/[0.1]",
        // Enhanced shadows for premium feel
        "shadow-2xl shadow-black/25",
        // Subtle inner highlights
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(255,255,255,0.02)]",
        // Enhanced glass overlay
        "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/[0.06] before:via-transparent before:to-white/[0.03] before:pointer-events-none before:opacity-60",
        // Neon glow effects on hover
        "hover:bg-gradient-to-br hover:from-white/[0.08] hover:via-white/[0.03] hover:to-white/[0.05]",
        "hover:border-white/[0.15] hover:shadow-3xl hover:shadow-black/30",
        "hover:before:opacity-80",
        // Ultra-smooth transitions
        "transition-all duration-500 ease-out",
        // Modern spacing
        "flex flex-col gap-6 py-6",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
