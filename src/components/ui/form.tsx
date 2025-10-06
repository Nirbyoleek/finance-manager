'use client';

import * as React from 'react';
import { Controller, FormProvider } from 'react-hook-form';

// Loosely typed helpers to avoid leaking generics into callsites
export function Form({ children, ...form }: any) {
  return <FormProvider {...form}>{children}</FormProvider>;
}

export function FormField({ control, name, render }: any) {
  return <Controller control={control} name={name as any} render={render as any} />;
}

export function FormItem({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

export function FormLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-gray-700">{children}</label>;
}

export function FormControl({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function FormMessage() {
  return <p className="text-sm text-red-600" role="alert"></p>;
}


