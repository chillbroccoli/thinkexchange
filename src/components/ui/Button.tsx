import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "~/utils/helpers/cn";

export const buttonVariants = cva(
  "flex items-center justify-center border-black border-2 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]",
  {
    variants: {
      intent: {
        white: "bg-white text-black",
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
        xs: "p-0.5 px-2",
        sm: "p-1 px-2.5",
        default: "p-1.5 px-3",
        lg: "p-2 px-4",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "cyan",
      round: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, fullWidth, type, intent, size, round, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={cn(buttonVariants({ fullWidth, round, intent, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
