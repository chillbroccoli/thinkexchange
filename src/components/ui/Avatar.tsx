import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import React from "react";

import { cn } from "~/utils/helpers/cn";

export const avatarVariants = cva(
  "overflow-hidden relative inline-flex items-center justify-center border-2 rounded-full border-black",
  {
    variants: {
      round: {
        default: "rounded-none",
        rounded: "rounded-md",
        full: "rounded-full",
      },
      size: {
        xs: "h-8 w-8",
        sm: "h-10 w-10",
        default: "h-12 w-12",
        lg: "h-14 w-14",
      },
    },
    defaultVariants: {
      round: "full",
      size: "lg",
    },
  }
);

export interface AvatarProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof avatarVariants> {
  src?: string | null;
  alt?: string;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, alt, size, round, ...props }, ref) => {
    if (!src) {
      return (
        <span ref={ref} className={cn(avatarVariants({ round, size, className }))} {...props}>
          <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      );
    }

    return (
      <span ref={ref} className={cn(avatarVariants({ round, size, className }))} {...props}>
        <Image src={src} alt={alt ?? "Avatar"} fill />
      </span>
    );
  }
);

Avatar.displayName = "Avatar";
