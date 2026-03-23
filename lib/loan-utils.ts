import { Loan } from '@/types';

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
