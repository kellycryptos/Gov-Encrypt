const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Program, AnchorProvider, Wallet, web3 } = require('@coral-xyz/anchor');
const { Connection, PublicKey, Keypair } = web3;
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 3001;
const SOLANA_RPC = process.env.SOLANA_RPC;

app.get('/health', (req, res) => res.json({ status: "ok" }));

const startServer = async () => {
    try {
        console.log("Starting relayer with PID:", process.env.PROGRAM_ID);
        const PROGRAM_ID = new PublicKey(process.env.PROGRAM_ID);
        const idl = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'gov_encrypt.json'), 'utf8'));

        const connection = new Connection(SOLANA_RPC, 'confirmed');
        const dummyWallet = new Wallet(Keypair.generate());
        const provider = new AnchorProvider(connection, dummyWallet, {
            preflightCommitment: 'confirmed',
        });

        const program = new Program(idl, PROGRAM_ID, provider);
        console.log("Anchor Program initialized successfully");

        // ... rest of the code as before but safer ...
    } catch (err) {
        console.error("Initialization error:", err);
    }

    app.listen(PORT, () => {
        console.log(`🚀 Arcium MPC Relayer running at http://localhost:${PORT}`);
    });

    // --- Endpoints ---

    // 1. Fetch proposals
    app.get('/api/proposals', async (req, res) => {
        try {
            const proposals = await program.account.proposal.all();
            const formatted = proposals.map((p) => ({
                id: p.publicKey.toString(),
                title: p.account.title,
                description: p.account.description,
                status: Object.keys(p.account.status)[0].toLowerCase(),
                endDate: new Date(p.account.deadline.toNumber() * 1000).toISOString(),
                votesFor: p.account.yesVotes.toNumber(),
                votesAgainst: p.account.noVotes.toNumber(),
                tags: ["Governance"],
            }));
            res.json(formatted);
        } catch (error) {
            console.error("Error fetching proposals:", error);
            res.status(500).json({ error: "Failed to fetch proposals" });
        }
    });

    // 2. Fetch certifications/delegations
    app.get('/api/delegations', async (req, res) => {
        try {
            const delegations = await program.account.delegation.all();
            const formatted = delegations.map((d) => ({
                address: d.account.delegate.toString(),
                name: `Delegate ${d.account.delegate.toString().slice(0, 4)}`,
                votingPower: d.account.weight.toNumber(),
                proposalsVoted: 0,
            }));
            res.json(formatted);
        } catch (error) {
            console.error("Error fetching delegations:", error);
            res.status(500).json({ error: "Failed to fetch delegations" });
        }
    });

    // 3. Quorum status
    app.get('/api/quorum', async (req, res) => {
        try {
            // Simulated reputation-weighted quorum
            // In Phase 4/5 this comes from Arcium MPC
            res.json({
                current: 1250000,
                required: 2000000,
                progress: 62.5,
                status: "ORCHESTRATING"
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch quorum" });
        }
    });

    // 4. Submit Encrypted Vote (Relay to MPC)
    app.post('/api/vote', async (req, res) => {
        const { proposalId, vote, voterSignature, voterPublicKey } = req.body;

        try {
            console.log(`[Relayer] Received ${vote} vote for ${proposalId} from ${voterPublicKey}`);

            // --- ARCIUM MPC RELAY LOGIC ---
            // Simulating relay to Arcium nodes
            res.json({
                success: true,
                message: "Vote relayed to Arcium MPC nodes for private tallying",
                txId: "MPC_" + Math.random().toString(36).substring(7)
            });
        } catch (error) {
            res.status(500).json({ error: "MPC Relay failed" });
        }
    });
};


startServer();

