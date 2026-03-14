import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Account } from '@/types';

type AccountStore = {
  currentAccount: Account | null;
  setCurrentAccount: (account: Account) => void;
  setAccountBalance: (accountBalance: number) => void;
  clearCurrentAccount: () => void;
  getCurrentAccount: () => Account | null;
};

export const useAccountStore = create<AccountStore>()((set, get) => ({
  currentAccount: null,
  setCurrentAccount: (account) => set({ currentAccount: account }),
  clearCurrentAccount: () => set({ currentAccount: null }),
  getCurrentAccount: () => get().currentAccount,

  setAccountBalance: (accountBalance: number) =>
    set((state) => {
      if (!state.currentAccount) return state;
      return {
        currentAccount: { ...state.currentAccount, balance: accountBalance },
      };
    }),
}));
