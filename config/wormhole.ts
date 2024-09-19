import { WormholeConnectConfig } from "@wormhole-foundation/wormhole-connect";

export const wormholeConfig: WormholeConnectConfig = {
  env: "testnet",
  networks: ["sepolia", "bsc"],
  tokensConfig: {
    UCOSepolia: {
      key: "UCOSepolia",
      symbol: "UCO",
      nativeChain: "sepolia",
      tokenId: {
        chain: "sepolia",
        address: "0xEBd9C8279e8208E8C5C3De23eE831cfF27D8CDba",
      },
      coinGeckoId: "basket",
      icon: "https://assets.coingecko.com/coins/images/34661/standard/BSKT_Logo.png?1705636891",
      color: "#2894EE",
      decimals: {
        default: 18,
      },
      foreignAssets: {
        bsc: {
          address: "0x857F7DcC5327648c54fF43f8b348272661B1AedC",
          decimals: 18,
        },
      },
    },
    UCOBSCTestnet: {
      key: "UCOBSCTestnet",
      symbol: "UCO",
      nativeChain: "bsc",
      tokenId: {
        chain: "bsc",
        address: "0x857F7DcC5327648c54fF43f8b348272661B1AedC",
      },
      coinGeckoId: "basket",
      icon: "https://assets.coingecko.com/coins/images/34661/standard/BSKT_Logo.png?1705636891",
      color: "#2894EE",
      decimals: {
        default: 18,
      },
      foreignAssets: {
        sepolia: {
          address: "0xEBd9C8279e8208E8C5C3De23eE831cfF27D8CDba",
          decimals: 18,
        },
      },
    },
  },
  nttGroups: {
    UCO: {
      nttManagers: [
        {
          address: "0x38276Ad0B68999BB894ac07161656028Dd4fBddD",
          chainName: "sepolia",
          tokenKey: "UCOSepolia",
          transceivers: [
            {
              address: "0xEbFb99345440e7E38bB2DcFD30DB154E5B136385",
              type: "wormhole",
            },
          ],
        },
        {
          address: "0xAa68D75Ee94F3563965ABb64DA6835a1E0f15756",
          chainName: "bsc",
          tokenKey: "UCOBSCTestnet",
          transceivers: [
            {
              address: "0x864723FBf0BEA188530E5afbF7cDE6351f5Eb20e",
              type: "wormhole",
            },
          ],
        },
      ],
    },
  },
  rpcs: {
    sepolia: "https://ethereum-sepolia.publicnode.com",
  },
};
