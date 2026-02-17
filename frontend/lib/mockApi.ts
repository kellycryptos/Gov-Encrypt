export interface Proposal {
    id: string;
    title: string;
    description: string;
    status: 'active' | 'passed' | 'rejected' | 'executed';
    votesFor: number;
    votesAgainst: number;
    endDate: string;
    tags: string[];
}

export interface QuorumStatus {
    current: number;
    required: number;
    progress: number; // 0-100
    status: string;
}

export interface Delegate {
    address: string;
    votingPower: number;
    proposalsVoted: number;
    name: string;
}

const API_Base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';


export const mockApi = {
    getProposals: async (): Promise<Proposal[]> => {
        // Updated to use local API route as requested
        const res = await fetch("/api/proposals");

        if (!res.ok) {
            console.error("API error:", res.status);
            return [];
        }
        return res.json();
    },

    getQuorumStatus: async (): Promise<QuorumStatus> => {
        const res = await fetch(`${API_Base}/quorum`);
        if (!res.ok) throw new Error('Failed to fetch quorum');
        return res.json();
    },

    getDelegations: async (): Promise<Delegate[]> => {
        const res = await fetch(`${API_Base}/delegations`);
        if (!res.ok) throw new Error('Failed to fetch delegations');
        return res.json();
    },

    submitVote: async (proposalId: string, vote: 'for' | 'against'): Promise<{ success: true }> => {
        const res = await fetch(`${API_Base}/vote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ proposalId, vote })
        });
        if (!res.ok) throw new Error('Failed to submit vote');
        return res.json();
    }
};
