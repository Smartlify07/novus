import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Account } from '@/types';

type AccountStore = {
  currentAccount: Account | null;
  setCurrentAccount: (account: Account) => void;
  clearCurrentAccount: () => void;
};

export const useAccountStore = create<AccountStore>()(
  persist(
    (set) => ({
      currentAccount: null,
      setCurrentAccount: (account) => set({ currentAccount: account }),
      clearCurrentAccount: () => set({ currentAccount: null }),
    }),
    {
      name: 'account-storage',
    }
  )
);
