import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, Idl, setProvider } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import idl from "../src/idl/gov_encrypt.json";
import { arcium } from "./arcium";

// Define the program ID
// This should be updated after deployment
const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "8FbVRnSmv1FtZvgYA4HjN7HN9BCQVZYuR3jf2sFsscgV");


export const getProgram = (wallet: WalletContextState) => {
    const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL || clusterApiUrl("devnet"), "confirmed");

    if (!wallet.publicKey || !wallet.signTransaction || !wallet.signAllTransactions) {
        return null;
    }

    const provider = new AnchorProvider(
        connection,
        // @ts-ignore - Wallet adapter compatibility
        wallet,
        { preflightCommitment: "confirmed" }
    );

    setProvider(provider);

    // @ts-ignore - IDL type mismatch is common, ignoring for quick prototype
    return new Program(idl as Idl, PROGRAM_ID, provider);
};

export const fetchProposals = async (wallet: WalletContextState) => {
    const program = getProgram(wallet);
    if (!program) return [];

    try {
        // Fetch all proposal accounts
        // Note: 'proposal' must match the account name in lib.rs (camelCase or PascalCase depending on IDL)
        // In lib.rs it is 'Proposal', so usually 'proposal' in anchor client
        const proposals = await program.account.proposal.all();

        return proposals.map(p => ({
            id: p.account.id.toString(),
            title: p.account.title,
            description: p.account.description,
            deadline: new Date(p.account.deadline.toNumber() * 1000).toISOString(),
            status: Object.keys(p.account.status)[0] || 'Active', // Enum handling
            yesVotes: p.account.yesVotes.toString(), // Encrypted or raw? In lib.rs it's u64, but we want encrypted flow... 
            // The prompt says "Only store encrypted payloads". 
            // In lib.rs `Proposal` struct has `yes_votes: u64` which implies decrypted/plaintext tallying ON CHAIN (simple version)
            // OR the MPC nodes update this.
            // For now, we map as is.
            noVotes: p.account.noVotes.toString(),
            creator: p.account.creator.toBase58(),
        }));
    } catch (e) {
        console.error("Failed to fetch proposals", e);
        return [];
    }
};

export const submitEncryptedVote = async (wallet: WalletContextState, proposalId: number, choice: number) => {
    const program = getProgram(wallet);
    if (!program || !wallet.publicKey) throw new Error("Wallet not connected");

    // 1. Encrypt the vote using Arcium
    const encryptedPayload = await arcium.encryptVote(choice, wallet.publicKey, proposalId);

    // 2. Submit to Solana
    // Convert Uint8Array to Buffer for Anchor if needed, but usually number[] or Buffer works
    const buffer = Buffer.from(encryptedPayload);

    try {
        // Call 'submit_encrypted_vote' instruction
        const tx = await program.methods
            .submitEncryptedVote(buffer)
            .accounts({
                encryptedVote: PublicKey.findProgramAddressSync(
                    [Buffer.from("vote"), wallet.publicKey.toBuffer(), new Uint8Array([proposalId])], // illustrative seeds
                    program.programId
                )[0],
                proposal: PublicKey.findProgramAddressSync(
                    [Buffer.from("proposal"), new Uint8Array([proposalId])], // illustrative seeds
                    program.programId
                )[0],
                voter: wallet.publicKey,
                // systemProgram is auto-included
            })
            .rpc();

        console.log("Vote submitted:", tx);
        return tx;
    } catch (e) {
        console.error("Vote failed:", e);
        throw e;
    }
};
