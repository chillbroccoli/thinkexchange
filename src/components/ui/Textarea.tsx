import React from "react";

import { cn } from "~/utils/helpers/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows ?? 4}
        className={cn(
          "block w-full p-2 text-sm border-2 border-black bg-gray-50 shadow-sm focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-pink-200 active:bg-pink-200 focus:text-black active:text-black focus:placeholder:text-black active:placeholder:text-black outline-none transition-colors ease-in-out duration-150",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
