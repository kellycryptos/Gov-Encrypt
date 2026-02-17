import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        current: 6500000,
        required: 10000000,
        progress: 65,
        status: "Active"
    });
}
