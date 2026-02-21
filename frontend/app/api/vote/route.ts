import { NextResponse } from 'next/server';

// In-memory store for demo purposes
// Initialize with some votes already if needed
let mockVotes: Record<string, { for: number, against: number }> = {
    "1": { for: 154, against: 12 },
    "2": { for: 89, against: 45 },
    "3": { for: 210, against: 5 }
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { proposalId, vote } = body;

        if (!mockVotes[proposalId]) {
            mockVotes[proposalId] = { for: 0, against: 0 };
        }

        if (vote === 'for') {
            mockVotes[proposalId].for += 1;
        } else if (vote === 'against') {
            mockVotes[proposalId].against += 1;
        }

        return NextResponse.json({ success: true, mockVotes: mockVotes[proposalId] });
    } catch (e) {
        return NextResponse.json({ error: "Failed to process vote" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id && mockVotes[id]) {
        return NextResponse.json(mockVotes[id]);
    }
    return NextResponse.json(mockVotes);
}
