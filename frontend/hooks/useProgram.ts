
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, Idl } from '@coral-xyz/anchor';
import * as anchor from '@coral-xyz/anchor';
import { useEffect, useState } from 'react';

// Use require or dynamic import for JSON to avoid some build issues
import idl from '../src/idl/gov_encrypt.json';
import { mockApi } from '@/lib/mockApi'; // Ensure this path is correct

const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "8FbVRnSmv1FtZvgYA4HjN7HN9BCQVZYuR3jf2sFsscgV");

export const useProgram = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [program, setProgram] = useState<Program<Idl> | null>(null);

    useEffect(() => {
        if (!wallet || !wallet.publicKey || !wallet.signTransaction) {
            setProgram(null);
            return;
        }

        try {
            const provider = new AnchorProvider(
                connection,
                wallet as any,
                { commitment: 'confirmed' }
            );

            // @ts-ignore
            const prog = new Program(idl as Idl, PROGRAM_ID, provider);
            setProgram(prog);
        } catch (e) {
            console.error("Failed to init program:", e);
        }

    }, [connection, wallet]);

    // Helper to check connection status safely
    const isConnected = !!wallet.connected && !!wallet.publicKey;

    const getProposals = async () => {
        try {
            if (program) {
                // In future: await program.account.proposal.all();
                // For now, fallback to mock to keep UI working
            }
            // Always fallback to mock if on-chain fetch fails or not implemented
            return await mockApi.getProposals();
        } catch (err) {
            console.error("Error fetching proposals:", err);
            return [];
        }
    };

    const getDelegations = async () => {
        try {
            return await mockApi.getDelegations();
        } catch (err) {
            console.error("Error fetching delegations:", err);
            return [];
        }
    };

    const submitVote = async (proposalId: string, vote: 'for' | 'against') => {
        try {
            // In future: Call program.methods.submitEncryptedVote...
            return await mockApi.submitVote(proposalId, vote);
        } catch (err) {
            console.error("Error submitting vote:", err);
            throw err;
        }
    };

    return {
        program,
        getProposals,
        getDelegations,
        submitVote,
        isConnected // Explicitly return it
    };
};
