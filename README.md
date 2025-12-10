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

3) `deploy/config/networks.ts` includes the endpoint IDs for the supported set: Ethereum 30101, Base 30184, BSC 30102, Gnosis 30145, Arbitrum 30110, Optimism 30111, Celo 30125, Linea 30183, Monad 30390, Scroll 30214, Avalanche 30106, Sonic 30332. Verify against the official LayerZero docs before deploying.

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

## Chain metadata
| Chain | Address | Image |
| --- | --- | --- |
| Ethereum Mainnet | 0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2 | https://gateway.pinata.cloud/ipfs/QmaMTBq3xaZqxW63ynsoA9mCbYWKuRx9S7SXnE4uwVMB2v |
| Arbitrum Mainnet | 0x35aa94781FAcf8cAB70CBc7Fac6FccB4ECF346b5 | https://gateway.pinata.cloud/ipfs/QmaiJCdbAgC6vPXpMKQNNY5gbUVr7AKALuvdTELUpJSDWi |
| Base Mainnet | 0xec229Ce2A929c0418bAa91DC9b74e69490254c33 | https://gateway.pinata.cloud/ipfs/QmaiJCdbAgC6vPXpMKQNNY5gbUVr7AKALuvdTELUpJSDWi |
| BNB | 0xb78C7A882CE6E9Ec941B693FE8CAc10BD572f45B | https://gateway.pinata.cloud/ipfs/QmZHeRhBYvFbQsANeHXAZbNwb5fRificXWy5syjsh3Rrs2 |
| Celo | 0x2a9Ea5A9209531d47d1269e95F66939795b35daC | https://gateway.pinata.cloud/ipfs/QmYm5ty4uU79qLJouexWYhF4Hw9YpkWMKijiF8ktdPUTyk |
| Gnosis Mainnet | 0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2 | https://gateway.pinata.cloud/ipfs/QmXzzKq93y1jiKGr8aZDQtcE5hYZhyUiy7XHvX58rUycWu |
| Linea Mainnet | 0x7aA13f5978566878B97fd3b8f7586DEce121B6A9 | https://gateway.pinata.cloud/ipfs/Qme8QFEdFxGsVP9HRsZtqtHU62eTnpJAsAhKUhcrYvdvBh |
| Monad Mainnet | 0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2 | https://gateway.pinata.cloud/ipfs/QmfWgbrYWW8cHQsUxu8MejqpM7tWcr8bRgfVQPrRfg6BxE |
| Optimism Mainnet | 0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2 | https://gateway.pinata.cloud/ipfs/QmYKfXZfrD4zB7yHLJWXv5rV1rhwWDm19kLDPPt8Dk1wbb |
| Scroll Mainnet | 0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2 | https://gateway.pinata.cloud/ipfs/QmTfMbTF71B9d6ezzXffojFHEcySeeomN2CBtgssb8piG5 |
| Sonic Mainnet | 0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2 | https://gateway.pinata.cloud/ipfs/Qme66RiVtVUrDpRMrwiD65mG7TYwXKqxEA9X8etcLjD6ez |
| Avalanche Mainnet | 0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2 | https://gateway.pinata.cloud/ipfs/QmYNF68nj7HYyBLWQ3WHPw45KYDVQcm8LtbZyFMienw3Pm |
