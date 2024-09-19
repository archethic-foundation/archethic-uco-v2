import { Abi } from "viem";

type Network = "eth" | "bsc" | "matic";

type MigrationNetwork = {
  name: Network;
  icon: string;
  label: string;
  v1Contract: `0x${string}`;
  v2Contract: `0x${string}`;
  abi: Abi;
  abiV2: Abi;
  id: number;
  explorer: string;
};

type MigrationNetworkWithBalance = MigrationNetwork & {
  balanceV1: bigint;
  balanceV2: bigint;
};
