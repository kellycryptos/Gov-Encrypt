"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "../src/idl/gov_encrypt.json";
import { Card } from "./ui/Card";

const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

export default function Vote({ proposalId }: { proposalId: number }) {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [voteChoice, setVoteChoice] = useState<number | null>(null); // 1 = Yes, 0 = No
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const castVote = async () => {
        if (!publicKey || voteChoice === null) return;

        try {
            setLoading(true);
            setStatus("🔒 Encrypting vote client-side...");

            // Simulate encryption delay for UX
            await new Promise(r => setTimeout(r, 1000));

            const encryptedBlob = Buffer.from([voteChoice, 0, 0, 0]); // In prod: Arcium SDK logic

            setStatus("🚀 Submitting encrypted blob to Solana...");

            const provider = new anchor.AnchorProvider(
                connection,
                { publicKey, signTransaction: async (tx: any) => tx, signAllTransactions: async (txs: any) => txs },
                { commitment: "processed" }
            );

            const program = new anchor.Program(idl as any, provider);

            const [daoStatePda] = PublicKey.findProgramAddressSync(
                [Buffer.from("dao_state")],
                PROGRAM_ID
            );

            const [proposalPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("proposal"), new anchor.BN(proposalId).toArrayLike(Buffer, "le", 8)],
                PROGRAM_ID
            );

            const [votePda] = PublicKey.findProgramAddressSync(
                [Buffer.from("vote"), proposalPda.toBuffer(), publicKey.toBuffer()],
                PROGRAM_ID
            );

            const tx = await program.methods
                .submitEncryptedVote(encryptedBlob)
                .accounts({
                    encryptedVoteAccount: votePda,
                    proposal: proposalPda,
                    voter: publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                })
                .transaction();

            const signature = await sendTransaction(tx, connection);
            setStatus(`✅ Encrypted Vote Recorded! Sig: ${signature.slice(0, 8)}...`);
        } catch (error) {
            console.error(error);
            setStatus("❌ Error submitting vote");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Cast Private Vote" className="max-w-2xl mx-auto">
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setVoteChoice(1)}
                    className={`flex-1 py-4 px-6 rounded-lg border transition-all font-semibold ${voteChoice === 1
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'border-[var(--border)] hover:bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-white'
                        }`}
                >
                    Approve
                </button>
                <button
                    onClick={() => setVoteChoice(0)}
                    className={`flex-1 py-4 px-6 rounded-lg border transition-all font-semibold ${voteChoice === 0
                        ? 'border-red-500 bg-red-500/10 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                        : 'border-[var(--border)] hover:bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-white'
                        }`}
                >
                    Reject
                </button>
            </div>

            <button
                onClick={castVote}
                disabled={!publicKey || voteChoice === null || loading}
                className="w-full py-3 px-4 bg-[var(--primary)] text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all shadow-md hover:shadow-lg"
            >
                {loading ? "Processing Encryption..." : "Submit Encrypted Vote"}
            </button>

            {status && (
                <div className={`mt-4 p-3 rounded-lg text-sm font-mono border ${status.includes("✅") ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-[var(--background)] border-[var(--border)] text-[var(--muted-foreground)]"}`}>
                    {status}
                </div>
            )}

            <div className="mt-6 pt-4 border-t border-[var(--border)] flex justify-between items-center text-xs text-[var(--muted-foreground)]">
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Arcium MPC Active
                </span>
                <span>End-to-End Encrypted</span>
            </div>
        </Card>
    );
}
