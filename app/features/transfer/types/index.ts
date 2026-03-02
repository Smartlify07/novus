import { Transaction } from '@/types';

export type TransferPayload = {
  sourceAccountId: number;
  destinationAccountNumber: string;
  amount: number;
  description: string;
};

export type TransferDataState = {
  recepient: Omit<Transaction['recepient'], 'id' | 'email'>;
  sourceAccountId: number;
  amount: number;
  description: string;
};
