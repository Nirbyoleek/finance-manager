import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {session.user.name || session.user.email}!
          </p>
          <div className="mt-4">
            <Button asChild>
              <Link href="/accounts/new">Add Account</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Total Balance Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Total Balance</h3>
            <p className="mt-2 text-3xl font-bold">₹0.00</p>
            <p className="mt-1 text-sm text-green-600">+2.5% from last month</p>
          </div>

          {/* Income Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Income</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">₹0.00</p>
            <p className="mt-1 text-sm text-muted-foreground">This month</p>
          </div>

          {/* Expenses Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Expenses</h3>
            <p className="mt-2 text-3xl font-bold text-red-600">₹0.00</p>
            <p className="mt-1 text-sm text-muted-foreground">This month</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <p className="mt-2 text-muted-foreground">No transactions yet. Add your first account!</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
