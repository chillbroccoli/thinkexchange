import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "~/utils/helpers/cn";

export const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-1 text-xs font-mediumring-1 ring-inset border border-black",
  {
    variants: {
      intent: {
        cyan: "bg-cyan-50 text-cyan-700 ring-cyan-700/10",
        pink: "bg-pink-50 text-pink-700 ring-pink-700/10",
        lime: "bg-lime-50 text-lime-700 ring-lime-700/10",
      },
    },
    defaultVariants: {
      intent: "cyan",
    },
  }
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, intent, ...props }, ref) => {
    return <span ref={ref} className={cn(badgeVariants({ intent, className }))} {...props} />;
  }
);

Badge.displayName = "Badge";
