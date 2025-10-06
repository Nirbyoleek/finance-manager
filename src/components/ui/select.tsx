'use client';

import * as React from 'react';

type SelectRootProps = {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
};

export function Select({ children }: SelectRootProps) {
  return <div>{children}</div>;
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-left">
      {children}
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span className="text-gray-600">{placeholder}</span>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="mt-2 rounded-md border bg-white p-1 shadow-md">{children}</div>;
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <div data-value={value} className="cursor-pointer rounded-sm px-2 py-1 hover:bg-gray-100">
      {children}
    </div>
  );
}


