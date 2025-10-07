import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    const { name, type, balance, currency } = body;

    // Validate required fields
    if (!name || !type || balance === undefined || balance === null) {
      return NextResponse.json(
        { error: 'Missing required fields: name, type, and balance are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const parsedBalance = Number(balance);
    if (!Number.isFinite(parsedBalance)) {
      return NextResponse.json(
        { error: 'Balance must be a valid number' },
        { status: 400 }
      );
    }

    // Create account
    const account = await prisma.financeAccount.create({
      data: {
        name: name.trim(),
        type,
        balance: parsedBalance,
        currency: currency || 'INR',
        userId: user.id,
      },
    });

    // Account created successfully

    return NextResponse.json({ account }, { status: 201 });
  } catch (error: unknown) {
    console.error('Create account error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create account' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        financeAccounts: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return NextResponse.json({ accounts: user?.financeAccounts || [] });
  } catch (error: unknown) {
    console.error('Fetch accounts error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}
