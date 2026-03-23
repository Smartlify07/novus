export type Pagination = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

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

export type LoanType = 'PERSONAL' | 'BUSINESS' | 'MORTGAGE';

export type LoanStatus =
  | 'APPROVED'
  | 'PENDING'
  | 'REJECTED'
  | 'ACTIVE'
  | 'CLOSED';

export type Loan = {
  id: number;
  loanNumber: string;
  loanType: LoanType;
  principalAmount: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  outstandingBalance: number;
  status: LoanStatus;
  applicationDate: string;
  disbursementDate: string;
  maturityDate: string;
};

export type AccountWithUser = Account & {
  user: Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>;
};
