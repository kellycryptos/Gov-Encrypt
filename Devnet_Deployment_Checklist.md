# Devnet Deployment Checklist: Gov Encrypt DAO

Follow these steps to deploy your confidential DAO to Solana Devnet.

## 1. Smart Contract Deployment (Solana Devnet)

1. **Generate New Program Key**:
   ```bash
   cd program
   solana-keygen new -o target/deploy/gov_encrypt-keypair.json --no-passphrase
   solana address -k target/deploy/gov_encrypt-keypair.json
   ```
2. **Update Code with New Address**:
   - Copy the address from the step above.
   - Paste it into `program/programs/gov-encrypt/src/lib.rs` in `declare_id!`.
   - Paste it into `program/Anchor.toml` in `[programs.devnet]`.
3. **Build & Deploy**:
   ```bash
   anchor build
   anchor deploy --provider.cluster devnet
   ```
4. **Export Types**:
   - Copy `target/idl/gov_encrypt.json` to `frontend/src/idl/gov_encrypt.json`.
   - Copy `target/types/gov_encrypt.ts` to `frontend/src/types/gov_encrypt.ts`.

## 2. MXE Node Setup (Arcium Relayer)

1. **Environment Variables**:
   In `mxe-node/.env` (create if doesn't exist):
   ```env
   PORT=3001
   PROGRAM_ID=YOUR_NEW_PROGRAM_ID
   RPC_URL=https://api.devnet.solana.com
   ```
2. **Launch Node**:
   ```bash
   cd mxe-node
   npm install
   docker-compose up -d
   ```

## 3. Frontend Configuration (Vercel)

1. **Environment Variables**:
   Update your Vercel project settings:
   - `NEXT_PUBLIC_SOLANA_RPC`: `https://api.devnet.solana.com`
   - `NEXT_PUBLIC_PROGRAM_ID`: `YOUR_NEW_PROGRAM_ID`
   - `NEXT_PUBLIC_RELAYER_URL`: `https://your-mxe-node-url.com`
2. **Sync Dependencies**:
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   ```
3. **Deploy**:
   ```bash
   vercel deploy --prod
   ```

## 🛠 Common Errors & Fixes

| Error | Cause | Fix |
| :--- | :--- | :--- |
| `UnauthorizedNode` | Relayer not authorized. | Call `initialize_dao` or `set_authorized_node` with the Relayer's public key. |
| `VotingNotStarted` | UTC time check failed. | Ensure local machine clock is synced and `proposal.start_time` is accurately set in Unix timestamp. |
| `AccountNotInitialized` | Proposal ID mismatch. | Ensure frontend is querying the correct Proposal PDA seeds. |
| `WalletNotFound` | Wallet not in Devnet. | Switch Phantom/Solflare to Devnet mode in settings. |

## 🧪 Testing Flow
1. **Initialize DAO**: Call `initialize_dao` from your deployer wallet.
2. **Create Proposal**: Use the frontend 'Create' tab. Set `start_time` to `now`.
3. **Delegate**: Use the 'Delegation' tab. Encrypted blob sent to Solana.
4. **Vote**: Cast 'Yes' or 'No'. Blob stored on-chain.
5. **Finalize**: After `end_time`, the Relayer processes proofs and calls `finalize_proposal`.
