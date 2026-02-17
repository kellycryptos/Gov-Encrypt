import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json([
        {
            address: "8x...92F",
            votingPower: 450000,
            proposalsVoted: 12,
            name: "DAO Steward"
        },
        {
            address: "3y...p8K",
            votingPower: 210000,
            proposalsVoted: 8,
            name: "Community Lead"
        },
        {
            address: "5z...q2M",
            votingPower: 150000,
            proposalsVoted: 15,
            name: "Active Voter"
        }
    ]);
}
