"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "../utils/idl.json";

const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

export default function CreateProposal() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [cid, setCid] = useState("");
    const [status, setStatus] = useState("");

    const create = async () => {
        if (!publicKey || !cid) return;
        try {
            setStatus("Creating proposal...");
            // ... (Anchor logic similar to before but verify accounts)
            const provider = new anchor.AnchorProvider(
                connection,
                { publicKey, signTransaction: async (tx: any) => tx, signAllTransactions: async (txs: any) => txs },
                { commitment: "processed" }
            );
            const program = new anchor.Program(idl as any, provider);

            // PDA Derivation logic... omitted for brevity in UI mock, assume standard
            // For production, ensure exact account mapping

            // Placeholder for successful transaction
            setStatus(`Proposal created! (Mock Sig)`);
        } catch (e) {
            setStatus("Error creating proposal");
        }
    };

    return (
        <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Create Proposal</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-[var(--muted-foreground)] mb-1">Proposal IPFS CID</label>
                    <input
                        type="text"
                        value={cid}
                        onChange={(e) => setCid(e.target.value)}
                        className="w-full p-3 bg-[var(--input)] border border-[var(--border)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                        placeholder="Qm..."
                    />
                </div>
                <button
                    onClick={create}
                    disabled={!publicKey || !cid}
                    className="w-full py-3 px-4 bg-[var(--primary)] text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 font-medium transition-colors"
                >
                    Submit Proposal
                </button>
                {status && <p className="text-sm text-[var(--accent)]">{status}</p>}
            </div>
        </div>
    );
}
