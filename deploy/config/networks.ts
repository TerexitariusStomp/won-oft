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
  gnosis: {
    eid: 30145,
    endpoint: process.env.LZ_ENDPOINT_GNOSIS || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  polygon: {
    eid: 30109,
    endpoint: process.env.LZ_ENDPOINT_POLYGON || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  polygonZKEVM: {
    eid: 30158,
    endpoint: process.env.LZ_ENDPOINT_POLYGONZKEVM || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  arbitrum: {
    eid: 30110,
    endpoint: process.env.LZ_ENDPOINT_ARBITRUM || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  optimism: {
    eid: 30111,
    endpoint: process.env.LZ_ENDPOINT_OPTIMISM || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  berachain: {
    eid: 30362,
    endpoint: process.env.LZ_ENDPOINT_BERACHAIN || "0x6F475642a6e85809B1c36Fa62763669b1b48DD5B",
  },
  botanix: {
    eid: 30376,
    endpoint: process.env.LZ_ENDPOINT_BOTANIX || "0x6F475642a6e85809B1c36Fa62763669b1b48DD5B",
  },
  celo: {
    eid: 30125,
    endpoint: process.env.LZ_ENDPOINT_CELO || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  codex: {
    eid: 30323,
    endpoint: process.env.LZ_ENDPOINT_CODEX || "0xcb566e3B6934Fa77258d68ea18E931fa75e1aaAa",
  },
  hemi: {
    eid: 30329,
    endpoint: process.env.LZ_ENDPOINT_HEMI || "0x6F475642a6e85809B1c36Fa62763669b1b48DD5B",
  },
  hyperevm: {
    eid: 30367,
    endpoint: process.env.LZ_ENDPOINT_HYPEREVM || "0x3A73033C0b1407574C76BdBAc67f126f6b4a9AA9",
  },
  ink: {
    eid: 30339,
    endpoint: process.env.LZ_ENDPOINT_INK || "0xca29f3A6f966Cb2fc0dE625F8f325c0C46dbE958",
  },
  katana: {
    eid: 30375,
    endpoint: process.env.LZ_ENDPOINT_KATANA || "0x6F475642a6e85809B1c36Fa62763669b1b48DD5B",
  },
  linea: {
    eid: 30183,
    endpoint: process.env.LZ_ENDPOINT_LINEA || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  monad: {
    eid: 30390,
    endpoint: process.env.LZ_ENDPOINT_MONAD || "0x6F475642a6e85809B1c36Fa62763669b1b48DD5B",
  },
  peaq: {
    eid: 30302,
    endpoint: process.env.LZ_ENDPOINT_PEAQ || "0x6F475642a6e85809B1c36Fa62763669b1b48DD5B",
  },
  plasma: {
    eid: 30383,
    endpoint: process.env.LZ_ENDPOINT_PLASMA || "0x6F475642a6e85809B1c36Fa62763669b1b48DD5B",
  },
  sonic: {
    eid: 30332,
    endpoint: process.env.LZ_ENDPOINT_SONIC || "0x6F475642a6e85809B1c36Fa62763669b1b48DD5B",
  },
  mantle: {
    eid: 30181,
    endpoint: process.env.LZ_ENDPOINT_MANTLE || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  scroll: {
    eid: 30214,
    endpoint: process.env.LZ_ENDPOINT_SCROLL || "0x1a44076050125825900e736c501f859c50fE728c",
  },
  avalanche: {
    eid: 30106,
    endpoint: process.env.LZ_ENDPOINT_AVALANCHE || "0x1a44076050125825900e736c501f859c50fE728c",
  },
};
