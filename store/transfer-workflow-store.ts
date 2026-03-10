import { create } from 'zustand';
import { TransferDataState } from '@/app/features/transfer/types';
import { Account, AccountWithUser, Transaction } from '@/types';
import { MAX_ACCT_NUMBER_LENGTH } from '@/lib/constants';

export const Steps = {
  EnterRecipient: 1,
  EnterAmount: 2,
  ReviewTransfer: 3,
  Success: 4,
} as const;

export const STEP_METADATA: Record<number, { title: string }> = {
  [Steps.EnterRecipient]: { title: 'Enter Recipient' },
  [Steps.EnterAmount]: { title: 'Enter Amount' },
  [Steps.ReviewTransfer]: { title: 'Review Transfer' },
  [Steps.Success]: { title: 'Success' },
};

type RecepientVerificationStatus = {
  success: boolean;
  error: boolean;
};

type TransferWorkflowStore = {
  step: number;
  data: TransferDataState;
  recepientVerificationStatus: RecepientVerificationStatus;
  recentTransfers: Transaction[];

  setStep: (step: number) => void;
  setData: React.Dispatch<React.SetStateAction<TransferDataState>>;
  updateRecipientAccount: (accountNumber: string) => void;
  updateVerificationStatus: (success: boolean, error: boolean) => void;
  handleSelectRecepient: (value: AccountWithUser) => void;
  handleSwitchSourceAccount: (account: Account) => void;
  setSourceAccountId: (accountId: number) => void;
  setRecentTransfers: (transfers: Transaction[]) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
};

const initialData: TransferDataState = {
  amount: undefined,
  description: '',
  recepient: null,
  destinationAccountNumber: '',
  sourceAccountId: 0,
};

export const useTransferWorkflowStore = create<TransferWorkflowStore>(
  (set, get) => ({
    step: Steps.EnterRecipient,
    data: initialData,
    recepientVerificationStatus: {
      error: false,
      success: false,
    },
    recentTransfers: [],

    setStep: (step) => set({ step }),

    setData: (data) =>
      set(typeof data === 'function' ? { data: data(get().data) } : { data }),

    updateRecipientAccount: (accountNumber) => {
      set({
        recepientVerificationStatus: { error: false, success: false },
      });

      if (accountNumber.length !== MAX_ACCT_NUMBER_LENGTH) {
        set({
          data: { ...get().data, destinationAccountNumber: accountNumber },
          recepientVerificationStatus: { error: false, success: false },
        });
      } else {
        set({
          data: { ...get().data, destinationAccountNumber: accountNumber },
          recepientVerificationStatus: { error: true, success: false },
        });
      }
    },

    updateVerificationStatus: (success, error) => {
      set({ recepientVerificationStatus: { error, success } });
    },

    handleSelectRecepient: (value) => {
      set({
        step: Steps.EnterAmount,
        data: { ...get().data, recepient: value, destinationAccountNumber: value.accountNumber },
      });
    },

    handleSwitchSourceAccount: (account) => {
      set({
        data: { ...get().data, sourceAccountId: account.id },
      });
    },

    setSourceAccountId: (accountId) => {
      set((state) => ({
        data: { ...state.data, sourceAccountId: accountId },
      }));
    },

    setRecentTransfers: (transfers) => {
      set({ recentTransfers: transfers });
    },

    goToNextStep: () => {
      set((state) => ({ step: state.step + 1 }));
    },

    goToPreviousStep: () => {
      set((state) => ({ step: Math.max(1, state.step - 1) }));
    },
  }),
);
