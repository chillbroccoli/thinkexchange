import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "~/utils/helpers/cn";

const iconButton = cva(
  "flex justify-center items-center space-x-2 border-black border hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]",
  {
    variants: {
      intent: {
        cyan: "bg-cyan-200 hover:bg-cyan-300 active:bg-cyan-400",
        pink: "bg-pink-200 hover:bg-pink-300 active:bg-pink-400",
        lime: "bg-lime-200 hover:bg-lime-300 active:bg-lime-400",
        danger: "bg-red-200 hover:bg-red-300 active:bg-red-400",
      },
      round: {
        default: "rounded-none",
        rounded: "rounded-md",
        full: "rounded-full",
      },
      size: {
        xs: "w-6 h-6",
        sm: "w-8 h-8",
        default: "w-10 h-10",
        lg: "w-12 h-12",
      },
    },
    defaultVariants: {
      intent: "cyan",
      round: "default",
      size: "default",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButton> {
  icon: React.ReactElement;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, type, icon, intent, size, round, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={cn(iconButton({ intent, size, round, className }))}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
