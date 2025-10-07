import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AddAccountForm from '@/components/accounts/AddAccountForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function NewAccountPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/accounts" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Accounts
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto py-8 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Add New Account</CardTitle>
              <CardDescription>
                Create a new account to start tracking your finances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddAccountForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
