import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

export const RPC_ENDPOINT = process.env.NEXT_PUBLIC_RPC || clusterApiUrl("devnet");
export const PROGRAM_ID = new PublicKey(
    process.env.NEXT_PUBLIC_PROGRAM_ID || "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"
);

export const connection = new Connection(RPC_ENDPOINT, "confirmed");
