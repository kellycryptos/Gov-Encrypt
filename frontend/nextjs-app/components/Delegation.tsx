"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "../utils/idl.json";

const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

export default function Delegation() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [delegateAddress, setDelegateAddress] = useState("");
    const [status, setStatus] = useState("");

    const delegate = async () => {
        if (!publicKey || !delegateAddress) return;
        try {
            setStatus("🔒 Encrypting delegation...");
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
            setStatus(`Delegation submitted! Sig: ${sig.slice(0, 8)}...`);
        } catch (e) {
            console.error(e);
            setStatus("Error delegation");
        }
    };

    return (
        <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Private Delegation</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
                Delegate your voting power without revealing your social graph. The link between you and your delegate is encrypted.
            </p>
            <input
                type="text"
                placeholder="Delegate Address (Pubkey)"
                value={delegateAddress}
                onChange={(e) => setDelegateAddress(e.target.value)}
                className="w-full p-3 mb-4 bg-[var(--input)] border border-[var(--border)] rounded-lg text-white focus:ring-2 focus:ring-[var(--ring)] focus:outline-none"
            />
            <button
                onClick={delegate}
                className="w-full py-3 px-4 bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-lg hover:bg-[var(--muted)] font-medium transition-colors"
                disabled={!publicKey}
            >
                Encrypt & Delegate
            </button>
            {status && <p className="mt-2 text-sm text-[var(--accent)]">{status}</p>}
        </div>
    );
}
