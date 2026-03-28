import { Account, Loan } from '@/types';

export function getSuggestedAmount(
  loan: Pick<Loan, 'monthlyPayment' | 'outstandingBalance'>,
) {
  return Math.min(loan.monthlyPayment, loan.outstandingBalance);
}

export function createPaymentReference() {
  return `LR-${Date.now().toString(36).toUpperCase()}`;
}

export function convertToCapitalized(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

export function getAmountError({
  amount,
  outstandingBalance,
  selectedAccount,
}: {
  amount: number;
  outstandingBalance: number;
  selectedAccount: Account | null;
}) {
  if (!selectedAccount) return 'Choose an account to continue.';
  if (!amount || amount <= 0) return 'Enter a valid repayment amount.';
  if (amount > outstandingBalance) {
    return 'Repayment amount cannot exceed the outstanding balance.';
  }
  if (amount > selectedAccount.balance) {
    return 'Selected account does not have enough balance for this repayment.';
  }
  return '';
}
