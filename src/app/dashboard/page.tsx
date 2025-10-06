import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';

export default async function DashboardPage() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back, {session.user.name || session.user.email}!</p>
          </div>
          
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/auth/signin' });
            }}
          >
            <button
              type="submit"
              className="rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
            >
              Sign Out
            </button>
          </form>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900">Your Financial Overview</h2>
          <p className="mt-4 text-gray-600">
            This is your protected dashboard. Only authenticated users can see this page.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            User ID: {session.user.id}
          </p>
        </div>
      </div>
    </div>
  );
}
