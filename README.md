# 🗂 1. Project Folder Structure

my-confidential-dao/
│
├── program/                  # Anchor smart contract
│   ├── Cargo.toml
│   ├── Anchor.toml
│   ├── src/
│   │   └── lib.rs            # DAO program: proposals, delegation, voting
│   └── migrations/
│       └── deploy.rs
│
├── mxe-node/                 # Arcium confidential compute
│   ├── Dockerfile
│   ├── config/
│   │   └── node-config.json
│   └── scripts/
│       └── start-mxe.sh
│
├── frontend/                 # Next.js UI
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js    # Optimized for styling
│   ├── app/                  # (Using App Router)
│   ├── components/
│   │   ├── ProposalCard.tsx
│   │   ├── Vote.tsx          # (Integrated VoteButton)
│   │   └── Delegation.tsx    # (Integrated DelegationWidget)
│   └── utils/
│       ├── solana.ts         # RPC & program ID
│       └── arcium.ts         # MXE interaction
│
└── README.md

⸻

# 🏗 2. Key Details per Layer

### /program — Anchor DAO
 • Handles: proposal creation, vote recording, delegation logic
 • Build: locally via Anchor
 • Deploy: `anchor build && anchor deploy --provider.cluster devnet`
 • Program ID: export to .env and use in frontend

### /mxe-node — Arcium MXE
 • Handles: confidential vote/delegation processing
 • Dockerized: ensures it runs anywhere
 • Workflow: frontend sends encrypted vote → MXE tallies → final result written to Devnet program
 • Start Command:
```bash
cd mxe-node
docker build -t arcium-mxe .
docker run -d --name arcium-mxe -p 8080:8080 arcium-mxe
```

### /frontend — Next.js DAO UI
 • Connects to:
 • Devnet RPC (`NEXT_PUBLIC_RPC=https://api.devnet.solana.com`)
 • Deployed program ID (`NEXT_PUBLIC_PROGRAM_ID`)
 • Arcium MXE endpoint (`NEXT_PUBLIC_ARCIUM_ENDPOINT`)
 • Functionality:
 • Proposal creation
 • Vote submission (encrypted)
 • Delegation
 • Display final tally from Arcium
 • Deploy: only frontend → Vercel
 • No Rust, no Docker, no MXE build inside Vercel

⸻

# ⚡ 3. Deployment & Testing Flow
 1. **Anchor Program**
```bash
cd program
solana config set --url https://api.devnet.solana.com
solana airdrop 2
anchor build
anchor deploy
```

 2. **Arcium MXE**
```bash
cd mxe-node
sh scripts/start-mxe.sh
```

 3. **Frontend**
```bash
cd frontend
npm install
# Set NEXT_PUBLIC_RPC, NEXT_PUBLIC_PROGRAM_ID, NEXT_PUBLIC_ARCIUM_ENDPOINT
npm run dev
```

 4. **Test Flow**
 • Wallet 1 → create proposal
 • Wallet 2 → delegate votes
 • Wallet 3 → vote
 • Arcium MXE → tallies votes confidentially
 • Frontend reads final tally and displays

⸻

# 📝 4. Devnet Checklist
 • Wallets set to Devnet
 • Program ID updated in frontend .env
 • Devnet SOL funded
 • MXE node running and reachable
 • Frontend deployed to Vercel only
 • Delegation and voting tested
 • Proposal execution after deadline verified
