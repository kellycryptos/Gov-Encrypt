# Gov Encrypt Protocol

**The Confidential Governance Layer for Serious DAOs.**

Gov Encrypt provides end-to-end privacy for DAO governance using Solana and Arcium MPC.

## Features
- **Private Voting**: Encrypted ballots tallied via MPC.
- **Confidential Delegation**: Delegate voting power without revealing social graph.
- **Risk Simulation**: Preview treasury impacts with privacy-preserving simulations.
- **Reputation Quorum**: Weighted voting based on encrypted reputation scores.

## Architecture

This monorepo is structured for strict separation of concerns:

- `/frontend`: Next.js 15 application (Vercel deployable).
- `/relayer`: Node.js/Express service for Arcium orchestration.
- `/programs`: Solana Anchor smart contracts.
- `/circuits`: Arcium MPC circuits.
- `/docs`: System architecture documentation.

## Getting Started

### Prerequisites
- Node.js >= 18
- Rust & Anchor (for Solana development)
- Docker (for local validator, optional)

### Installation

```bash
# Install dependencies for all workspaces
npm install
```

### Local Development

1. **Start Local Validator (Optional)**
   ```bash
   solana-test-validator
   ```

2. **Start Relayer**
   ```bash
   cd relayer
   npm run build
   node dist/index.js
   ```

3. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

## Deployment

### Vercel (Frontend)
The `/frontend` directory is ready for Vercel deployment.
1. Add new project in Vercel.
2. Set Root Directory to `frontend`.
3. Configure Environment Variables:
   - `NEXT_PUBLIC_PROGRAM_ID`: Your deployed program ID.
   - `NEXT_PUBLIC_RPC_URL`: Solana RPC URL.
   - `NEXT_PUBLIC_RELAYER_URL`: URL of your deployed Relayer service.
   - `NEXT_PUBLIC_ARCIUM_ENDPOINT`: Arcium API endpoint.

### Relayer
Deploy `/relayer` to any Node.js hosting provider. Ensure it has access to Arcium network and Solana RPC.

## Documentation
See [docs/architecture.md](docs/architecture.md) for detailed system design.
