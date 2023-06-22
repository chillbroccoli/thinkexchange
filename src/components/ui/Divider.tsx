import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "~/utils/helpers/cn";

export const dividerVariants = cva("w-full h-[1px] bg-black", {
  variants: {},
  defaultVariants: {},
});

export interface DividerProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof dividerVariants> {}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn(dividerVariants({ className }))} {...props} />;
  }
);

Divider.displayName = "Divider";
