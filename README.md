# WON LayerZero OFT (1% tax)

ERC20 + LayerZero OFT v2 implementation for the WON token with a 1% transfer tax that is routed to a treasury address. The tax only applies to local transfers; LayerZero burn/mint during bridging is exempt so cross‑chain moves are not penalized.

## Layout
- `contracts/WONTaxOFT.sol` — OFT token with 1% tax and optional fee exemptions.
- `deploy/deploy-won.ts` — deploy script; only one chain should mint the 1,000,000 supply.
- `deploy/set-peer.ts` — set LayerZero peers between chain instances.
- `deploy/config/networks.ts` — fill in LayerZero endpoint IDs/addresses per chain.
- `.env.example` — environment template (RPCs, keys, endpoints).

## Quick start
1) Install deps  
```bash
cd won-oft
npm install
```

2) Fill `.env` (copy from `.env.example`), including:
   - `DEPLOYER_KEY` (same signer on all chains)
   - `TREASURY`, `DELEGATE` (OApp owner), `MINT_RECIPIENT`
   - RPCs for every chain you plan to deploy to
   - `LZ_ENDPOINT_<NETWORK>` values from the official LayerZero docs

3) `deploy/config/networks.ts` already includes the endpoint IDs you provided (Base 30184, BSC 30102, Avalanche 30106, Arbitrum 30110, Berachain 30362, Botanix 30376, Celo 30125, Codex 30323, Ethereum 30101, Gnosis 30145, Hemi 30329, HyperEVM 30367, Ink 30339, Katana 30375, Linea 30183, Mantle 30181, Monad 30390, Optimism 30111, peaq 30302, Plasma 30383, Polygon 30109, Polygon zkEVM 30158, Scroll 30214, Sonic 30332). Verify against the official LayerZero docs before deploying.

4) Choose a canonical chain for the initial 1,000,000 WON supply:
   - On that chain set `MINT_THIS_CHAIN=true`
   - On all other chains set `MINT_THIS_CHAIN=false`

5) Deploy to each network (example):
```bash
# Canonical chain (mints supply)
MINT_THIS_CHAIN=true npm run deploy:won --network=ethereum

# Satellite chains (no mint)
MINT_THIS_CHAIN=false npm run deploy:won --network=base
MINT_THIS_CHAIN=false npm run deploy:won --network=polygon
# ...repeat for every chain in the list
```

6) Set cross-chain peers after every deployment pair:
```bash
WON_ADDRESS=<local_won_address> \
PEER_ADDRESS=<remote_won_address> \
PEER_NETWORK=<remote_network_name_from_config> \
npm run set-peer --network=ethereum
```
Run the command from each local chain to every remote chain you want connected (bidirectional).

## Notes
- Supply: 1,000,000 * 10^18, minted only on the canonical chain you pick.
- Tax: 1% to `treasury`; you can exempt addresses with `setFeeExempt`.
- Bridging: no tax on LayerZero send/receive (burn/mint).
- Owner: set to `DELEGATE` passed to the constructor; use `transferOwnership` if you want to move it.
- Make sure all RPCs and LayerZero endpoints are correct before running the scripts.
