import LoanRepaymentPage from '@/app/features/loans/repayment/components/loan-repayment-page';

export default async function LoanRepaymentRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <LoanRepaymentPage loanId={Number(id)} />;
}
