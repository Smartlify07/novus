export type RepaymentStep = 'amount' | 'method' | 'review' | 'success';

export const REPAYMENT_STEPS: Array<{
  id: number;
  label: string;
  value: RepaymentStep;
}> = [
  { id: 1, label: 'Amount', value: 'amount' },
  { id: 2, label: 'Method', value: 'method' },
  { id: 3, label: 'Review', value: 'review' },
  { id: 4, label: 'Done', value: 'success' },
];
