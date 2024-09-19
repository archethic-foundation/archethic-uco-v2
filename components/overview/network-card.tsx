import "aos/dist/aos.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import uco from "../../src/images/networks/uco.svg";
// import Image, { StaticImageData } from "next/image";
import { cn, formatNumber } from "../../lib/utils";
import Badge from "../badge";
import { Button } from "../button";

type NetworkCardProps = {
  networkIcon: string;
  network: string;
  balance: string;
  migrationCompleted?: boolean;
  delay?: number;
  backBtn?: () => void;
  onClick?: () => void;
  isMigrationStyle?: boolean;
  className?: string;
  balanceLeft?: boolean;
  disabled?: boolean;
  buttonArrow?: "left" | "right";
  buttonLabel: string;
};

export default function NetworkCard({
  networkIcon,
  network,
  balance,
  disabled,
  buttonArrow,
  buttonLabel,
  onClick,
  delay,
  isMigrationStyle,
  className,
  balanceLeft,
}: NetworkCardProps) {
  return (
    <div
      className={cn(
        "p-[28px] group flex flex-col items-center gap-[18px] xl:gap-[24px] 2xl:gap-[32px] lg:w-1/3 bg-purple-light border border-border-light rounded-[10px]",
        isMigrationStyle && "bg-transparent border-none p-0",
        className
      )}
    >
      <Badge className="group-hover:rotate-3 group-hover:scale-110 transition-all duration-300 border-border-light bg-transparent">
        <img src={networkIcon} alt="network" className="w-[20px] h-[20px]" />
        <p className="text-13 xl:text-15 font-medium">{network}</p>
      </Badge>
      <div className="flex flex-col items-center gap-[6px] xl:gap-[14px]">
        <img src={uco} alt="uco" className="w-[29px] h-[24.701px]" />
        <p
          className="text-28 xl:text-35 font-medium"
          data-aos-duration="600"
          data-aos="fade-up"
          data-aos-offset="-300"
          data-aos-delay={delay}
        >
          {+balance !== 0 && Math.floor(+balance) < 1
            ? "< 0"
            : formatNumber(Math.round(+balance))}
        </p>
        <p className="text-muted text-16 xl:text-18 font-medium">
          {balanceLeft ? "Balance Left" : "UCO"}
        </p>
      </div>

      <Button className="w-fit" onClick={onClick} disabled={disabled}>
        {buttonArrow === "left" && <ArrowLeft size="18" />} {buttonLabel}{" "}
        {buttonArrow === "right" && <ArrowRight size="18" />}
      </Button>
    </div>
  );
}
