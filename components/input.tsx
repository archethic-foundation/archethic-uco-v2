import * as React from "react";

import { cn } from "../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconY?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconY, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2",
              iconY && "top-[26px]"
            )}
          >
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "bg-background border border-border-light w-full rounded-[10px] px-[14px] py-[12px] text-20 font-medium placeholder:text-muted focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            className,
            icon && "pr-[55px]"
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
