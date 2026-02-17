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
}

const MOCK_PROPOSALS: Proposal[] = [
    {
        id: 'prop-1',
        title: 'Update Treasury Multisig Threshold',
        description: 'Increase the required signatures for treasury transactions from 3/5 to 4/7 to improve security distribution.',
        status: 'active',
        votesFor: 125000,
        votesAgainst: 45000,
        endDate: '2024-12-15T00:00:00Z',
        tags: ['Security', 'Treasury']
    },
    {
        id: 'prop-2',
        title: ' onboard New Risk Oracle',
        description: 'Approve "Sentinel V2" as a trusted oracle for assessing protocol risk parameters.',
        status: 'passed',
        votesFor: 890000,
        votesAgainst: 12000,
        endDate: '2024-11-20T00:00:00Z',
        tags: ['Integration', 'Risk']
    },
    {
        id: 'prop-3',
        title: 'Reduce Unbonding Period',
        description: 'Proposal to reduce the staking unbonding period from 21 days to 14 days.',
        status: 'rejected',
        votesFor: 34000,
        votesAgainst: 156000,
        endDate: '2024-10-01T00:00:00Z',
        tags: ['Staking', 'Parameters']
    }
];

export const mockApi = {
    getProposals: async (): Promise<Proposal[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return MOCK_PROPOSALS;
    },

    getQuorumStatus: async (): Promise<QuorumStatus> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            current: 170000, // Total votes
            required: 200000,
            progress: 85
        };
    },

    submitVote: async (proposalId: string, vote: 'for' | 'against'): Promise<{ success: true }> => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(`[Mock API] Voted ${vote} on proposal ${proposalId}`);
        return { success: true };
    }
};
