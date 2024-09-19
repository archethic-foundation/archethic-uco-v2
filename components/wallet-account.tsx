import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "./button";

interface Props {
  onClose: () => void;
}

export function WalletAccount({ onClose }: Props) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const [isOpen, setOpen] = useState(false);

  if (!address) return null;

  return (
    <div className={"flex flex-col md:flex-row gap-[18px] lg:gap-[20px]"}>
      <div
        className="relative py-[10px] px-[20px] flex items-center gap-[10px] border border-border-light bg-purple-dark rounded-[20px] md:cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        <div className="min-w-[13px] h-[13px] rounded-full bg-[#00FF19]"></div>
        <p className="text-16 font-medium break-all md:hidden">{address}</p>
        <p
          className="text-18 font-medium break-all hidden md:block"
          onClick={() => setOpen(!isOpen)}
        >
          {address?.slice(0, 7)}...
        </p>
        {isOpen && (
          <div className="absolute top-[66px] left-0 hidden md:block  break-all  bg-purple-med border border-border-light rounded-[20px] px-[20px] py-[10px] w-[333.19px]">
            {address}
          </div>
        )}
      </div>

      <Button
        variant="secondary"
        className="text-18 justify-center h-[45px]"
        onClick={() => {
          disconnect();
          onClose();
        }}
      >
        Disconnect
        <ArrowRight size="18" />
      </Button>
    </div>
  );
}
