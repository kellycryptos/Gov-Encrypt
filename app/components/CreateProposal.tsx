"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "../utils/idl.json";

const PROGRAM_ID = new PublicKey("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

export default function CreateProposal() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [cid, setCid] = useState("");
    const [status, setStatus] = useState("");

    const createProposal = async () => {
        if (!publicKey) return;

        try {
            setStatus("Creating proposal...");
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

            const daoAccount = await program.account.daoState.fetch(daoStatePda);
            const proposalCount = (daoAccount as any).proposalCount;

            const [proposalPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("proposal"), new anchor.BN(proposalCount).toArrayLike(Buffer, "le", 8)],
                PROGRAM_ID
            );

            const now = Math.floor(Date.now() / 1000);

            const tx = await program.methods
                .createProposal(cid, new anchor.BN(now), new anchor.BN(now + 86400))
                .accounts({
                    daoState: daoStatePda,
                    proposal: proposalPda,
                    proposer: publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                })
                .transaction();

            const signature = await sendTransaction(tx, connection);
            setStatus(`Proposal created! Signature: ${signature}`);
        } catch (error) {
            console.error(error);
            setStatus("Error creating proposal");
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-800 text-white">
            <h2 className="text-xl mb-4">Create Proposal</h2>
            <input
                type="text"
                placeholder="IPFS CID"
                value={cid}
                onChange={(e) => setCid(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 rounded text-white"
            />
            <button
                onClick={createProposal}
                disabled={!publicKey || !cid}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                Create
            </button>
            {status && <p className="mt-2 text-sm">{status}</p>}
        </div>
    );
}
