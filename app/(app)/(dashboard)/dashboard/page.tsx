import { getUser } from '@/app/features/auth/api';
import AdminDashboard from '@/app/features/dashboard/components/admin-dashboard';
import Dashboard from '@/app/features/dashboard/components/dashboard';

export default async function DashboardPage() {
  const user = await getUser();
  const isAdmin = user?.roles?.includes('ADMIN');

  return isAdmin ? <AdminDashboard /> : <Dashboard />;
}
