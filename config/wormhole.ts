import { WormholeConnectConfig } from "@wormhole-foundation/wormhole-connect";

export const wormholeConfig: WormholeConnectConfig = {
  env: "mainnet",
  networks: ["polygon", "bsc", "ethereum"],
  tokensConfig: {
    UCOEthereum: {
      key: "UCOEthereum",
      symbol: "UCO",
      nativeChain: "ethereum",
      tokenId: {
        chain: "ethereum",
        address: "0x1A688D3d294ee7BcC1f59011DE93d608Dc21c377",
      },
      coinGeckoId: "archethic",
      icon: "https://assets.coingecko.com/coins/images/12330/standard/Archethic_Logo.png?1719358185",
      color: "#ee2828",
      decimals: {
        default: 8,
      },
      foreignAssets: {
        bsc: {
          address: "0xf1e5bbd997501a8439619266A09a54b2b499eAA3",
          decimals: 8,
        },
        polygon: {
          address: "0xaa53B93608C88EE55fAD8db4C504Fa20E52642aD",
          decimals: 8,
        },
      },
    },
    UCOBsc: {
      key: "UCOBsc",
      symbol: "UCO",
      nativeChain: "bsc",
      tokenId: {
        chain: "bsc",
        address: "0x857F7DcC5327648c54fF43f8b348272661B1AedC",
      },
      coinGeckoId: "archethic",
      icon: "https://assets.coingecko.com/coins/images/12330/standard/Archethic_Logo.png?1719358185",
      color: "#2894EE",
      decimals: {
        default: 8,
      },
      foreignAssets: {
        ethereum: {
          address: "0x1A688D3d294ee7BcC1f59011DE93d608Dc21c377",
          decimals: 8,
        },
        polygon: {
          address: "0xaa53B93608C88EE55fAD8db4C504Fa20E52642aD",
          decimals: 8,
        },
      },
    },
    UCOPolygon: {
      key: "UCOPolygon",
      symbol: "UCO",
      nativeChain: "polygon",
      tokenId: {
        chain: "polygon",
        address: "0xaa53B93608C88EE55fAD8db4C504Fa20E52642aD",
      },
      coinGeckoId: "archethic",
      icon: "https://assets.coingecko.com/coins/images/12330/standard/Archethic_Logo.png?1719358185",
      color: "#2894EE",
      decimals: {
        default: 8,
      },
      foreignAssets: {
        bsc: {
          address: "0xf1e5bbd997501a8439619266A09a54b2b499eAA3",
          decimals: 8,
        },
        ethereum: {
          address: "0x1A688D3d294ee7BcC1f59011DE93d608Dc21c377",
          decimals: 8,
        },
      },
    },
  },
  nttGroups: {
    UCO: {
      nttManagers: [
        {
          address: "0xB16Bf54398A913799D537C0c472394AeA4Fb8EfC",
          chainName: "ethereum",
          tokenKey: "UCOEthereum",
          transceivers: [
            {
              address: "0xC8d43BA20c6CE5F3dB8bF66F547940D422225b7c",
              type: "wormhole",
            },
          ],
        },
        {
          address: "0x01c07123229a583168536E2061A461602F0C1f79",
          chainName: "bsc",
          tokenKey: "UCOBsc",
          transceivers: [
            {
              address: "0x6B13D454b86e32d2C0eda1738c56327e28b1784F",
              type: "wormhole",
            },
          ],
        },
        {
          address: "0x7BD106409a543B8Ca77Ef618754aA9c913B89011",
          chainName: "polygon",
          tokenKey: "UCOPolygon",
          transceivers: [
            {
              address: "0x5183A428785f7d6aF139C7E68962FE203Cb141Dd",
              type: "wormhole",
            },
          ],
        },
      ],
    },
  },
};
