import { ArrowRight } from "lucide-react";
import arrowBottom from "../../src/images/networks/arrow-bottom.svg";
import arrowRight from "../../src/images/networks/arrow-right.svg";
import uco from "../../src/images/networks/uco.svg";
import { Button } from "../button";
import { Input } from "../input";
import NetworkCard from "./network-card";
import { ChangeEvent, useEffect, useState } from "react";
import { MigrationNetworkWithBalance } from "../../src/types";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { ContractFunctionExecutionError, formatEther, parseUnits } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { config } from "../../config/wagmi/config.ts";
import Congratulations from "./congratulations.tsx";
import { convertTo8Digit, formatNumber } from "../../lib/utils.ts";
import { toast } from "react-toastify";

export type MigrationNetworksProps = {
  network: MigrationNetworkWithBalance;
  onBack: () => void;
  onMigrationComplete: () => void;
};

export default function MigrationNetworks({
  network,
  onBack,
  onMigrationComplete,
}: MigrationNetworksProps) {
  const [congratulations, setCongratulations] = useState(false);

  const { data: hash, isPending, writeContractAsync } = useWriteContract();

  const [sendInput, setSendInput] = useState("");
  const parsedInputAmount = parseUnits(sendInput, 18);
  const { address } = useAccount();

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });
  const chainId = useChainId();

  useEffect(() => {
    if (chainId !== network.id) onBack();
  }, [chainId]);

  const { data: allowance, refetch } = useReadContract({
    abi: network.abi,
    address: network.v1Contract,
    functionName: "allowance",
    args: [address, network.v2Contract],
  });
  const hasAllowance = ((allowance as bigint) || 0n) >= parsedInputAmount;

  const approve = async () => {
    const tx = await writeContractAsync({
      abi: network.abi,
      address: network.v1Contract,
      functionName: "approve",
      args: [network.v2Contract, parsedInputAmount],
    });

    await waitForTransactionReceipt(config.getClient(), { hash: tx });
    // onRefresh();
    refetch();
  };

  const migrate = async () => {
    try {
      const tx = await writeContractAsync({
        abi: network.abiV2,
        address: network.v2Contract,
        functionName: "migrate",
        args: [parsedInputAmount],
      });

      // await waitForTransaction({ chainId: network.id, hash: tx });
      const { status } = await waitForTransactionReceipt(config.getClient(), {
        hash: tx,
      });
      if (status === "success") {
        setTimeout(() => setCongratulations(true), 2000);
      } else {
        onMigrationComplete();
        toast.error(
          () => (
            <>
              Transaction failed. You can check it
              <a href={`${network.explorer}/tx/${tx}`} target={"_blank"}>
                {" "}
                here
              </a>
            </>
          ),
          { theme: "colored", position: "bottom-center" },
        );
      }
    } catch (e: any) {
      const error = e as ContractFunctionExecutionError;
      toast.error(error.cause.shortMessage);
      console.error(error);
    }
  };

  const sendInputChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]*\.?[0-9]{0,18}$/g;
    const value = event.target.value;
    if (!regex.test(value)) return;

    if (parseUnits(value, 18) > network.balanceV1) return;

    setSendInput(value);
  };

  return congratulations ? (
    <Congratulations
      onClick={(back) => {
        back && onBack();
        setCongratulations(false);
        setSendInput("");
      }}
      amount={sendInput}
      amountLeft={network.balanceV1}
      txHash={hash}
      explorer={network.explorer}
      network={network.label}
      logo={network.icon}
    />
  ) : (
    <div className="bg-purple-light border border-border-light p-[28px] xl:p-[24px] 2xl:p-[32px] rounded-[10px]">
      <div className="flex flex-col md:flex-row gap-[32px] items-center">
        <NetworkCard
          onClick={onBack}
          networkIcon={network.icon}
          network={network.name}
          balance={formatEther(network.balanceV1)}
          buttonLabel={"Back"}
          buttonArrow={"left"}
        />
        <div className="w-full md:w-px bg-border-dark h-px md:h-[232px]"></div>
        <div className="flex flex-col gap-[24px] lg:gap-[32px] w-full md:w-2/3 md:pl-[36px] ">
          <div className="flex flex-col lg:flex-row lg:gap-[18px] xl:gap-[30px]">
            <div className="w-full flex flex-col gap-[8px] relative">
              <label className="text-16 font-medium">Send</label>
              <div className="relative">
                <Input
                  iconY
                  placeholder="0.00"
                  className="pb-[33px]"
                  icon={<img src={uco} alt="uco" />}
                  value={sendInput}
                  onChange={sendInputChangeHandle}
                  readOnly={isPending || isConfirming}
                />
                <div className="absolute bottom-[8px] right-[14px] w-full flex items-center justify-end gap-[10px] cursor-pointer">
                  <p className="text-10 font-medium text-muted text-right">
                    Max {formatNumber(+formatEther(network.balanceV1))}
                  </p>
                  <button
                    className="px-[6px] py-[2px] max-h-[18px] bg-purple-gradient w-fit rounded-[10px] border border-border text-10"
                    onClick={() => setSendInput(formatEther(network.balanceV1))}
                  >
                    Max
                  </button>
                </div>
              </div>
              {sendInput && parseUnits(sendInput, 8) === 0n && (
                <div
                  className={"text-red-700 text-sm -bottom-4 lg:absolute pl-1"}
                >
                  You can't migrate less than 10e-8 token
                </div>
              )}
            </div>
            <div className="h-[70px] w-[106px] lg:w-[98px] lg:h-[117px] flex items-center justify-center mx-auto">
              <img
                src={arrowBottom}
                alt="arrow-bottom"
                className="w-[45px] h-[45px] lg:hidden"
              />
              <img
                src={arrowRight}
                alt="arrow-bottom"
                className="min-w-[45px] h-[45px] hidden lg:block"
              />
            </div>
            <div className="w-full flex flex-col gap-[8px]">
              <label className="text-16 font-medium">Receive</label>
              <Input
                className="lg:pb-[33px]"
                iconY
                placeholder="0.00"
                icon={<img src={uco} alt="uco" />}
                value={convertTo8Digit(sendInput)}
                readOnly
              />
            </div>
          </div>
          <Button
            className="w-fit mx-auto"
            onClick={hasAllowance ? migrate : approve}
            disabled={
              isPending || isConfirming || parseUnits(sendInput, 8) === 0n
            }
          >
            {isPending || isConfirming
              ? "Confirming..."
              : hasAllowance
                ? "Migrate"
                : "Approve"}{" "}
            {!isPending && !isConfirming && <ArrowRight size="18" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
