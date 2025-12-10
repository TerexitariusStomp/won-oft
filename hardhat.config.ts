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
};

export default config;
