export type Transaction = {
  id: number;
  transactionRef: string;
  sourceAccountId: number;
  destinationAccountId: number;
  transactionType: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  amount: number;
  currency: string;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
};

export type Account = {
  id: number;
  accountNumber: string;
  accountType: 'SAVINGS' | 'CURRENT' | 'FIXED_DEPOSIT';
  balance: number;
  currency: string;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  createdAt: string;
};

export type AccountBalanceResponse = {
  accountNumber: string;
  balance: number;
  currency: string;
  availableBalance: number;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  isActive: boolean;
  roles: string[];
};

export type AccountWithUser = Account & {
  user: Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>;
};
