'use client';
import { ArrowLeft01Icon, ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import { LoanAmountCard } from './loan-amount-card';
import { useLoans } from '@/app/features/loans/hooks';

export function AdminLoanDetails({ id }: { id: string }) {
  const { data: loans, error } = useLoans();
  console.log(loans);
  return (
    <div className="flex flex-col gap-10 p-6">
      <Link
        className="flex items-center gap-2 text-muted-foreground"
        href="/loans"
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} />
        Back to applications
      </Link>
      <div className="grid grid-cols-3">
        <div className="flex flex-col col-span-2"></div>
      </div>
    </div>
  );
}
