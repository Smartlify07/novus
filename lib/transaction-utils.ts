import { Transaction } from '@/types';

function getTransactionStatusColor(status: string) {
  switch (status) {
    case 'successful':
      return 'bg-green-500/10 text-green-800';
    case 'failed':
      return 'bg-red-500/10 text-red-800';
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-800';
    default:
      return 'bg-gray-500/10 text-gray-800';
  }
}

function getTransactionTypeColor(type: string) {
  switch (type) {
    case 'credit':
      return 'bg-green-500/10 text-green-800';
    case 'debit':
      return 'bg-red-500/10 text-red-800';
    default:
      return 'bg-gray-500/10 text-gray-800';
  }
}

function formatTransactionDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTransactionDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getTransactionAmountColor(type: Transaction['type']) {
  if (type === 'credit') {
    return 'text-green-800';
  } else if (type === 'debit') {
    return 'text-red-800';
  }
  return 'text-gray-800';
}

function calculateTotalTransactionsTypeAmount(
  transactions: Transaction[],
  type: 'credit' | 'debit',
): number {
  return transactions
    .filter((tx) => tx.type === type)
    .filter((tx) => tx.status === 'successful')
    .reduce((total, tx) => total + tx.amount, 0);
}

function calculateTotalIncome(transactions: Transaction[]): number {
  return calculateTotalTransactionsTypeAmount(transactions, 'credit');
}

function calculateTotalExpenses(transactions: Transaction[]): number {
  return calculateTotalTransactionsTypeAmount(transactions, 'debit');
}

function calculateTotalTransactionsAmount(transactions: Transaction[]): number {
  return (
    calculateTotalIncome(transactions) + calculateTotalExpenses(transactions)
  );
}

function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) {
    return current === 0 ? 0 : 100; // Handle division by zero
  }
  return ((current - previous) / Math.abs(previous)) * 100;
}

function getPercentageChangeColor(percentageChange: number): string {
  if (percentageChange > 0) {
    return 'text-green-600';
  } else if (percentageChange < 0) {
    return 'text-red-600';
  }
  return 'text-gray-600';
}

function getExpensePercentageChangeColor(percentageChange: number): string {
  if (percentageChange > 0) {
    return 'text-red-600';
  } else if (percentageChange < 0) {
    console.log('Negative change:', percentageChange);
    return 'text-green-600';
  }
  return 'text-gray-600';
}

export {
  getTransactionStatusColor,
  getTransactionTypeColor,
  formatTransactionDate,
  getTransactionAmountColor,
  formatTransactionDateTime,
  calculateTotalTransactionsAmount,
  calculateTotalExpenses,
  calculateTotalIncome,
  calculatePercentageChange,
  getPercentageChangeColor,
  getExpensePercentageChangeColor,
};
