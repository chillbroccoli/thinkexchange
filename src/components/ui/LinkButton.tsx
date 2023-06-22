import { VariantProps } from "class-variance-authority";
import NextLink from "next/link";
import React from "react";

import { cn } from "~/utils/helpers/cn";

import { buttonVariants } from "./Button";

export interface LinkProps
  extends React.ComponentProps<typeof NextLink>,
    VariantProps<typeof buttonVariants> {}

export const LinkButton = ({
  className,
  intent,
  fullWidth,
  size,
  href,
  round,
  ...props
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={cn(buttonVariants({ round, intent, fullWidth, size, className }))}
      {...props}
    />
  );
};
