# Gov-Encrypt

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Solana](https://img.shields.io/badge/Solana-Devnet-green)](https://solana.com)
[![Anchor](https://img.shields.io/badge/Anchor-0.32.1-blueviolet)](https://www.anchor-lang.com/)
[![Arcium](https://img.shields.io/badge/Confidential-Layer-orange)](https://arcium.com)
[![X (formerly Twitter)](https://img.shields.io/badge/X-%40gov__encrypt-black)](https://x.com/gov_encrypt)

Built by [@kellycryptos](https://x.com/kellycryptos)

**Confidential Governance Infrastructure for DAOs**

Gov-Encrypt is a confidential governance protocol built on Solana using Anchor and Arcium. It enables private voting, encrypted delegation, confidential treasury simulations, and reputation-weighted quorum systems.

## 📂 Repositories

| Component | Repository | Description |
| :--- | :--- | :--- |
| **Main Protocol** | [Gov-Encrypt](https://github.com/kellycryptos/Gov-Encrypt) | Core repository containing the Anchor Program, Next.js Frontend, and Relayer. |

**Architecture Overview:**
-   **Anchor Program (`/program`)**: Deployed on Solana Devnet. Manages proposal state and settlement.
-   **Frontend (`/frontend`)**: Next.js application for client-side encryption and user interaction.
-   **Relayer (`/relayer`)**: Batches encrypted payloads to the Arcium Network.
-   **Confidential Layer**: Arcium MXE nodes processing private inputs.

### 🔄 Data Flow: Private Voting
1.  **User** selects "Approve/Reject".
2.  **Frontend** generates random private key encryption.
3.  **Frontend** encrypts vote vector: `Encrypt(Vote, PubKey)`.
4.  **Frontend** submits `submit_encrypted_vote` transaction to **Solana**.
5.  **Relayer** detects new vote event and triggers **Arcium** node.
6.  **Arcium** computes new tally result (encrypted) and proof.
7.  **Relayer** submits result update to **Solana**.

### 🛡️ Security Model
-   **Client-Side Encryption**: Inputs are encrypted before leaving the user's device.
-   **MPC Tallying**: Votes are never decrypted individually; only the final sum is reconstructed.
-   **Isolation**: Frontend is isolated from backend secrets.

## 🔐 Arcium Confidential Governance Integration

Gov-Encrypt integrates Arcium’s confidential compute layer to enable private, manipulation-resistant governance on Solana.

### The Problem

Traditional on-chain governance exposes votes before the final tally. This enables strategic voting, coercion, bribery risk, and outcome manipulation before voting concludes.

### Our Approach

Gov-Encrypt processes governance logic inside encrypted shared state using Arcium’s confidential compute environment.

### Architecture Overview

1. Vote Submission
- Users submit encrypted votes from the frontend.
- Vote payloads are encrypted client-side before processing.

2. Confidential Compute (Arcium)
- Vote tallying occurs inside Arcium’s secure compute layer.
- Delegation relationships are resolved privately.
- Reputation-weighted quorum checks are evaluated confidentially.
- Treasury simulations can be processed without exposing intermediate data.

3. On-Chain Settlement (Solana Devnet)
- Only final aggregated results are written on-chain.
- No individual votes or intermediate governance state is exposed.
- DAO state remains verifiable while preserving privacy.

### What Runs Inside Arcium

- Encrypted vote tallying
- Confidential delegation resolution
- Reputation-weighted quorum logic
- Private treasury simulation evaluation

### Privacy Benefits

- Individual votes remain private
- Governance cannot be manipulated through early visibility
- Delegation relationships are not publicly exposed
- Only final outcomes are published on-chain

## 🧪 Current Implementation Status

- [x] Devnet deployment complete
- [x] Custom authority wallet configured
- [x] Anchor program deployed
- [x] IDL synced
- [x] Frontend connected to Devnet
- [ ] Full Arcium SDK production optimization
- [ ] MPC performance hardening

## 🚀 Roadmap

-   **Phase 1 — Anchor Devnet Deployment** (Complete) ✅
-   **Phase 2 — Frontend Devnet Integration** (Complete) ✅
-   **Phase 3 — Arcium Confidential Compute Integration** (In Progress) 🚧
-   **Phase 4 — Public Devnet Demo** (CURRENT PHASE) 🚀
-   **Phase 5 — Mainnet Readiness & Security Review**

We are currently in **Phase 4 — Public Devnet Demo**. Gov-Encrypt is live on Solana Devnet and actively testing confidential governance workflows powered by Arcium.

## Vision & Problem
**Information Asymmetry** in current DAOs leads to:
-   **Bribery & Coercion**: Visible votes allow pressure.
-   **Centralization**: Public delegation graphs create "follow-the-whale" effects.
-   **Front-running**: Public treasury discussions are exploited by market participants.

**Solution**:
Gov-Encrypt uses **Arcium's Confidential Computing Network (MXE)** to process governance actions.
-   **Private Voting**: Encrypted client-side (`x25519` + `RescueCipher`).
-   **Blind Tallying**: MPC circuits compute results without revealing ballots.
-   **Verifiable Integrity**: Mathematical proofs of correctness posted on-chain.

## Quick Start (Devnet)

```bash
# 1. Install Dependencies
npm install -g @coral-xyz/anchor-cli

# 2. Keypair Setup
solana-keygen new

# 3. Deploy
anchor build
anchor deploy --provider.cluster devnet
```

## Community

-   **Official X**: [https://x.com/gov_encrypt](https://x.com/gov_encrypt)
-   **GitHub**: [https://github.com/kellycryptos/Gov-Encrypt](https://github.com/kellycryptos/Gov-Encrypt)
-   **Arcium Docs**: [https://docs.arcium.com](https://docs.arcium.com)

## Live Demo
[https://gov-encrypt.vercel.app/](https://gov-encrypt.vercel.app/)
