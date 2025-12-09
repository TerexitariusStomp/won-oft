import { ethers, network } from "hardhat";
import { lzNetworks } from "./config/networks";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const wonAddress = process.env.WON_ADDRESS;
  if (!wonAddress) {
    throw new Error("Set WON_ADDRESS to the local deployment address");
  }

  const peerAddress = process.env.PEER_ADDRESS;
  if (!peerAddress) {
    throw new Error("Set PEER_ADDRESS to the remote WON contract");
  }

  const peerNetworkName = process.env.PEER_NETWORK;
  if (!peerNetworkName) {
    throw new Error("Set PEER_NETWORK to the remote network name (matching config)");
  }

  const peerCfg = lzNetworks[peerNetworkName];
  if (!peerCfg || peerCfg.eid <= 0) {
    throw new Error(`Fill in lzNetworks.${peerNetworkName}.eid before setting a peer`);
  }

  const won = await ethers.getContractAt("WONTaxOFT", wonAddress);

  const peerBytes32 = ethers.zeroPadValue(ethers.getAddress(peerAddress), 32);
  console.log(
    `Setting peer for ${network.name} -> ${peerNetworkName} (eid=${peerCfg.eid}) to ${peerAddress} on contract ${wonAddress}`
  );
  const tx = await won.setPeer(peerCfg.eid, peerBytes32);
  await tx.wait();
  console.log("Peer set");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
