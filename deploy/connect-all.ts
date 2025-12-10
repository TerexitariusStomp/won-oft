import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { lzNetworks } from "./config/networks";
import { WONTaxOFT__factory } from "../typechain-types";

dotenv.config();

type Network =
  | "ethereum"
  | "arbitrum"
  | "base"
  | "bsc"
  | "celo"
  | "gnosis"
  | "linea"
  | "monad"
  | "optimism"
  | "scroll"
  | "avalanche"
  | "sonic";

const addresses: Record<Network, string> = {
  ethereum: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
  arbitrum: "0x35aa94781FAcf8cAB70CBc7Fac6FccB4ECF346b5",
  base: "0xec229Ce2A929c0418bAa91DC9b74e69490254c33",
  bsc: "0xb78C7A882CE6E9Ec941B693FE8CAc10BD572f45B",
  celo: "0x2a9Ea5A9209531d47d1269e95F66939795b35daC",
  gnosis: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
  linea: "0x7aA13f5978566878B97fd3b8f7586DEce121B6A9",
  monad: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
  optimism: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
  scroll: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
  avalanche: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
  sonic: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
};

const networks: Network[] = [
  "ethereum",
  "arbitrum",
  "base",
  "bsc",
  "celo",
  "gnosis",
  "linea",
  "monad",
  "optimism",
  "scroll",
  "avalanche",
  "sonic",
];

const gasOverrides: Partial<Record<Network, { maxFeePerGas?: bigint; maxPriorityFeePerGas?: bigint }>> = {
  celo: {
    // Bump to ~30 gwei to avoid replacement underpriced on Celo
    maxFeePerGas: 30_000_000_000n,
    maxPriorityFeePerGas: 5_000_000_000n,
  },
};

const requiredEnv = (key: string) => {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
};

async function setPeerWithRetry(
  won: ReturnType<typeof WONTaxOFT__factory.connect>,
  dstEid: number,
  peerBytes32: string,
  dstName: string,
  overrides: Record<string, any> = {}
) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const tx = await won.setPeer(dstEid, peerBytes32, overrides);
      await tx.wait();
      console.log(`  set -> ${dstName} (attempt ${attempt + 1})`);
      return;
    } catch (err: any) {
      const msg = (err?.message || "").toLowerCase();
      if (msg.includes("already known") || msg.includes("nonce") || msg.includes("already imported")) {
        console.log(`  skip error (likely already broadcast/nonced): ${err.message}`);
        return;
      }
      if (msg.includes("replacement")) {
        // bump fee slightly and retry
        const bump = (overrides.maxFeePerGas || 0n) * 110n / 100n || undefined;
        const priorityBump = (overrides.maxPriorityFeePerGas || 0n) * 120n / 100n || undefined;
        overrides = {
          ...overrides,
          ...(bump ? { maxFeePerGas: bump } : {}),
          ...(priorityBump ? { maxPriorityFeePerGas: priorityBump } : {}),
        };
        console.log(`  replacement underpriced, bumping gas and retrying (attempt ${attempt + 1})`);
        continue;
      }
      if (attempt === 2) throw err;
      console.log(`  error (attempt ${attempt + 1}): ${err.message}, retrying...`);
      await new Promise((res) => setTimeout(res, 1500));
    }
  }
}

const main = async () => {
  const deployerKey = requiredEnv("DEPLOYER_KEY");

  for (const src of networks) {
    const rpcKey = `RPC_${src.toUpperCase()}`;
    const rpc = requiredEnv(rpcKey);

    const provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(deployerKey, provider);

    const wonAddress = addresses[src];
    if (!wonAddress) throw new Error(`Missing address for ${src}`);

    const won = WONTaxOFT__factory.connect(wonAddress, wallet);
    console.log(`[${src}] using ${wonAddress} from ${wallet.address}`);

    for (const dst of networks) {
      if (dst === src) continue;
      const peerAddr = addresses[dst];
      const peerCfg = lzNetworks[dst];
      if (!peerCfg?.eid) throw new Error(`Missing LayerZero config for ${dst}`);
      const peerBytes32 = ethers.zeroPadValue(ethers.getAddress(peerAddr), 32);
      const overrides = gasOverrides[src] ? { ...gasOverrides[src] } : {};

      try {
        const already = await won.isPeer(peerCfg.eid, peerBytes32);
        if (already) {
          console.log(`  [skip] ${dst} already set`);
          continue;
        }
      } catch {
        // continue and attempt to set
      }

      console.log(`  setting peer -> ${dst} (eid=${peerCfg.eid}) : ${peerAddr}`);
      await setPeerWithRetry(won, peerCfg.eid, peerBytes32, dst, overrides);
    }
  }

  console.log("All peers set.");
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
