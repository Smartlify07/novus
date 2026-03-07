import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

type AuthUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  roles: string[];
  isActive: boolean;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  tokenExpiry: number | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser, token: string, expiresIn: number) => void;
  logout: () => void;
  checkAuth: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      tokenExpiry: null,
      isAuthenticated: false,

      setAuth: (user, token, expiresIn) => {
        const tokenExpiry = Date.now() + expiresIn * 1000;
        set({ user, token, tokenExpiry, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, token: null, tokenExpiry: null, isAuthenticated: false });
      },

      checkAuth: () => {
        const { token, isAuthenticated, tokenExpiry } = get();
        if (!token || !isAuthenticated) {
          return false;
        }
        if (tokenExpiry && Date.now() >= tokenExpiry) {
          get().logout();
          return false;
        }
        return true;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        tokenExpiry: state.tokenExpiry,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
