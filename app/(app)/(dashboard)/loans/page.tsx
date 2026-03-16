import Cta from '@/app/features/loans/components/cta';
import Header from '@/app/features/loans/components/header';
import SummaryCards from '@/app/features/loans/components/summary-cards';
import YourLoansSection from '@/app/features/loans/components/your-loans-section';

export default function LoansPage() {
  return (
    <div className="px-6 py-10 flex flex-col gap-10">
      <Header />
      <SummaryCards />
      <Cta />
      <YourLoansSection />
    </div>
  );
}
