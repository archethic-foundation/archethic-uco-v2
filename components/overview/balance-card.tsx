"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { cn, formatNumber } from "../../lib/utils";
import logoBalance from "../../src/images/logo-balance.png";
import copyIcon from "../../src/images/networks/copy.svg";

import { ChevronDown } from "lucide-react";
import { formatUnits } from "viem";
import { migrationConfig } from "../../config/networks.ts";
import { MigrationNetwork } from "../../src/types";
import Badge from "../badge";

type BalanceCardProps = {
  balance: bigint;
  version: "Version 1" | "Version 2";
  className?: string;
  onNetworkChange?: (newNetworkName: MigrationNetwork["name"]) => void;
  selectedNetwork?: MigrationNetwork["name"];
};

export default function BalanceCard({
  balance,
  version,
  className,
  onNetworkChange,
  selectedNetwork,
}: BalanceCardProps) {
  const counterRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<{ value: number }>({ value: 0 });
  const formatedBalance = formatUnits(
    balance,
    version === "Version 1" ? 18 : 8
  );

  useEffect(() => {
    const counter = counterRef.current;
    if (counter) {
      gsap.to(countRef.current, {
        value: formatedBalance,
        duration: 2,
        ease: "power3.inOut",
        onUpdate: () => {
          counter.textContent =
            +countRef.current.value !== 0 &&
            Math.floor(+countRef.current.value) < 1
              ? "<0"
              : formatNumber(Math.round(+countRef.current.value));
        },
      });
    }
  }, [balance]);

  return (
    <div className={cn("relative w-full lg:max-w-[361px]", className)}>
      <div
        className={cn(
          "py-[24px] px-[14px] md:p-[14px] lg:p-[24px] xl:p-[32px] flex flex-col pb-[30px] md:pb-[45px] lg:pb-[60px] xl:pb-[75px] rounded-[10px] border border-border-light relative overflow-hidden w-full"
        )}
      >
        <div
          className={cn(
            "absolute top-0 left-0 right-0 bottom-0  blur-[25px] w-full",
            version === "Version 1"
              ? "bg-[rgba(22,0,85,0.70)]"
              : "bg-balance-card bg-center"
          )}
        ></div>
        <div className="relative z-10">
          <Badge className="bg-transparent border border-border-light py-[5px] px-[7px] lg:py-[10px] lg:px-[15px] font-medium text-12 md:text-8 lg:text-15 lg:h-[40px]">
            {version}
          </Badge>
          <div className="flex flex-col items-end">
            <h2 className="text-16 md:text-12 lg:text-26 font-semibold">
              My Balance
            </h2>
            <div className="flex items-center gap-[4px] lg:gap-[10px]">
              <img
                src={logoBalance}
                alt="logo balance"
                className="w-[20.308px] h-[18px] lg:w-[44px] lg:h-[39px]"
              />
              <p
                ref={counterRef}
                className="text-18 md:text-16 lg:text-35 font-medium"
              >
                {formatedBalance}
              </p>
            </div>
          </div>
        </div>
      </div>

      <SelectNetwork
        version={version}
        onNetworkChange={onNetworkChange}
        selectedNetworkNameExternal={selectedNetwork}
      />
    </div>
  );
}

export function SelectNetwork({
  version,
  onNetworkChange,
  selectedNetworkNameExternal,
}: {
  version: "Version 1" | "Version 2";
  onNetworkChange?: (newNetworkName: MigrationNetwork["name"]) => void;
  selectedNetworkNameExternal?: MigrationNetwork["name"];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNetworkName, setSelectedNetworkName] = useState<
    MigrationNetwork["name"]
  >(migrationConfig[0].name);
  const [availableNetworks, setAvailableNetworks] = useState(
    migrationConfig.slice(1)
  );

  const selectedNetwork =
    migrationConfig.find((n) => n.name === selectedNetworkName) ||
    migrationConfig[0];

  const selectedNetworkExternal = migrationConfig.find(
    (n) => n.name === selectedNetworkNameExternal
  );

  const handleNetworkSelection = (network: MigrationNetwork["name"]) => {
    setSelectedNetworkName(network);
    onNetworkChange?.(network);
  };

  useEffect(() => {
    setAvailableNetworks(
      migrationConfig.filter((n) => n.name !== selectedNetworkName)
    );
  }, [selectedNetworkName]);

  return (
    <div
      className={cn(
        "absolute top-[91px] lg:top-[167px] xl:top-[175px] max-w-[200px] lg:max-w-[300px] lg:w-fit left-[14px] lg:left-[24px] xl:left-[32px] right-[14px] lg:right-[24px] xl:right-[32px] px-[8px] py-[4px] lg:py-[7px] lg:px-[12px] border border-border-light rounded-[20px] cursor-pointer",
        isOpen ? "bg-purple-dark" : "bg-transparent",
        version === "Version 1" ? "md:max-w-[200px]" : "max-w-fit"
      )}
      onClick={() => {
        if (version === "Version 1") {
          setIsOpen(!isOpen);
        }
      }}
    >
      <div className="flex flex-col gap-[5px]  ">
        <NetworkItem
          isOpen={isOpen}
          version={version}
          network={selectedNetworkExternal || selectedNetwork}
          isSelected={true}
          onClick={() => {}}
        />
        {isOpen && version === "Version 1" && (
          <>
            {availableNetworks.map((network) => (
              <NetworkItem
                isOpen={isOpen}
                key={network.id}
                version={version}
                network={network}
                isSelected={false}
                onClick={() => handleNetworkSelection(network.name)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function NetworkItem({
  network,
  isSelected,
  isOpen,
  onClick,
  version,
}: {
  network: MigrationNetwork;
  isSelected: boolean;
  isOpen: boolean;
  onClick: () => void;
  version?: "Version 1" | "Version 2";
}) {
  return (
    <div className="flex gap-[5px]  items-center" onClick={onClick}>
      <div className="flex items-center gap-px lg:gap-[3px]">
        {version === "Version 1" && (
          <ChevronDown
            className={cn(
              "w-[10px] h-[10px] lg:w-[16px] lg:h-[16px]",
              !isSelected ? "text-transparent" : "",
              isOpen
                ? "rotate-180 transition-all duration-300"
                : "rotate-360 transition-all duration-300"
            )}
          />
        )}
        <div
          className={cn(
            "flex items-center gap-[5px] lg:gap-[10px]",
            !isSelected
              ? "!border-t-border-light border border-transparent pt-[5px]"
              : ""
          )}
        >
          <img
            src={network.icon}
            alt={network.name}
            className="w-[10px] h-[10px] lg:w-[16px] lg:h-[16px]"
          />
          <p className="text-12 md:text-8 lg:text-12 font-medium flex items-center gap-1">
            <span className="hidden sm:block">Address : </span>{" "}
            {(version === "Version 1"
              ? network.v1Contract
              : network.v2Contract
            ).slice(0, 15)}
            ...
          </p>
          {isSelected && (
            <img
              src={copyIcon}
              alt="copy"
              className="w-[10px] h-[10px] lg:w-[16px] lg:h-[16px]"
              onClick={() =>
                navigator.clipboard.writeText(
                  version === "Version 1"
                    ? network.v1Contract
                    : network.v2Contract
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
