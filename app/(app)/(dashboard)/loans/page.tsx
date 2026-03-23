'use client';
import { useState } from 'react';
import Cta from '@/app/features/loans/components/cta';
import Header from '@/app/features/loans/components/header';
import LoanDetailsSheet from '@/app/features/loans/components/loan-details-sheet';
import SummaryCards from '@/app/features/loans/components/summary-cards';
import YourLoansSection from '@/app/features/loans/components/your-loans-section';
import { Loan } from '@/types';

export default function LoansPage() {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleLoanClick = (loan: Loan) => {
    setSelectedLoan(loan);
    setSheetOpen(true);
  };

  return (
    <div className="px-6 py-10 flex flex-col gap-10">
      <Header />
      <SummaryCards />
      <Cta />
      <YourLoansSection onLoanClick={handleLoanClick} />
      <LoanDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        loan={selectedLoan}
      />
    </div>
  );
}
