# 📝 Devnet Checklist

### 🏁 Environment Readiness
- [ ] **Wallets set to Devnet**: Ensure Phantom/Solana CLI are on the correct network.
- [ ] **Program ID**: Updated in `frontend/.env` and `mxe-node/.env`.
- [ ] **Devnet SOL funded**: Use `solana airdrop 2` or a web faucet.
- [ ] **MXE node running**: Verified reachable at `NEXT_PUBLIC_ARCIUM_ENDPOINT`.

### 🚀 Flow Verification
- [ ] **Proposal Creation**: Wallet 1 successfully initiates a new DAO proposal.
- [ ] **Confidential Delegation**: Wallet 2 delegates power to Wallet 3 (encrypted).
- [ ] **Encrypted Voting**: Wallet 3 casts an Arcium-protected vote.
- [ ] **Confidential Tallying**: MXE node calculates results without revealing individual votes.
- [ ] **Final Tally Display**: Frontend correctly reads and displays the MPC-aggregated result.
- [ ] **Execution**: Proposal execution logic verified after the deadline.

### 🌐 Deployment
- [ ] **Vercel Deploy**: Only `/frontend` subfolder is built and deployed.
- [ ] **RPC Endpoint**: `NEXT_PUBLIC_RPC` configured for high-availability Devnet provider.
