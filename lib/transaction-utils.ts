import {
  accounts,
  currentUser,
  currentUserAccounts,
} from '@/app/features/dashboard/data/dummyTxs';
import { Account, Transaction } from '@/types';
import { getMilliseconds } from 'date-fns';

type TransactionTypeUnion = 'credit' | 'debit' | null;
function getTransactionStatusColor(status: Transaction['status']) {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-500/10 text-green-800';
    case 'FAILED':
      return 'bg-red-500/10 text-red-800';
    case 'PENDING':
      return 'bg-yellow-500/10 text-yellow-800';
    default:
      return 'bg-gray-500/10 text-gray-800';
  }
}

function getTransactionTypeColor(type: TransactionTypeUnion) {
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
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getTransactionAmountColor(type: TransactionTypeUnion) {
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
  currentAccount: Account | null,
): number {
  return transactions
    .filter((tx) =>
      type === 'credit'
        ? tx.destinationAccountId === currentAccount?.id
        : tx.sourceAccountId === currentAccount?.id,
    )
    .filter((tx) => tx.status === 'COMPLETED')
    .reduce((total, tx) => total + tx.amount, 0);
}

function calculateTotalIncome(
  transactions: Transaction[],
  currentAccount: Account | null,
): number {
  return calculateTotalTransactionsTypeAmount(
    transactions,
    'credit',
    currentAccount,
  );
}

function calculateTotalExpenses(
  transactions: Transaction[],
  currentAccount: Account | null,
): number {
  return calculateTotalTransactionsTypeAmount(
    transactions,
    'debit',
    currentAccount,
  );
}

function calculateTotalTransactionsAmount(
  transactions: Transaction[],
  currentAccount: Account | null,
): number {
  return (
    calculateTotalIncome(transactions, currentAccount) +
    calculateTotalExpenses(transactions, currentAccount)
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
    return 'text-green-600';
  }
  return 'text-gray-600';
}

function getRecentTransfers(
  transactions: Transaction[],
  currentUserAccount: Account['id'] | undefined,
) {
  if (!currentUserAccount) {
    // Return or throw error
    return [];
  }
  const result = transactions
    .sort((a, b) => getMilliseconds(b.createdAt) - getMilliseconds(a.createdAt))
    .filter(
      (transaction) =>
        transaction.sourceAccountId === currentUserAccount &&
        transaction.transactionType === 'TRANSFER',
    );
  const uniqueIds = new Set();

  const uniqueArray = result.filter((item) => {
    if (!uniqueIds.has(item.sourceAccountId)) {
      uniqueIds.add(item.sourceAccountId);
      return true; // Keep the object
    }
    return false; // Discard the duplicate
  });
  return uniqueArray;
}

function getTransactionStatus(
  sourceAccountId: Transaction['sourceAccountId'],
  destinationAccountId: Transaction['destinationAccountId'],
  currentAccountId: Account['id'] | undefined,
  transactionType: Transaction['transactionType'],
): 'debit' | 'credit' | null {
  if (transactionType === 'DEPOSIT') {
    return destinationAccountId
      ? destinationAccountId === currentAccountId
        ? 'credit'
        : null
      : null;
  } else {
    if (!currentAccountId || !sourceAccountId) {
      return null;
    }
    return sourceAccountId === currentAccountId ? 'debit' : 'credit';
  }
}

function getAccountUser(accountId: Transaction['sourceAccountId']) {
  if (!accountId) {
    return null;
  }

  return accounts.find((account) => account.id === accountId);
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
  getRecentTransfers,
  getTransactionStatus,
  getAccountUser,
};
