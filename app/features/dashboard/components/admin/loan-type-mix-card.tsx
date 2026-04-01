'use client';
import { usePendingLoans } from '@/app/features/loans/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loan } from '@/types';
import { Briefcase, House01Icon, User } from '@hugeicons/core-free-icons';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';

function getLoanTypeRatio(loans: Loan[], type: Loan['loanType']) {
  if (loans.length === 0) {
    return 0;
  }
  return (
    (loans.filter((loan) => loan.loanType === type).length / loans.length) * 100
  );
}
export default function LoanTypeMixCard() {
  const { data, error, isPending } = usePendingLoans();
  const loans = data?.content ?? [];
  const personalLoansRatio = getLoanTypeRatio(loans, 'PERSONAL');
  const businessLoansRatio = getLoanTypeRatio(loans, 'BUSINESS');
  const mortgageLoansRatio = getLoanTypeRatio(loans, 'MORTGAGE');

  if (isPending) {
    return (
      <Card className="gap-6">
        <CardHeader>
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="rounded-lg size-8" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-1 flex-1" />
              <Skeleton className="h-4 w-10" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
  if (error) {
    return <>{error.message}</>;
  }
  return (
    <Card className="gap-6">
      <CardHeader>
        <CardTitle className="text-sm">Loan type mix</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-6">
        <LoanTypeMix
          loanType="PERSONAL"
          label="Personal"
          percentage={personalLoansRatio}
        />
        <LoanTypeMix
          loanType="BUSINESS"
          label="Business"
          percentage={businessLoansRatio}
        />
        <LoanTypeMix
          loanType="MORTGAGE"
          label="Mortgage"
          percentage={mortgageLoansRatio}
        />
      </CardContent>
    </Card>
  );
}
const iconMap: Record<
  Loan['loanType'],
  { label: string; icon: IconSvgElement }
> = {
  PERSONAL: {
    label: 'Personal',
    icon: User,
  },
  BUSINESS: {
    label: 'Business',
    icon: Briefcase,
  },
  MORTGAGE: {
    label: 'Mortgage',
    icon: House01Icon,
  },
};

function LoanTypeMix({
  loanType,
  label,
  percentage,
}: {
  loanType: Loan['loanType'];
  label: string;
  percentage: number;
}) {
  const icon = iconMap[loanType];
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-lg flex items-center justify-center bg-muted size-8">
        <HugeiconsIcon icon={icon.icon} size={16} />
      </div>

      <h1 className="font-medium text-sm">{label}</h1>
      <div className="rounded-lg h-1 bg-muted flex-1">
        <div
          style={{
            width: `${percentage}%`,
          }}
          className="h-1 bg-primary rounded-lg"
        ></div>
      </div>
      <p className="text-sm">{percentage}%</p>
    </div>
  );
}
