import * as dotenv from "dotenv";

dotenv.config();

export type LayerZeroNetwork = {
  eid: number; // LayerZero Endpoint ID (v2)
  endpoint: string; // LayerZero endpoint address on that chain
};

// Fill the eid/endpoint values with the official values from LayerZero docs:
// https://docs.layerzero.network/v2/developers/evm/oapp/networks
export const lzNetworks: Record<string, LayerZeroNetwork> = {
  ethereum: {
    eid: 30101,
    endpoint: process.env.LZ_ENDPOINT_ETHEREUM || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  base: {
    eid: 30184,
    endpoint: process.env.LZ_ENDPOINT_BASE || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  bsc: {
    eid: 30102,
    endpoint: process.env.LZ_ENDPOINT_BSC || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  celo: {
    eid: 30125,
    endpoint: process.env.LZ_ENDPOINT_CELO || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  gnosis: {
    eid: 30145,
    endpoint: process.env.LZ_ENDPOINT_GNOSIS || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  linea: {
    eid: 30183,
    endpoint: process.env.LZ_ENDPOINT_LINEA || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  monad: {
    eid: 30390,
    endpoint: process.env.LZ_ENDPOINT_MONAD || "0x6F475642a6e85809B1c36Fa62763669b1b48DD5B",
  },
  optimism: {
    eid: 30111,
    endpoint: process.env.LZ_ENDPOINT_OPTIMISM || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  scroll: {
    eid: 30214,
    endpoint: process.env.LZ_ENDPOINT_SCROLL || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  sonic: {
    eid: 30332,
    endpoint: process.env.LZ_ENDPOINT_SONIC || "0x6F475642a6e85809B1c36Fa62763669b1b48DD5B",
  },
  arbitrum: {
    eid: 30110,
    endpoint: process.env.LZ_ENDPOINT_ARBITRUM || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  avalanche: {
    eid: 30106,
    endpoint: process.env.LZ_ENDPOINT_AVALANCHE || "0x1a44076050125825900e736c501f859c50fE728c",
  },
};
