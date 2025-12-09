import { ethers, network } from "hardhat";
import { lzNetworks } from "./config/networks";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const cfg = lzNetworks[network.name];
  if (!cfg) {
    throw new Error(`No LayerZero config for network '${network.name}'`);
  }

  if (cfg.eid <= 0) {
    throw new Error(`Fill in lzNetworks.${network.name}.eid before deploying`);
  }
  if (!cfg.endpoint) {
    throw new Error(`Set LZ endpoint for ${network.name} (LZ_ENDPOINT_${network.name.toUpperCase()})`);
  }

  const [deployer] = await ethers.getSigners();

  const treasury = process.env.TREASURY;
  if (!treasury) {
    throw new Error("TREASURY env var must be set");
  }

  const delegate = process.env.DELEGATE || deployer.address;
  const initialRecipient = process.env.MINT_RECIPIENT || deployer.address;
  const mintThisChain = (process.env.MINT_THIS_CHAIN || "").toLowerCase() === "true";
  const initialMint = mintThisChain ? ethers.parseUnits("1000000", 18) : 0n;

  console.log(`Deploying WON from ${deployer.address} to ${network.name}`);
  console.log(`  treasury: ${treasury}`);
  console.log(`  delegate/owner: ${delegate}`);
  console.log(`  initial mint: ${mintThisChain ? "1,000,000 WON" : "0 (satellite chain)"}`);

  const wonFactory = await ethers.getContractFactory("WONTaxOFT");
  const won = await wonFactory.deploy(cfg.endpoint, delegate, treasury, initialRecipient, initialMint);
  await won.waitForDeployment();

  console.log(`WON deployed to ${await won.getAddress()}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
