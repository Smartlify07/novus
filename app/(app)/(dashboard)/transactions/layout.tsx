import TransactionDetailsProvider from '@/app/providers/transaction-details-provider';
export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TransactionDetailsProvider>{children}</TransactionDetailsProvider>;
}
