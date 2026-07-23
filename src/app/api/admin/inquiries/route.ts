import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkAuth } from '@/lib/checkAuth';

export async function GET(req: Request) {
  try {
    const items = await db.getInquiries();
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.clientName || !body.email) {
      return NextResponse.json({ error: 'Client Name and Email are required' }, { status: 400 });
    }

    const newItem = await db.createInquiry(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
