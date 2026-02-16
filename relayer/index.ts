import express from "express";
import cors from "cors";
import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const PROGRAM_ID = new PublicKey(process.env.PROGRAM_ID || "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");
const RPC_URL = process.env.RPC_URL || "http://127.0.0.1:8899";

const connection = new Connection(RPC_URL, "confirmed");

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok", rpc: RPC_URL });
});

// Trigger Treasury Simulation via Arcium
app.post("/api/simulate", async (req, res) => {
    try {
        const { proposalId } = req.body;
        console.log(`Requesting Arcium simulation for proposal ${proposalId}...`);

        // STUB: Call Arcium Node
        // await arcium.compute(taskId, inputs)

        // Mock response
        res.json({
            success: true,
            message: "Simulation scheduled on Arcium Network",
            riskScore: 12 // Mock output
        });
    } catch (error) {
        console.error("Simulation error:", error);
        res.status(500).json({ error: "Failed to schedule simulation" });
    }
});

// Quorum Status Endpoint
app.get("/api/quorum", (req, res) => {
    res.json({
        percentage: 84, // Mock aggregation
        status: "Institutional Weighted",
        encrypted: true
    });
});

// Listener for Tally (Background Process)
async function startListener() {
    console.log("Starting Solana event listener...");
    // Mock listener
    // connection.onLogs(PROGRAM_ID, (logs) => { ... })
}

app.listen(PORT, () => {
    console.log(`Arcium Relayer running on port ${PORT}`);
    startListener().catch(console.error);
});
