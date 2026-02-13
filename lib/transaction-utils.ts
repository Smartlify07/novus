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

export {
  getTransactionStatusColor,
  getTransactionTypeColor,
  formatTransactionDate,
  getTransactionAmountColor,
  formatTransactionDateTime,
};
