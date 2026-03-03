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

export function splitAccountNumber(number: string, group = 3, end = 6) {
  let arr = [];
  const cleaned = number.replace('\s/g', '');
  const leadingPart = cleaned.slice(0, cleaned.length - end);
  const trailingPart = number.slice(number.length - end);
  for (let i = 0; i <= leadingPart.length - 1; i += group) {
    arr.push(leadingPart.slice(i, i + group));
  }
  arr.push(trailingPart);
  return arr.join(' ');
}

export function maskAccountNumber(number: string, group = 3, end = 6) {
  let arr = [];
  if (number.length <= end) {
    return number;
  }
  const splitted = splitAccountNumber(number);
  const cleaned = splitted.replace(/\s/g, '');
  const leadingPart = cleaned.slice(0, cleaned.length - end);
  for (let i = 0; i <= leadingPart.length - 1; i += group) {
    arr.push(leadingPart.slice(i, i + group));
  }
  arr.push('*'.repeat(end));
  return arr.join(' ');
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    currencySign: 'accounting',
  }).format(amount);
}
