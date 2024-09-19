import { ReactNode } from "react";

export default function BalanceDisplay({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <div className="flex flex-col gap-[32px] lg:flex-row">{children}</div>
    </div>
  );
}
