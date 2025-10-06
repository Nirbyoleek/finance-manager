import { prisma } from '@/lib/prisma';

export default async function TestDbPage() {
  // Count users in database
  const userCount = await prisma.user.count();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Database Connection Test</h1>
      <p className="mt-4">
        Total users in database: <strong>{userCount}</strong>
      </p>
      <p className="mt-2 text-sm text-gray-600">
        If you see this, Prisma is working! ✅
      </p>
    </div>
  );
}
