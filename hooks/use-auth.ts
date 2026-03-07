import { useAuthStore } from '@/store/auth-store';

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, logout, checkAuth } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    logout,
    checkAuth,
  };
}
