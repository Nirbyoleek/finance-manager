'use client';

import * as React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost';
  size?: 'default' | 'icon';
  asChild?: boolean;
  children?: React.ReactNode;
} & Record<string, unknown>;

export function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const variantClasses =
    variant === 'ghost'
      ? 'bg-transparent hover:bg-gray-100 text-gray-900'
      : 'bg-blue-600 text-white hover:bg-blue-700';

  const sizeClasses = size === 'icon' ? 'h-10 w-10 p-0' : 'px-4 py-2';
  const baseClasses = `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses} ${sizeClasses}`;

  if (asChild && React.isValidElement(children)) {
    const childClassName = (children.props as { className?: string }).className || '';
    return React.cloneElement(children as React.ReactElement, {
      className: `${baseClasses} ${childClassName} ${className ?? ''}`.trim(),
      ...props,
    });
  }

  return (
    <button className={`${baseClasses} ${className ?? ''}`} {...props}>
      {children}
    </button>
  );
}


