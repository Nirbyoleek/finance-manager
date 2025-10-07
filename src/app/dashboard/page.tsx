import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Plus,
  Receipt,
  BarChart3,
  Target,
  ArrowUpRight,
  CreditCard,
} from 'lucide-react';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  // Fetch user with accounts
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      financeAccounts: {
        where: { isActive: true },
      },
    },
  });

  const accounts = user?.financeAccounts || [];
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex">
            <Link className="mr-6 flex items-center space-x-2" href="/dashboard">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <DollarSign className="h-5 w-5" />
              </div>
              <span className="hidden font-bold sm:inline-block">Finance Manager</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center gap-1">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/accounts">Accounts</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/transactions">Transactions</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/budgets">Budgets</Link>
              </Button>
            </nav>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
              {session.user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="container py-6">
          {/* Welcome Section */}
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {session.user.name || 'User'}!
            </h1>
            <p className="text-muted-foreground">
              Here's your financial overview for today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Balance
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ₹{totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {accounts.length} {accounts.length === 1 ? 'account' : 'accounts'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Income
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹0.00</div>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Expenses
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹0.00</div>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold tracking-tight">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-24 flex-col" asChild>
                <Link href="/accounts/new">
                  <Plus className="mb-2 h-6 w-6" />
                  <span className="font-medium">Add Account</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-24 flex-col" asChild>
                <Link href="/transactions/new">
                  <Receipt className="mb-2 h-6 w-6" />
                  <span className="font-medium">Add Transaction</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-24 flex-col" asChild>
                <Link href="/reports">
                  <BarChart3 className="mb-2 h-6 w-6" />
                  <span className="font-medium">View Reports</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-24 flex-col" asChild>
                <Link href="/budgets">
                  <Target className="mb-2 h-6 w-6" />
                  <span className="font-medium">Set Budget</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/transactions" className="flex items-center gap-1">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-10">
                <div className="mb-4 rounded-full bg-muted p-6">
                  <CreditCard className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">No transactions yet</h3>
                <p className="mb-4 max-w-sm text-center text-sm text-muted-foreground">
                  Add your first transaction to start tracking your income and expenses.
                </p>
                <Button asChild>
                  <Link href="/transactions/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Transaction
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
