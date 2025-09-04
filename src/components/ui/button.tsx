import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-white/20 relative overflow-hidden backdrop-blur-xl",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-blue-500/60 to-purple-600/60 text-white shadow-lg shadow-blue-500/15 border border-white/[0.08] hover:shadow-blue-500/20 hover:from-blue-400/70 hover:to-purple-500/70 hover:border-white/[0.12]",
        destructive:
          "bg-gradient-to-br from-red-500/60 to-pink-600/60 text-white shadow-lg shadow-red-500/15 border border-white/[0.08] hover:shadow-red-500/20 hover:border-white/[0.12]",
        outline:
          "border border-white/[0.08] bg-white/[0.03] shadow-lg hover:bg-white/[0.05] hover:border-white/[0.12] hover:shadow-xl text-white",
        secondary:
          "bg-white/[0.05] text-white shadow-lg hover:bg-white/[0.08] hover:shadow-xl border border-white/[0.08] hover:border-white/[0.12]",
        ghost:
          "hover:bg-white/[0.03] hover:backdrop-blur-xl rounded-2xl text-slate-300 hover:text-white transition-all duration-300",
        link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300",
      },
      size: {
        default: "h-11 px-6 py-2 has-[>svg]:px-4",
        sm: "h-9 rounded-xl gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-2xl px-8 has-[>svg]:px-6",
        icon: "size-11 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
