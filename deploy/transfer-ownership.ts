import { ethers } from "ethers";
import * as dotenv from "dotenv";
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

const requiredEnv = (key: string) => {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
};

const main = async () => {
  const deployerKey = requiredEnv("DEPLOYER_KEY");
  const newOwner = requiredEnv("NEW_OWNER");

  for (const name of networks) {
    const rpcKey = `RPC_${name.toUpperCase()}`;
    const rpc = requiredEnv(rpcKey);
    const provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(deployerKey, provider);

    const addr = addresses[name];
    if (!addr) throw new Error(`Missing contract address for ${name}`);
    const won = WONTaxOFT__factory.connect(addr, wallet);

    const currentOwner = await won.owner();
    console.log(`[${name}] contract ${addr} current owner ${currentOwner}`);
    if (currentOwner.toLowerCase() === newOwner.toLowerCase()) {
      console.log(`  [skip] already owned by ${newOwner}`);
      continue;
    }

    const tx = await won.transferOwnership(newOwner);
    console.log(`  transferring... tx ${tx.hash}`);
    await tx.wait();
    console.log(`  transferred to ${newOwner}`);
  }

  console.log("Ownership transfer complete.");
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
