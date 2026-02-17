import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json([
        {
            id: "1",
            title: "Upgrade Treasury Logic",
            description: "Proposal to upgrade the multi-sig treasury logic to support new asset types.",
            status: "Active",
            votesFor: 1200,
            votesAgainst: 450,
            endDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
            tags: ["Treasury", "Tech"],
        },
        {
            id: "2",
            title: "Integrate Arcium Privacy Layer",
            description: "Implement Arcium's confidential compute for private voting on sensitive proposals.",
            status: "Active",
            votesFor: 850,
            votesAgainst: 120,
            endDate: new Date(Date.now() + 86400000 * 5).toISOString(),
            tags: ["Privacy", "Arcium"],
        },
        {
            id: "3",
            title: "Community Grant Deployment",
            description: "Allocate 5000 USDC for community growth initiatives and hackathons.",
            status: "Passed",
            votesFor: 3000,
            votesAgainst: 50,
            endDate: new Date(Date.now() - 86400000).toISOString(),
            tags: ["Growth"],
        },
    ]);
}
