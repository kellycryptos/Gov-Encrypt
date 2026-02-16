# Gov Encrypt - Production-Ready Confidential Governance

This project is a decentralized confidential governance protocol built on Solana, utilizing Arcium for privacy-preserving computations.

## 🏗 Architecture Layers

- **/program**: Anchor smart contract (Rust). Defines the governance logic on-chain.
- **/mxe-node**: Arcium confidential compute node & Relayer. Handles encrypted voting data and MPC flows.
- **/frontend**: Next.js web application. User interface for voting and delegation.

---

## 🛠 Local Development

### 1. Prerequisites
- **Solana CLI 2.3.0**
- **Anchor 0.32.1**
- **Rust stable**
- **Node.js >= 18**
- **Docker & Docker Compose**

### 2. Setup
```bash
# Install dependencies
npm install

# Start local Solana validator (optional, for local testing)
solana-test-validator
```

### 3. Run Frontend
```bash
cd frontend
npm run dev
```

### 4. Run MXE Node (Relayer)
```bash
cd mxe-node
npm install
npm start
```

---

## 🚀 Smart Contract Deployment

Smart contracts must be deployed manually. Do **not** attempt to build Rust/Anchor on Vercel.

1. **Build the program**:
   ```bash
   cd program
   anchor build
   ```
2. **Deploy to Devnet/Mainnet**:
   ```bash
   anchor deploy --provider.cluster devnet
   ```
3. **Copy IDL**:
   Copy `program/target/idl/gov_encrypt.json` to `frontend/src/idl/gov_encrypt.json`.

---

## ☁️ VPS Setup (MXE Node - Ubuntu)

The MXE node handles confidential computation and should be hosted on a persistent VPS (e.g., DigitalOcean, AWS).

1. **Install Docker**:
   ```bash
   sudo apt update && sudo apt install docker.io docker-compose -y
   ```
2. **Deploy Node**:
   ```bash
   cd mxe-node
   docker-compose up -d
   ```
3. **Expose Ports**:
   Ensure port `3001` (or your configured Relayer port) is open in your firewall.

---

## 🌐 Vercel Deployment (Frontend)

Vercel is optimized to build **only** the `/frontend` directory.

### Project Settings
- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `next build`
- **Install Command**: `npm install --legacy-peer-deps`

### Environment Variables
Configure these in the Vercel dashboard:
- `NEXT_PUBLIC_SOLANA_RPC`: Your Solana RPC endpoint (e.g., Helius, Quicknode).
- `NEXT_PUBLIC_PROGRAM_ID`: The ID of your deployed smart contract.
- `NEXT_PUBLIC_RELAYER_URL`: The public URL of your VPS-hosted MXE node.

---

## ✅ Stability & Reliability
- **Isolated Builds**: Vercel ignores Rust/Cargo, preventing timeout and memory issues.
- **Manual Control**: Smart contract upgrades are controlled via Solana CLI.
- **Persistent MPC**: Arcium nodes run in Docker on dedicated hardware for reliability.
