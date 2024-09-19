import { useState } from "react";
import { formatEther } from "viem";
import { useAccount, useReadContracts, useSwitchChain } from "wagmi";
import { migrationConfig } from "../../config/networks.ts";
import arrowRight from "../../src/images/networks/arrow-right.svg";
import {
  MigrationNetwork,
  MigrationNetworkWithBalance,
  Network,
} from "../../src/types";
import { Button } from "../button";
import BalanceCard from "./balance-card";
import BalanceDisplay from "./balance-display";
import MigrationNetworks from "./migration-networks";
import NetworkCard from "./network-card.tsx";

export default function Overview() {
  const [migrationNetwork, setMigrationNetwork] = useState<Network | null>(
    null,
  );
  const { switchChainAsync } = useSwitchChain();
  const [balanceSelectedNetwork, setBalanceSelectedNetwork] = useState<
    MigrationNetwork["name"]
  >(migrationConfig[0].name);

  const { address } = useAccount();
  const resultV1 = useReadContracts({
    contracts: migrationConfig.map((network) => ({
      address: network.v1Contract,
      abi: network.abi,
      functionName: "balanceOf",
      args: [address],
      chainId: network.id,
    })),
  });

  const resultV2 = useReadContracts({
    contracts: migrationConfig.map((network) => ({
      address: network.v2Contract,
      abi: network.abiV2,
      functionName: "balanceOf",
      args: [address],
      chainId: network.id,
    })),
  });

  const networkWithBalances: MigrationNetworkWithBalance[] =
    migrationConfig.map((m, index) => ({
      ...m,
      balanceV1: (resultV1?.data?.[index].result || 0n) as bigint,
      balanceV2: (resultV2?.data?.[index].result || 0n) as bigint,
    }));

  const selectedNetwork = networkWithBalances.find(
    (m) => m.name === migrationNetwork,
  );

  return (
    <div className="flex flex-col gap-[32px] xl:gap-[62px]">
      <div className="flex flex-col gap-[32px] lg:gap-[42px] xl:gap-[52px] md:items-center md:flex-row">
        <div className="flex gap-[15px] max-w-[250px] lg:max-w-[209px] xl:max-w-[273px] 2xl:max-w-[315px]">
          <div className="w-px bg-border  min-h-full"></div>
          <div className="flex flex-col gap-[10px]">
            <p className="text-12 xl:text-15 2xl:text-16 font-medium ">
              Archethic is updating its ERC-20 UCO token to a new version that
              is more secure and harmonized across all blockchains. If you hold
              UCO tokens, it is important to migrate them to this new version to
              ensure future compatibility.
            </p>
            <a
              href={"https://wiki.archethic.net/category/FAQ"}
              target={"_blank"}
            >
              <Button variant="secondary" className="w-fit">
                Learn more
              </Button>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-[8px] lg:gap-[16px] md:flex-row xl:gap-[32px] items-center w-full">
          <BalanceCard
            balance={networkWithBalances.reduce(
              (total, current) => total + current.balanceV1,
              0n,
            )}
            version="Version 1"
            onNetworkChange={(newNetworkName) =>
              setBalanceSelectedNetwork(newNetworkName)
            }
          />
          <img
            src={arrowRight}
            alt="arrow"
            className="min-w-[25px] h-[25px] lg:min-w-[45px] lg:h-[45px] rotate-90 md:rotate-0"
          />
          <BalanceCard
            balance={networkWithBalances.reduce(
              (total, current) => total + current.balanceV2,
              0n,
            )}
            version="Version 2"
            selectedNetwork={balanceSelectedNetwork}
          />
        </div>
      </div>
      {!selectedNetwork ? (
        <BalanceDisplay>
          {networkWithBalances.map((network, index) => (
            <NetworkCard
              key={network.id}
              onClick={async () => {
                await switchChainAsync({ chainId: network.id });
                setMigrationNetwork(network.name);
              }}
              networkIcon={network.icon}
              network={network.label}
              balance={formatEther(network.balanceV1)}
              disabled={network.balanceV1 === 0n}
              buttonArrow={"right"}
              buttonLabel={"Migrate"}
              delay={200 + index * 100}
            />
          ))}
        </BalanceDisplay>
      ) : (
        <MigrationNetworks
          onMigrationComplete={() => {
            resultV1.refetch();
            resultV2.refetch();
          }}
          network={selectedNetwork}
          onBack={() => {
            setMigrationNetwork(null);
          }}
        />
      )}
    </div>
  );
}
