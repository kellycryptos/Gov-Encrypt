import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as anchor from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import idl from '../src/idl/gov_encrypt.json';
import { Card } from './ui/Card';
import { Button, Input } from './ui';

const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

export const CreateProposal: React.FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!publicKey) return;
        try {
            setLoading(true);
            const provider = new anchor.AnchorProvider(
                connection,
                { publicKey, signTransaction: async (tx: any) => tx, signAllTransactions: async (txs: any) => txs },
                { commitment: "processed" }
            );
            const program = new anchor.Program(idl as any, provider);

            const [daoStatePda] = PublicKey.findProgramAddressSync([Buffer.from("dao_state")], PROGRAM_ID);
            const daoState = await program.account.daoAccount.fetch(daoStatePda);

            const [proposalPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("proposal"), new anchor.BN(daoState.proposalCount).toArrayLike(Buffer, "le", 8)],
                PROGRAM_ID
            );

            const deadline = Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60); // 3 days from now

            const tx = await program.methods
                .createProposal(title, description, new anchor.BN(deadline))
                .accounts({
                    daoState: daoStatePda,
                    proposal: proposalPda,
                    creator: publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                })
                .transaction();

            await sendTransaction(tx, connection);
            setTitle('');
            setDescription('');
            alert('Proposal created!');
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Create Proposal</h3>
            <div className="space-y-4">
                <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5 block">Title</label>
                    <Input
                        placeholder="Introduce a new strategy..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5 block">Description</label>
                    <textarea
                        className="w-full px-4 py-2 bg-[var(--input)] border border-[var(--border)] rounded-lg text-sm transition-all focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none placeholder:text-[var(--muted-foreground)]/50 min-h-[100px] resize-none"
                        placeholder="Details about the proposal..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <Button
                    onClick={handleCreate}
                    disabled={!publicKey || loading || !title}
                    className="w-full h-11 !font-bold"
                >
                    {loading ? 'Publishing...' : 'Publish to Arcium'}
                </Button>
            </div>
        </Card>
    );
};
