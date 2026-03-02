export type Transaction = {
  id: string;
  description: string;
  amount: number;
  status: 'successful' | 'failed' | 'pending';
  merchantName: string;
  method: 'transfer' | 'payment' | 'withdrawal' | 'deposit';
  type: 'credit' | 'debit';
  txRefrence: string;
  recepient: Account['owner'] & {
    accountNumber: string;
  };
  sender: Account['owner'] & {
    accountNumber: string;
  };
  createdAt: string;
  beneficiaryInstitution?: string;
  sourceInstitution?: string;
  notes?: string;
};

export type Account = {
  id: string;
  accountNumber: string;
  accountType: 'savings' | 'checking' | 'credit';
  balance: number;
  currency: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};
