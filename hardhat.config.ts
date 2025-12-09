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
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    hardhat: {},
    ethereum: sharedNetwork(process.env.RPC_ETHEREUM, 1),
    base: sharedNetwork(process.env.RPC_BASE, 8453),
    bsc: sharedNetwork(process.env.RPC_BSC, 56),
    gnosis: sharedNetwork(process.env.RPC_GNOSIS, 100),
    polygon: sharedNetwork(process.env.RPC_POLYGON, 137),
    polygonZKEVM: sharedNetwork(process.env.RPC_POLYGONZKEVM, 1101),
    arbitrum: sharedNetwork(process.env.RPC_ARBITRUM, 42161),
    optimism: sharedNetwork(process.env.RPC_OPTIMISM, 10),
    berachain: sharedNetwork(process.env.RPC_BERACHAIN, 80094),
    botanix: sharedNetwork(process.env.RPC_BOTANIX, 3637),
    celo: sharedNetwork(process.env.RPC_CELO, 42220),
    codex: sharedNetwork(process.env.RPC_CODEX, 81224),
    hemi: sharedNetwork(process.env.RPC_HEMI, 43111),
    hyperevm: sharedNetwork(process.env.RPC_HYPEREVM, 999),
    ink: sharedNetwork(process.env.RPC_INK, 57073),
    katana: sharedNetwork(process.env.RPC_KATANA, 747474),
    linea: sharedNetwork(process.env.RPC_LINEA, 59144),
    monad: sharedNetwork(process.env.RPC_MONAD, 143),
    peaq: sharedNetwork(process.env.RPC_PEAQ, 3338),
    plasma: sharedNetwork(process.env.RPC_PLASMA, 9745),
    sonic: sharedNetwork(process.env.RPC_SONIC, 146),
    mantle: sharedNetwork(process.env.RPC_MANTLE, 5000),
    scroll: sharedNetwork(process.env.RPC_SCROLL, 534352),
    avalanche: sharedNetwork(process.env.RPC_AVALANCHE, 43114),
  },
};

export default config;
