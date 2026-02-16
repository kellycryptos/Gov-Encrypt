# Gov Encrypt

**The Confidential Governance Layer for Serious DAOs**

Gov Encrypt is a privacy-native governance protocol built on Solana and powered by Arcium MPC.

Traditional DAO governance exposes voting behavior, delegation relationships, and treasury strategy.
Gov Encrypt encrypts governance mechanics while preserving verifiable outcomes.

Only final results are revealed.

---

## Why Gov Encrypt?

Transparent governance introduces:
- Whale dominance
- Social pressure distortion
- Bandwagon voting
- Delegation cartels
- Strategic treasury front-running

Governance requires outcome transparency — not behavioral exposure.

**Gov Encrypt separates:**
- Private decision mechanics
- Publicly verifiable outcomes

---

## Core Features

### 🔐 Private Voting
- Votes encrypted client-side
- Only encrypted blobs stored on-chain
- Aggregation handled via Arcium MPC
- Final tally revealed — individual votes never exposed

### 🕶 Private Delegation
- Delegation mappings remain confidential
- Voting blocs are invisible
- Effective voting power computed privately

### 🧠 Reputation-Weighted Encrypted Quorum
- Non-transferable encrypted reputation (eREP)
- No public scoreboards
- Quorum calculated via MPC

**Weighted formula (inside secure compute):**
`sqrt(staked_tokens) + log(reputation_score)`

Whale-resistant. Merit-aware. Confidential.

### 💰 Confidential Treasury Simulation
Before execution, treasury strategies are privately simulated:
- Allocation distribution
- Risk scoring
- Stress testing
- Liquidity constraints

Only aggregated risk summaries are revealed.

---

## Architecture Overview

1. **Frontend (Next.js)**: Client-side encryption.
2. **On-Chain (Anchor)**: Solana program for encrypted storage.
3. **Arcium MPC (Arcis circuits)**: Aggregated result computation.

No plaintext governance data is ever stored.

---

## Monorepo Structure

```
gov-encrypt/
├── programs/            # Anchor-based Solana program
├── circuits/            # Arcis MPC circuits
├── backend/             # Arcium relayer service
├── frontend/            # Next.js governance UI
├── docker-compose.yml   # Local dev environment
├── Anchor.toml
└── .github/workflows/   # CI pipeline
```

---

## Technology Stack
- **Rust**
- **Anchor** (0.32.1)
- **Solana CLI** (2.3.0)
- **Arcium MPC**
- **Arcis circuits**
- **Next.js**
- **Docker & Docker Compose**

---

## Development Setup

### 1. Install Dependencies
- Rust
- Solana CLI 2.3.0
- Anchor 0.32.1
- Yarn
- Docker

### 2. Start Local Environment
```bash
docker-compose up
```
This launches the Solana test validator, Arcium node, MPC worker, and backend relayer.

### 3. Build Program
```bash
anchor build
```

### 4. Run Tests
```bash
anchor test
```

### 5. Deploy to Devnet
```bash
solana config set --url devnet
anchor deploy
```

### 6. Run Frontend
```bash
cd frontend/nextjs-app
yarn install
yarn dev
```

---

## Security Principles
- No plaintext votes
- No visible delegation graphs
- No exposed reputation values
- No hardcoded private keys
- MPC required for aggregation

---

## Governance Model

### **$GOVE**
Transferable governance token used for proposal creation staking, protocol upgrades, and treasury participation.

### **eREP (Encrypted Reputation)**
Non-transferable influence metric earned through participation and alignment. Used privately in quorum calculations.

---

## Roadmap
- **Phase 1**: Private Voting (MVP) - Encrypted vote submission & Devnet deployment.
- **Phase 2**: Delegation + Reputation - Private delegation circuit & Encrypted quorum.
- **Phase 3**: Treasury Simulation - Risk modeling engine & Governance SDK.

---

## Vision
Gov Encrypt aims to become the privacy infrastructure layer for DAO governance.

---

## Status
🚧 **Active Development** - Devnet release coming soon.

---

## License
MIT

---

## Contact
**Founder**: Kellycryptos 
**Twitter/X**: [@kellycryptos](https://x.com/kellycryptos)
