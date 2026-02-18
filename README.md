# Gov-Encrypt

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solana](https://img.shields.io/badge/Solana-Devnet-green)
![Anchor](https://img.shields.io/badge/Anchor-0.32.1-blueviolet)
![Arcium](https://img.shields.io/badge/Confidential-Layer-orange)

**The Confidential Governance Infrastructure for DAOs**

## Vision
Governance without transparency tradeoffs. We believe that for DAOs to mature into global institutions, they require the ability to make strategic decisions without immediate public exposure.

## Problem: Information Asymmetry
Current DAO governance models default to radical transparency, creating a critical vulnerability: **Information Asymmetry**.
- **Voting Choices**: Exposed in real-time, leading to bribery, coercion, and "follow-the-whale" voting.
- **Delegation Graphs**: Public social graphs create pressure and centralization risks.
- **Strategic Treasury**: Market participants front-run DAO trades when proposals are public.

This reduces participation and creates massive coordination risks for serious organizations.

## Solution: Confidential Governance Layer
Gov-Encrypt solves this by leveraging **Arcium's Confidential Computing Network (MXE)**.
Instead of public votes, we use encrypted computation to process governance actions.

- **Private Voting**: User votes are encrypted client-side (`x25519` + `RescueCipher`) and remain secret.
- **Blind Tallying**: Arcis MPC circuits compute the final result without ever revealing individual ballots.
- **Verifiable Integrity**: The final tally is posted on-chain, mathematically proven correct, while preserving privacy.

## Architecture
1.  **Next.js Frontend**: Client-side encryption of user intent.
2.  **Relayer**: Batches encrypted payloads to the Arcium Network.
3.  **Confidential Compute Layer (Arcium)**: Secure Multiparty Execution (MXE) environments for processing votes.
4.  **Solana Governance Program**: On-chain Anchor program for proposal state management and final settlement.

## Integration Progress
We are actively building on the cutting edge of Solana privacy:
-   ✅ **Solana Devnet**: Deployed and active.
-   ✅ **Anchor 0.32.1**: Upgraded to the latest framework.
-   🚧 **Arcis MPC Circuits**: Implementing private voting logic.
-   🚧 **Confidential Layer**: Transitioning from public to fully confidential governance.

## Requirements Checklist
To run this project locally or as a node operator, you need:
-   [x] **Rust**: Latest Stable
-   [x] **Solana CLI**: v2.3.0
-   [x] **Anchor CLI**: v0.32.1
-   [x] **Docker**: For running Arcium MXE nodes locally.

## Community & Resources
Join the movement for private governance:

-   **Official X**: [https://x.com/gov_encrypt](https://x.com/gov_encrypt)
-   **GitHub Repository**: [https://github.com/kellycryptos/Gov-Encrypt](https://github.com/kellycryptos/Gov-Encrypt)
-   **Arcium Documentation**: [https://docs.arcium.com](https://docs.arcium.com)

## Live Demo
[https://gov-encrypt.vercel.app/](https://gov-encrypt.vercel.app/)

## Devnet Deployment
Quick start for developers:
```bash
# 1. Install Dependencies
npm install -g @coral-xyz/anchor-cli

# 2. Generate Keypair
solana-keygen new

# 3. Deploy
anchor build
anchor deploy --provider.cluster devnet
```
