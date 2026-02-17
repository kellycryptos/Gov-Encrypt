import { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { Program, AnchorProvider, Idl } from '@coral-xyz/anchor';
import idl from '../../idl/gov_encrypt.json';

const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

export const useProgram = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [program, setProgram] = useState<Program<Idl> | null>(null);

    useEffect(() => {
        if (!wallet) return;

        const provider = new AnchorProvider(
            connection,
            wallet as any, // wallet adapter compatibility
            { commitment: 'confirmed' }
        );

        // Initialize program with provider
        // Using 'as any' for IDL compat if types aren't generated yet
        const prog = new Program(idl as any, provider);
        setProgram(prog);

    }, [connection, wallet]);

    const getProposals = async () => {
        if (!program) return [];
        try {
            // In a real generic implementation, we would fetch accounts
            // For Phase 3, we define this structure but might rely on mock API fallbacks
            // if the program isn't actually deployed to devnet with data
            console.log("Fetching proposals from Devnet...");
            // const accounts = await program.account.proposal.all();
            // return accounts;
            return [];
        } catch (err) {
            console.error("Error fetching proposals:", err);
            return [];
        }
    };

    return {
        program,
        getProposals,
        isConnected: wallet.connected
    };
};
