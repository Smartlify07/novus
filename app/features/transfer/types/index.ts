import { AccountWithUser, Transaction } from '@/types';

export type TransferPayload = {
  sourceAccountId: number;
  destinationAccountNumber: string;
  amount: number;
  description: string;
};

export type TransferDataState = {
  recepient: AccountWithUser | null;
  sourceAccountId: number;
  amount: number;
  description: string;
};
