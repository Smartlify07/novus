import Header from '@/app/features/loans/components/header';
import SummaryCards from '@/app/features/loans/components/summary-cards';

export default function LoansPage() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <Header />
      <SummaryCards />
    </div>
  );
}
