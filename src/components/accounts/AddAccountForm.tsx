'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Wallet } from 'lucide-react';

const accountTypes = [
  { value: 'checking', label: 'Checking Account', emoji: '💳' },
  { value: 'savings', label: 'Savings Account', emoji: '🏦' },
  { value: 'credit_card', label: 'Credit Card', emoji: '💎' },
  { value: 'cash', label: 'Cash', emoji: '💵' },
  { value: 'investment', label: 'Investment', emoji: '📈' },
];

export default function AddAccountForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Simple state management instead of react-hook-form
  const [formData, setFormData] = useState({
    name: '',
    type: 'checking',
    balance: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    type: '',
    balance: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      type: '',
      balance: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Account name is required';
    }

    if (!formData.balance) {
      newErrors.balance = 'Initial balance is required';
    } else if (isNaN(Number(formData.balance))) {
      newErrors.balance = 'Balance must be a number';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.balance;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          type: formData.type,
          balance: parseFloat(formData.balance),
          currency: 'INR',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // Success! Redirect to accounts page
      router.push('/accounts');
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Account Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., HDFC Checking"
          disabled={loading}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Account Type</Label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          disabled={loading}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {accountTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.emoji} {type.label}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="text-sm text-destructive">{errors.type}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="balance">Initial Balance (₹)</Label>
        <Input
          id="balance"
          type="number"
          step="0.01"
          value={formData.balance}
          onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
          placeholder="0.00"
          disabled={loading}
        />
        {errors.balance && (
          <p className="text-sm text-destructive">{errors.balance}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Enter the current balance of this account
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
          {error}
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Create Account
          </>
        )}
      </Button>
    </form>
  );
}
