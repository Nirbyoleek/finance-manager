'use client';

import * as React from 'react';

type SheetProps = {
  children: React.ReactNode;
};

type SheetContentProps = {
  children: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
};

type SheetTriggerProps = {
  children: React.ReactNode;
  asChild?: boolean;
};

export function Sheet({ children }: SheetProps) {
  return <div>{children}</div>;
}

export function SheetTrigger({ children }: SheetTriggerProps) {
  return <>{children}</>;
}

export function SheetContent({ children, className }: SheetContentProps) {
  return <div className={className}>{children}</div>;
}


