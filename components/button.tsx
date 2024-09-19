import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "rounded-full font-medium hover:scale-95 hover:disabled:scale-100 flex items-center gap-[5px] transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-purple-gradient border-border hover:bg-none border disabled:text-muted disabled:bg-none disabled:border-border-light",
        secondary:
          "bg-transparent border-border hover:bg-none border disabled:text-muted disabled:bg-none disabled:border-border-light",
      },
      size: {
        small: "h-8 px-[15px] py-[8px] text-sm",
        default: "h-10 px-[20px] py-[10px] xl:text-18",
        lg: "h-[54px] px-[30px] py-[15px] text-18",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
