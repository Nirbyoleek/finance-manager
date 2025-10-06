import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, balance, currency, userId } = body;

    if (!name || !type || balance === undefined) {
      return NextResponse.json(
        { error: 'Name, type, and balance are required' },
        { status: 400 }
      );
    }

    const account = await prisma.financeAccount.create({
      data: {
        name,
        type,
        balance,
        currency,
        userId,
      },
    });

    return NextResponse.json({ account }, { status: 201 });
  } catch (error) {
    console.error('Create account error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
