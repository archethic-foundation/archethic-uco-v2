import { bsc, bscTestnet, mainnet, polygon } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { polygonAmoy, sepolia } from "viem/chains";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet, walletConnectWallet, walletConnectWallet],
    },
  ],
  {
    appName: "Archethic token Migration",
    projectId: "9574f4b26c628d89c80e5f0a8026868c",
  },
);

export const config = createConfig({
  chains: [mainnet, bsc, polygon, sepolia, polygonAmoy, bscTestnet],
  connectors,
  transports: {
    [mainnet.id]: http("https://eth-mainnet.alchemyapi.io/v2/xMdbzVgHW9-4yF1RoFbeWkjSX72lH9zB"),
    [bsc.id]: http("https://bsc-dataseed.bnbchain.org"),
    [polygon.id]: http("https://polygon-mainnet.g.alchemy.com/v2/xMdbzVgHW9-4yF1RoFbeWkjSX72lH9zB"),
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/xMdbzVgHW9-4yF1RoFbeWkjSX72lH9zB",
    ),
    [polygonAmoy.id]: http(
      "https://polygon-amoy.g.alchemy.com/v2/xMdbzVgHW9-4yF1RoFbeWkjSX72lH9zB",
    ),
    [bscTestnet.id]: http("https://bsc-testnet.publicnode.com"),
  },
});
