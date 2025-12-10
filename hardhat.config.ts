import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const accounts = process.env.DEPLOYER_KEY ? [process.env.DEPLOYER_KEY] : [];

const sharedNetwork = (url?: string, chainId?: number) => ({
  url: url || "http://localhost:8545",
  chainId,
  accounts,
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.22",
    settings: {
      viaIR: true,
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    hardhat: {},
    ethereum: sharedNetwork(process.env.RPC_ETHEREUM, 1),
    base: sharedNetwork(process.env.RPC_BASE, 8453),
    bsc: sharedNetwork(process.env.RPC_BSC, 56),
    gnosis: sharedNetwork(process.env.RPC_GNOSIS, 100),
    arbitrum: sharedNetwork(process.env.RPC_ARBITRUM, 42161),
    optimism: sharedNetwork(process.env.RPC_OPTIMISM, 10),
    celo: sharedNetwork(process.env.RPC_CELO, 42220),
    linea: sharedNetwork(process.env.RPC_LINEA, 59144),
    monad: sharedNetwork(process.env.RPC_MONAD, 143),
    scroll: sharedNetwork(process.env.RPC_SCROLL, 534352),
    avalanche: sharedNetwork(process.env.RPC_AVALANCHE, 43114),
    sonic: sharedNetwork(process.env.RPC_SONIC, 146),
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      ethereum: process.env.ETHERSCAN_API_KEY || "",
      arbitrum: process.env.ETHERSCAN_API_KEY || "",
      base: process.env.ETHERSCAN_API_KEY || "",
      bsc: process.env.ETHERSCAN_API_KEY || "",
      celo: process.env.ETHERSCAN_API_KEY || "",
      gnosis: process.env.ETHERSCAN_API_KEY || "",
      linea: process.env.ETHERSCAN_API_KEY || "",
      monad: process.env.ETHERSCAN_API_KEY || "",
      optimism: process.env.ETHERSCAN_API_KEY || "",
      scroll: process.env.ETHERSCAN_API_KEY || "",
      avalanche: process.env.ETHERSCAN_API_KEY || "",
      sonic: process.env.ETHERSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "arbitrum",
        chainId: 42161,
        urls: {
          apiURL: "https://api.arbiscan.io/api",
          browserURL: "https://arbiscan.io",
        },
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
      {
        network: "bsc",
        chainId: 56,
        urls: {
          apiURL: "https://api.bscscan.com/api",
          browserURL: "https://bscscan.com",
        },
      },
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.etherscan.io/v2/api?chainid=42220",
          browserURL: "https://celoscan.io",
        },
      },
      {
        network: "gnosis",
        chainId: 100,
        urls: {
          apiURL: "https://api.gnosisscan.io/api",
          browserURL: "https://gnosisscan.io",
        },
      },
      {
        network: "linea",
        chainId: 59144,
        urls: {
          apiURL: "https://api.lineascan.build/api",
          browserURL: "https://lineascan.build",
        },
      },
      {
        network: "optimism",
        chainId: 10,
        urls: {
          apiURL: "https://api-optimistic.etherscan.io/api",
          browserURL: "https://optimistic.etherscan.io",
        },
      },
      {
        network: "scroll",
        chainId: 534352,
        urls: {
          apiURL: "https://api.scrollscan.com/api",
          browserURL: "https://scrollscan.com",
        },
      },
      {
        network: "avalanche",
        chainId: 43114,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan",
          browserURL: "https://snowtrace.io",
        },
      },
      {
        network: "sonic",
        chainId: 146,
        urls: {
          apiURL: "https://api.sonicscan.org/api",
          browserURL: "https://sonicscan.org",
        },
      },
      {
        network: "monad",
        chainId: 143,
        urls: {
          apiURL: "https://api.monadscan.io/api",
          browserURL: "https://monadscan.io",
        },
      },
    ],
  },
};

export default config;
