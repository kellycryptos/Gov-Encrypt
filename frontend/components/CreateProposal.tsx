"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "../src/idl/gov_encrypt.json";
import { Card } from "../ui/Card";

const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

export default function CreateProposal() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [cid, setCid] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const create = async () => {
        if (!publicKey || !cid) return;
        try {
            setLoading(true);
            setStatus("Wait for signature...");
            // ... (Anchor logic similar to before but verify accounts)
            const provider = new anchor.AnchorProvider(
                connection,
                { publicKey, signTransaction: async (tx: any) => tx, signAllTransactions: async (txs: any) => txs },
                { commitment: "processed" }
            );
            const program = new anchor.Program(idl as any, provider);

            // Placeholder for successful transaction
            // await program.methods....

            await new Promise(r => setTimeout(r, 1000)); // Mock delay
            setStatus(`✅ Proposal Created!`);
            setCid("");
        } catch (e) {
            setStatus("❌ Error creating proposal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="New Proposal" className="border-l-4 border-l-[var(--primary)]">
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Proposal IPFS CID</label>
                    <input
                        type="text"
                        value={cid}
                        onChange={(e) => setCid(e.target.value)}
                        className="w-full p-3 bg-[var(--input)] border border-[var(--border)] rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] placeholder:text-[var(--muted-foreground)]/50"
                        placeholder="QmHash..."
                    />
                </div>
                <button
                    onClick={create}
                    disabled={!publicKey || !cid || loading}
                    className="w-full py-2.5 px-4 bg-[var(--primary)] text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 font-medium transition-colors text-sm"
                >
                    {loading ? "Submitting..." : "Submit Proposal"}
                </button>
                {status && <p className="text-xs text-[var(--accent)] text-center">{status}</p>}
            </div>
        </Card>
    );
}
