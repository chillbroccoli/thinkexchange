import React from "react";

import { cn } from "~/utils/helpers/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type ?? "text"}
        className={cn(
          "block w-full p-2 text-sm border-2 border-black bg-gray-50 shadow-sm focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-pink-200 active:bg-pink-200 focus:text-black active:text-black focus:placeholder:text-black active:placeholder:text-black outline-none transition-colors ease-in-out duration-150",
          className
        )}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";
