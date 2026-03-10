import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Account } from '@/types';

type AccountStore = {
  currentAccount: Account | null;
  setCurrentAccount: (account: Account) => void;
  clearCurrentAccount: () => void;
  getCurrentAccount: () => Account | null;
};

export const useAccountStore = create<AccountStore>()(
  persist(
    (set, get) => ({
      currentAccount: null,
      setCurrentAccount: (account) => set({ currentAccount: account }),
      clearCurrentAccount: () => set({ currentAccount: null }),
      getCurrentAccount: () => get().currentAccount,
    }),
    {
      name: 'account-storage',
    }
  )
);
