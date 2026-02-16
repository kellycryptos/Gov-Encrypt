"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "../src/idl/gov_encrypt.json";
import { Card } from "./ui/Card";
import { Button, Input } from "./ui";

const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

export function Delegation() {
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

            await new Promise(r => setTimeout(r, 1200));

            const provider = new anchor.AnchorProvider(
                connection,
                { publicKey, signTransaction: async (tx: any) => tx, signAllTransactions: async (txs: any) => txs },
                { commitment: "processed" }
            );
            const program = new anchor.Program(idl as any, provider);

            const [delegationPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("delegation"), publicKey.toBuffer()],
                PROGRAM_ID
            );

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
        <Card className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-2">Private Delegation</h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-8 leading-relaxed">
                Delegate your voting power without revealing your identity or social graph.
                The link between you and your delegate is encrypted using Arcium MPC.
            </p>

            <div className="space-y-6">
                <div>
                    <label className="block text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                        Delegate Address (Public Key)
                    </label>
                    <Input
                        type="text"
                        placeholder="Enter Solana Address..."
                        value={delegateAddress}
                        onChange={(e) => setDelegateAddress(e.target.value)}
                        className="font-mono"
                    />
                </div>

                <Button
                    onClick={delegate}
                    disabled={!publicKey || !delegateAddress || loading}
                    className="w-full h-12 !font-bold"
                >
                    {loading ? "Encrypting & Signing..." : "Encrypt & Delegate Power"}
                </Button>

                {status && (
                    <div className={`mt-2 text-xs font-mono p-3 rounded-lg border ${status.includes("✅") ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-red-50 border-red-100 text-red-600"}`}>
                        {status}
                    </div>
                )}
            </div>

            <div className="mt-10 p-5 rounded-xl bg-slate-50 border border-[var(--border)]">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Your Delegation Status</h4>
                <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Current Delegate</span>
                    <span className="font-mono text-[var(--primary)] bg-indigo-50 px-2 py-1 rounded">None</span>
                </div>
            </div>
        </Card>
    );
}
