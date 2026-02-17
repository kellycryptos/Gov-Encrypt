import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { mockApi } from "@/lib/mockApi";

export const useProgram = () => {
    const wallet = useAnchorWallet();

    const getProposals = async () => {
        try {
            return await mockApi.getProposals();
        } catch (e) {
            console.error("Error fetching proposals via relayer:", e);
            return [];
        }
    };

    const getDelegations = async () => {
        try {
            return await mockApi.getDelegations();
        } catch (e) {
            console.error("Error fetching delegations via relayer:", e);
            return [];
        }
    };

    const submitVote = async (proposalId: string, vote: 'for' | 'against') => {
        if (!wallet) return;
        try {
            // In a real scenario, we'd sign a message here for authentication
            return await mockApi.submitVote(proposalId, vote);
        } catch (e) {
            console.error("Error submitting vote via relayer:", e);
        }
    };

    return {
        isConnected: !!wallet,
        getProposals,
        getDelegations,
        submitVote,
    };
};


