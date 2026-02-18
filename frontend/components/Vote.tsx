"use client";

import { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "../src/idl/gov_encrypt.json";
import { Card } from "./ui/Card";
import { Button } from "./ui";
import { arcium } from "../lib/arcium"; // Import Arcium client

const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

export default function Vote({ proposalId }: { proposalId: number }) {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [voteChoice, setVoteChoice] = useState<number | null>(null); // 1 = Yes, 0 = No
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    if (!mounted) return null;

    const castVote = async () => {
        if (!publicKey || voteChoice === null) return;

        try {
            setLoading(true);
            setStatus("🔒 Encrypting vote client-side...");

            // Use Arcium client for encryption
            const encryptedBlob = await arcium.encryptVote(voteChoice, publicKey, proposalId);

            setStatus("🚀 Submitting encrypted blob to Solana...");

            const provider = new anchor.AnchorProvider(
                connection,
                { publicKey, signTransaction: async (tx: any) => tx, signAllTransactions: async (txs: any) => txs },
                { commitment: "processed" }
            );

            // @ts-ignore
            const program = new anchor.Program(idl, PROGRAM_ID, provider);

            const [proposalPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("proposal"), new anchor.BN(proposalId).toArrayLike(Buffer, "le", 8)],
                PROGRAM_ID
            );

            const [votePda] = PublicKey.findProgramAddressSync(
                [Buffer.from("vote"), proposalPda.toBuffer(), publicKey.toBuffer()],
                PROGRAM_ID
            );

            // Convert Uint8Array to Request logic (Anchor expects Buffer or array)
            const blobArgument = Buffer.from(encryptedBlob);

            const tx = await program.methods
                .submitEncryptedVote(blobArgument)
                .accounts({
                    encryptedVote: votePda,
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
        <Card className="max-w-xl mx-auto">
            <h3 className="text-lg font-bold mb-6">Cast Private Vote</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <Button
                    variant={voteChoice === 1 ? 'default' : 'outline'}
                    onClick={() => setVoteChoice(1)}
                    className={`h-16 text-base !rounded-xl ${voteChoice === 1 ? 'shadow-indigo-100 shadow-xl' : ''}`}
                >
                    Approve
                </Button>
                <Button
                    variant={voteChoice === 0 ? 'secondary' : 'outline'}
                    onClick={() => setVoteChoice(0)}
                    className={`h-16 text-base !rounded-xl ${voteChoice === 0 ? 'shadow-rose-100 shadow-xl' : ''}`}
                >
                    Reject
                </Button>
            </div>

            <Button
                onClick={castVote}
                disabled={!publicKey || voteChoice === null || loading}
                className="w-full h-12 !font-extrabold shadow-glow hover:shadow-glow-lg transition-all"
            >
                {loading ? "Processing Encryption..." : "Submit Encrypted Vote"}
            </Button>

            {status && (
                <div className={`mt-6 p-4 rounded-xl text-xs font-mono border ${status.includes("✅") ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-slate-50 border-slate-200 text-slate-500"}`}>
                    {status}
                </div>
            )}

            <div className="mt-8 pt-6 border-t border-[var(--border)] flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[var(--muted-foreground)]">
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Arcium MPC Protocol
                </span>
                <span>End-to-End Encrypted</span>
            </div>
        </Card>
    );
}
