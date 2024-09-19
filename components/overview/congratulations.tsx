import { ArrowRight } from "lucide-react";
import { formatEther } from "viem";
import { convertTo8Digit } from "../../lib/utils.ts";
import txhashIcon from "../../src/images/networks/txhash-link.svg";
import uco from "../../src/images/networks/uco.svg";
import { Button } from "../button";
import NewtworkCard from "./network-card";

export type CongratulationsProps = {
  amount: string;
  txHash?: string;
  onClick: (back?: boolean) => void;
  amountLeft: bigint;
  explorer: string;
  network: string;
  logo: string;
};

export default function Congratulations({
  amount,
  onClick,
  amountLeft,
  txHash,
  explorer,
  network,
  logo,
}: CongratulationsProps) {
  return (
    <div className="p-[18px] flex flex-col gap-[24px] bg-purple-light border border-border-light rounded-[10px]">
      <div className="flex flex-col gap-[32px] lg:justify-center items-center">
        <p className="text-18 text-center font-medium">
          Congratulations, you have migrated your tokens and received
        </p>
        <div className="flex flex-col gap-[18px]">
          <div className="px-[18px] py-[10px] bg-purple-dark flex items-center gap-[10px] border border-border-light rounded-[10px] w-fit mx-auto">
            <p className="text-32 font-medium">{convertTo8Digit(amount)}</p>
            <img src={uco} alt="uco" className="w-[29px] h-[24.701px]" />
          </div>
          <div className="flex items-center gap-[10px] justify-center">
            <p className="text-13 font-medium break-all">
              Tx Hash : {txHash?.slice(0, 8)}...{txHash?.slice(-6)}
            </p>
            <a href={`${explorer}/tx/${txHash}`} target={"_blank"}>
              <img
                src={txhashIcon}
                alt="txhsash"
                className="w-[20px] h-[20px]"
              />
            </a>
          </div>
        </div>
      </div>

      {amountLeft > 0n && (
        <>
          <div className="w-full h-px bg-border-light lg:w-[275px] mx-auto" />
          <div className={"flex justify-center"}>
            <NewtworkCard
              className="bg-transparent p-[32px]"
              networkIcon={logo}
              network={network}
              balance={formatEther(amountLeft)}
              balanceLeft={amountLeft > 0n}
              migrationCompleted={false}
              buttonLabel={"Migrate"}
              buttonArrow={"right"}
              onClick={() => onClick()}
            />
          </div>
        </>
      )}
      <Button className="w-fit mx-auto lg:mr-0" onClick={() => onClick(true)}>
        Home Page <ArrowRight size="18" />
      </Button>
    </div>
  );
}
