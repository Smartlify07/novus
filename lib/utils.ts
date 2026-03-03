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

export function getPercentageChangeColor(percentageChange: number): string {
  if (percentageChange > 0) {
    return 'text-green-600';
  } else if (percentageChange < 0) {
    return 'text-red-600';
  }
  return 'text-gray-600';
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

export function getTimeInMs(date: Date): number {
  return date.getTime();
}

export function splitAccountNumber(number: string) {
  return (
    number.slice(0, 3) +
    ' ' +
    number.slice(3, 6) +
    ' ' +
    number.slice(6, 9) +
    ' ' +
    number.slice(9)
  );
}

export function splitAndAsteriskLast5Digits(number: string) {
  return splitAccountNumber(number.split(' ').join('').slice(0, 9) + '*****');
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    currencySign: 'accounting',
  }).format(amount);
}
