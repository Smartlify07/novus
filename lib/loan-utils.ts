import { Loan, LoanType } from '@/types';
import {
  Briefcase,
  House02Icon,
  Note01Icon,
  User,
} from '@hugeicons/core-free-icons';

export function calculateMonthlyPayment(
  principal: number,
  rate: number,
  numberOfMonths = 12,
) {
  if (numberOfMonths === 0) {
    return 0;
  }
  const rateResult = rate / 100;
  const futureValueFactor = Math.pow(1 + rateResult, numberOfMonths);
  const numerator = rateResult * futureValueFactor;
  const denominator = futureValueFactor - 1;
  return Math.max(Math.round(principal * (numerator / denominator)), 0);
}

export function calculateTotalRepayableAmount(
  principal: number,
  rate: number,
  numberOfMonths: number,
) {
  const total =
    calculateMonthlyPayment(principal, rate, numberOfMonths) * numberOfMonths;

  return Math.round(total);
}

export function calculateInterest(
  principal: number,
  rate: number,
  numberOfMonths: number,
) {
  const total =
    calculateMonthlyPayment(principal, rate, numberOfMonths) * numberOfMonths -
    principal;

  return Math.round(total);
}

export function totalPaid(loan: Loan): number {
  return loan.principalAmount - loan.outstandingBalance;
}

export function percentagePaid(loan: Loan) {
  if (loan.principalAmount === 0) {
    return 0;
  } else {
    return (totalPaid(loan) / loan.principalAmount) * 100;
  }
}

export function paymentsCompleted(loan: Loan, today: Date): number {
  if (loan.status === 'CLOSED') return loan.termMonths;

  const start = new Date(loan.disbursementDate);
  const months =
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth());

  return Math.min(Math.max(months, 0), loan.termMonths);
}

export function nextDueDate(loan: Loan, today: Date): Date | null {
  if (loan.status !== 'ACTIVE') return null;

  const completed = paymentsCompleted(loan, today);
  const date = new Date(loan.disbursementDate);
  date.setMonth(date.getMonth() + completed + 1);
  return date;
}

export type AttentionSignal =
  | { type: 'overdue'; daysOverdue: number }
  | { type: 'due-soon'; daysUntil: number; dueDate: Date }
  | null;

export function attentionSignal(loan: Loan, today: Date): AttentionSignal {
  if (loan.status !== 'ACTIVE') return null;

  const due = nextDueDate(loan, today);
  if (!due) return null;

  const daysUntil = Math.round((due.getTime() - today.getTime()) / 86_400_000);

  if (daysUntil < 0)
    return { type: 'overdue', daysOverdue: Math.abs(daysUntil) };
  if (daysUntil <= 7) return { type: 'due-soon', daysUntil, dueDate: due };
  return null;
}

export type ScheduleEntry = {
  installment: number;
  date: Date;
  amount: number;
  isPaid: boolean;
  isCurrent: boolean;
};

export function repaymentSchedule(loan: Loan, today: Date): ScheduleEntry[] {
  const completed = paymentsCompleted(loan, today);
  const start = new Date(loan.disbursementDate);

  return Array.from({ length: loan.termMonths }, (_, i) => {
    const installment = i + 1;
    const date = new Date(start);
    date.setMonth(date.getMonth() + installment);

    return {
      installment,
      date,
      amount: loan.monthlyPayment,
      isPaid: installment <= completed,
      isCurrent: installment === completed + 1 && loan.status === 'ACTIVE',
    };
  });
}

export function loanMeta(loanType: LoanType) {
  return (
    {
      PERSONAL: { icon: User },
      BUSINESS: { icon: Briefcase },
      MORTGAGE: { icon: House02Icon },
    }[loanType] || { icon: Note01Icon }
  );
}
