import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // In a real app, we would parse the body and submit to chain/db
    // const body = await request.json();
    return NextResponse.json({ success: true });
}
