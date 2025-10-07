import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DeleteAccountDialog from '@/components/accounts/DeleteAccountDialog';
import { Plus, Wallet, CreditCard, TrendingUp, Banknote, PiggyBank } from 'lucide-react';

const iconMap: Record<string, any> = {
  checking: CreditCard,
  savings: PiggyBank,
  credit_card: CreditCard,
  cash: Banknote,
  investment: TrendingUp,
};

const typeLabels: Record<string, string> = {
  checking: 'Checking Account',
  savings: 'Savings Account',
  credit_card: 'Credit Card',
  cash: 'Cash',
  investment: 'Investment',
};

export default async function AccountsPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      financeAccounts: {
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  const accounts = user?.financeAccounts || [];
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <h1 className="text-lg font-semibold">Accounts</h1>
          </div>
          <Button asChild>
            <Link href="/accounts/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Account
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-6">
          {/* Total Balance Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ₹{totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Across {accounts.length} {accounts.length === 1 ? 'account' : 'accounts'}
              </p>
            </CardContent>
          </Card>

          {/* Accounts List */}
          {accounts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <Wallet className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No accounts yet</h3>
                <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
                  Create your first account to start tracking your finances
                </p>
                <Button asChild>
                  <Link href="/accounts/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Account
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {accounts.map((account) => {
                const Icon = iconMap[account.type] || Wallet;
                return (
                  <Card key={account.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {account.name}
                      </CardTitle>
                      <div className="rounded-full bg-primary/10 p-2">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-1">
                        ₹{account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">
                        {typeLabels[account.type] || account.type}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link href={`/accounts/${account.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <div className="flex-1">
                          <DeleteAccountDialog
                            accountId={account.id}
                            accountName={account.name}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
