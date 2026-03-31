import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../api';

const DASHBOARD_STATS_QUERY_KEY = 'dashboard-stats';
export function useAdminDashboardStats() {
  return useQuery({
    queryKey: [DASHBOARD_STATS_QUERY_KEY],
    queryFn: async () => await getDashboardStats(),
  });
}
