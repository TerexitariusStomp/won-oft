import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { lzNetworks } from "./config/networks";
import { WONTaxOFT__factory } from "../typechain-types";

dotenv.config();

const allowedNetworks = [
  "arbitrum",
  "avalanche",
  "base",
  "bsc",
  "celo",
  "ethereum",
  "gnosis",
  "linea",
  "monad",
  "optimism",
  "scroll",
  "sonic",
] as const;

type AllowedNetwork = (typeof allowedNetworks)[number];

const requiredEnv = (key: string) => {
  const v = process.env[key];
  if (!v) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return v;
};

const main = async () => {
  const deployerKey = requiredEnv("DEPLOYER_KEY");
  const treasury = requiredEnv("TREASURY");
  const delegate = requiredEnv("DELEGATE");
  const mintRecipient = requiredEnv("MINT_RECIPIENT");
  const canonical = requiredEnv("MINT_CANONICAL_NETWORK").toLowerCase();

  if (!allowedNetworks.includes(canonical as AllowedNetwork)) {
    throw new Error(`MINT_CANONICAL_NETWORK must be one of: ${allowedNetworks.join(", ")}`);
  }

  const tasks = allowedNetworks.map(async (name) => {
    const rpcKey = `RPC_${name.toUpperCase()}`;
    const rpcUrl = process.env[rpcKey];
    if (!rpcUrl) {
      throw new Error(`Missing RPC for ${name} (${rpcKey})`);
    }

    const cfg = lzNetworks[name];
    if (!cfg?.endpoint || cfg.eid <= 0) {
      throw new Error(`Missing LayerZero config for ${name} in deploy/config/networks.ts`);
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(deployerKey, provider);

    const initialMint = name === canonical ? ethers.parseUnits("1000000", 18) : 0n;

    console.log(`[${name}] deploying from ${wallet.address} (mint ${initialMint > 0 ? "1,000,000" : "0"})`);

    const factory = new WONTaxOFT__factory(wallet);
    const won = await factory.deploy(cfg.endpoint, delegate, treasury, mintRecipient, initialMint);
    await won.waitForDeployment();

    const address = await won.getAddress();
    console.log(`[${name}] deployed at ${address}`);

    return { name, address };
  });

  const results = await Promise.allSettled(tasks);

  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length) {
    failures.forEach((f) => {
      console.error(`Failed: ${(f as PromiseRejectedResult).reason}`);
    });
    throw new Error(`Deployment failed on ${failures.length} network(s). See errors above.`);
  }

  console.log("All deployments complete.");
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
