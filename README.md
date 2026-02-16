# Gov Encrypt

**The Confidential Governance Layer for Serious DAOs**

Gov Encrypt is a privacy-native governance protocol built on Solana and Arcium MPC. It enables DAOs to conduct governance with encrypted voting, private delegation, and reputation-weighted quorums without exposing sensitive member data.

## 🏗 Architecture

The repository is structured as a monorepo:

- **`programs/gov_encrypt`**: The Anchor smart contract managing DAO state, proposals, and encrypted commitments.
- **`circuits/`**: Arcis MPC circuits that perform private computations (vote tally, delegation, quorum, treasury simulation).
- **`backend/arcium-relayer`**: Node.js service that listens for on-chain events and triggers off-chain MPC computations.
- **`frontend/nextjs-app`**: Institutional-grade Next.js dashboard for DAO interaction.
- **`docker-compose.yml`**: Orchestration for the entire local development stack (Solana validator, Arcium node, Relayer).

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- Solana CLI 1.18+
- Anchor CLI 0.30+
- Node.js 18+
- Yarn

### Local Development

1. **Start the Infrastructure**
   ```bash
   docker-compose up -d
   ```
   This spins up a local Solana validator, Arcium Node, MPC Worker, and the Backend Relayer.

2. **Build and Deploy Program**
   ```bash
   anchor build
   anchor deploy --provider.cluster localnet
   ```

3. **Run Frontend**
   ```bash
   cd frontend/nextjs-app
   yarn dev
   ```

## 🔐 Key Features

- **Encrypted Voting**: Votes are encrypted client-side and only the aggregated result is revealed.
- **Private Delegation**: Delegate voting power without revealing social graphs.
- **Confidential Reputation**: Verification of reputation scores via MPC without public disclosure.
- **Treasury Simulation**: Privately simulate treasury strategies against risk models before execution.

## 📄 License

MIT
