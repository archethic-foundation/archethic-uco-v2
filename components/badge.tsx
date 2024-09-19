import { cn } from "../lib/utils";
import { ReactNode } from "react";

export type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "bg-background rounded-full border w-fit border-border px-[15px] py-[10px] flex items-center gap-[10px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
