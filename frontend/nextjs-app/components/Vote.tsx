"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "../utils/idl.json";

const PROGRAM_ID = new PublicKey("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

export default function Vote({ proposalId }: { proposalId: number }) {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [voteChoice, setVoteChoice] = useState<number | null>(null); // 1 = Yes, 0 = No
    const [status, setStatus] = useState("");

    const castVote = async () => {
        if (!publicKey || voteChoice === null) return;

        try {
            setStatus("Encrypting and submitting vote...");

            // Simulate client-side encryption
            // In a real app, use Arcium SDK to encrypt voteChoice (0 or 1)
            const encryptedBlob = Buffer.from([voteChoice, 0, 0, 0]);

            const provider = new anchor.AnchorProvider(
                connection,
                { publicKey, signTransaction: async (tx: any) => tx, signAllTransactions: async (txs: any) => txs },
                { commitment: "processed" }
            );

            const program = new anchor.Program(idl as any, PROGRAM_ID, provider);

            const [daoStatePda] = PublicKey.findProgramAddressSync(
                [Buffer.from("dao_state")],
                PROGRAM_ID
            );

            // Re-derive proposal PDA based on ID (simplified)
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
            setStatus(`Vote submitted! Signature: ${signature}`);
        } catch (error) {
            console.error(error);
            setStatus("Error submitting vote");
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-800 text-white mt-4">
            <h3 className="text-lg mb-2">Vote on Proposal {proposalId}</h3>
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setVoteChoice(1)}
                    className={`px-4 py-2 rounded ${voteChoice === 1 ? 'bg-green-600' : 'bg-gray-600'}`}
                >
                    Yes
                </button>
                <button
                    onClick={() => setVoteChoice(0)}
                    className={`px-4 py-2 rounded ${voteChoice === 0 ? 'bg-red-600' : 'bg-gray-600'}`}
                >
                    No
                </button>
            </div>
            <button
                onClick={castVote}
                disabled={!publicKey || voteChoice === null}
                className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
            >
                Submit Encrypted Vote
            </button>
            {status && <p className="mt-2 text-sm">{status}</p>}
        </div>
    );
}
