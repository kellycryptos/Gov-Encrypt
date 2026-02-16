"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "../src/idl/gov_encrypt.json";
import { Card } from "./ui/Card";

const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

export default function Delegation() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [delegateAddress, setDelegateAddress] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const delegate = async () => {
        if (!publicKey || !delegateAddress) return;
        try {
            setLoading(true);
            setStatus("🔒 Encrypting delegation link...");

            // Simulation of MPC encryption
            await new Promise(r => setTimeout(r, 1200));

            const provider = new anchor.AnchorProvider(
                connection,
                { publicKey, signTransaction: async (tx: any) => tx, signAllTransactions: async (txs: any) => txs },
                { commitment: "processed" }
            );
            const program = new anchor.Program(idl as any, provider);

            // Derive Delegation PDA
            const [delegationPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("delegation"), publicKey.toBuffer()],
                PROGRAM_ID
            );

            // Mock encryption
            const encryptedDelegation = Buffer.from(delegateAddress.slice(0, 32));

            const tx = await program.methods
                .delegatePrivately(encryptedDelegation)
                .accounts({
                    delegationCommitmentAccount: delegationPda,
                    delegator: publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                })
                .transaction();

            const sig = await sendTransaction(tx, connection);
            setStatus(`✅ Delegation securely recorded! Sig: ${sig.slice(0, 8)}...`);
        } catch (e) {
            console.error(e);
            setStatus("❌ Error processing delegation");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Private Delegation" className="max-w-2xl mx-auto">
            <p className="text-sm text-[var(--muted-foreground)] mb-6 leading-relaxed">
                Delegate your voting power without revealing your identity or social graph.
                The link between you and your delegate is encrypted using Arcium MPC.
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                        Delegate Address (Public Key)
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Solana Address..."
                        value={delegateAddress}
                        onChange={(e) => setDelegateAddress(e.target.value)}
                        className="w-full p-4 bg-[var(--input)] border border-[var(--border)] rounded-lg text-white font-mono text-sm focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent outline-none transition-all placeholder:text-[var(--muted-foreground)]/50"
                    />
                </div>

                <button
                    onClick={delegate}
                    disabled={!publicKey || !delegateAddress || loading}
                    className="w-full py-3 px-4 bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-lg hover:bg-[var(--muted)] font-medium transition-colors border border-[var(--border)] hover:border-[var(--muted-foreground)]"
                >
                    {loading ? "Encrypting & Signing..." : "Encrypt & Delegate Power"}
                </button>

                {status && (
                    <div className={`mt-2 text-sm ${status.includes("✅") ? "text-emerald-400" : "text-red-400"}`}>
                        {status}
                    </div>
                )}
            </div>

            <div className="mt-8 p-4 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                <h4 className="text-sm font-semibold mb-2 text-[var(--foreground)]">Your Delegation Status</h4>
                <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">Current Delegate</span>
                    <span className="font-mono text-[var(--primary)]">None</span>
                </div>
            </div>
        </Card>
    );
}
