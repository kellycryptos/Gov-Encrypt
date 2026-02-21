import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Fetch current mock votes state
    const baseUrl = new URL(request.url).origin;
    let currentVotes;
    try {
        const votesRes = await fetch(`${baseUrl}/api/vote`);
        if (votesRes.ok) {
            currentVotes = await votesRes.json();
        }
    } catch (e) {
        console.warn("Could not fetch latest mock votes:", e);
    }

    const defaultVotes = {
        "1": { for: 1200, against: 450 },
        "2": { for: 850, against: 120 },
        "3": { for: 3000, against: 50 },
    };

    const votes = currentVotes || defaultVotes;

    return NextResponse.json([
        {
            id: "1",
            title: "Upgrade Treasury Logic",
            description: "Proposal to upgrade the multi-sig treasury logic to support new asset types.",
            status: "Active",
            votesFor: votes["1"]?.for || 1200,
            votesAgainst: votes["1"]?.against || 450,
            endDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
            tags: ["Treasury", "Tech"],
        },
        {
            id: "2",
            title: "Integrate Arcium Privacy Layer",
            description: "Implement Arcium's confidential compute for private voting on sensitive proposals.",
            status: "Active",
            votesFor: votes["2"]?.for || 850,
            votesAgainst: votes["2"]?.against || 120,
            endDate: new Date(Date.now() + 86400000 * 5).toISOString(),
            tags: ["Privacy", "Arcium"],
        },
        {
            id: "3",
            title: "Community Grant Deployment",
            description: "Allocate 5000 USDC for community growth initiatives and hackathons.",
            status: "Passed",
            votesFor: votes["3"]?.for || 3000,
            votesAgainst: votes["3"]?.against || 50,
            endDate: new Date(Date.now() - 86400000).toISOString(),
            tags: ["Growth"],
        },
    ]);
}
