import { create } from 'zustand';
import {
  accounts,
  currentUserAccounts,
  transactions,
} from '@/app/features/dashboard/data/dummyTxs';
import { TransferDataState } from '@/app/features/transfer/types';
import { Account, AccountWithUser, Transaction } from '@/types';
import { getRecentTransfers } from '@/lib/transaction-utils';
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
  goToNextStep: () => void;
  goToPreviousStep: () => void;
};

export const useTransferWorkflowStore = create<TransferWorkflowStore>(
  (set, get) => ({
    step: Steps.EnterRecipient,
    data: {
      amount: undefined,
      description: '',
      recepient: null,
      sourceAccountId: currentUserAccounts[0].id,
    },
    recepientVerificationStatus: {
      error: false,
      success: false,
    },
    recentTransfers: getRecentTransfers(
      transactions,
      currentUserAccounts[0].id,
    ),

    setStep: (step) => set({ step }),

    setData: (data) =>
      set(typeof data === 'function' ? { data: data(get().data) } : { data }),

    updateRecipientAccount: (accountNumber) => {
      const { data } = get();

      set({
        data: { ...data, recepient: { ...data.recepient!, accountNumber } },
      });

      if (accountNumber.length !== MAX_ACCT_NUMBER_LENGTH) {
        set({ recepientVerificationStatus: { error: false, success: false } });
      } else {
        const accountFound = accounts.find(
          (account) => account.accountNumber === accountNumber,
        );
        if (accountFound) {
          set({
            data: { ...get().data, recepient: accountFound },
            recepientVerificationStatus: { error: false, success: true },
          });
        } else {
          set({ recepientVerificationStatus: { error: true, success: false } });
        }
      }
    },

    updateVerificationStatus: (success, error) => {
      set({ recepientVerificationStatus: { error, success } });
    },

    handleSelectRecepient: (value) => {
      set({
        step: Steps.EnterAmount,
        data: { ...get().data, recepient: value },
      });
    },

    handleSwitchSourceAccount: (account) => {
      const recentTransfers = getRecentTransfers(transactions, account.id);
      set({
        data: { ...get().data, sourceAccountId: account.id },
        recentTransfers,
      });
    },

    goToNextStep: () => {
      set((state) => ({ step: state.step + 1 }));
    },

    goToPreviousStep: () => {
      set((state) => ({ step: Math.max(1, state.step - 1) }));
    },
  }),
);
