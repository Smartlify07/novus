import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(
  error: unknown,
  fallbackMessage = 'An unknown error occurred',
): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return fallbackMessage;
}

export function calculatePercentageChange(
  oldValue: number,
  newValue: number,
): number {
  if (oldValue === 0) {
    return newValue === 0 ? 0 : 100; // Handle division by zero
  }
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
}

export function calculateDueDate(daysUntilDue: number): string {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + daysUntilDue);
  return dueDate.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function calculateDaysUntilDue(dueDate: Date): number {
  const today = new Date();
  const timeDiff = dueDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

export function formatCurrency(
  amount: number,
  currency: string = 'USD',
): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(amount);
}
