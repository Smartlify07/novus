import AccountNumberCard from '@/app/features/dashboard/components/account-number-card';
import GreetingSection from '@/app/features/dashboard/components/greeting-section';

export default function DashboardPage() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between  gap-6">
        <GreetingSection />
        <AccountNumberCard />
      </div>
    </div>
  );
}
