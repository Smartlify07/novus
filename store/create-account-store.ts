import { create } from 'zustand';

export type AccountType = 'SAVINGS' | 'CURRENT' | 'FIXED_DEPOSIT';

export type FundingSource = 'bank_transfer' | 'card' | 'existing_account';

export type CreateAccountData = {
  accountType: AccountType | null;
  initialDeposit: number | undefined;
  fundingSource: FundingSource | null;
};

type CreateAccountStore = {
  step: number;
  data: CreateAccountData;
  
  setStep: (step: number) => void;
  setData: (data: Partial<CreateAccountData>) => void;
  setAccountType: (accountType: AccountType) => void;
  setInitialDeposit: (amount: number | undefined) => void;
  setFundingSource: (fundingSource: FundingSource) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  reset: () => void;
};

const initialData: CreateAccountData = {
  accountType: null,
  initialDeposit: undefined,
  fundingSource: null,
};

export const useCreateAccountStore = create<CreateAccountStore>((set) => ({
  step: 1,
  data: initialData,

  setStep: (step) => set({ step }),

  setData: (data) =>
    set((state) => ({ data: { ...state.data, ...data } })),

  setAccountType: (accountType) =>
    set((state) => ({ data: { ...state.data, accountType } })),

  setInitialDeposit: (initialDeposit) =>
    set((state) => ({ data: { ...state.data, initialDeposit } })),

  setFundingSource: (fundingSource) =>
    set((state) => ({ data: { ...state.data, fundingSource } })),

  goToNextStep: () => set((state) => ({ step: state.step + 1 })),

  goToPreviousStep: () =>
    set((state) => ({ step: Math.max(1, state.step - 1) })),

  reset: () => set({ step: 1, data: initialData }),
}));
