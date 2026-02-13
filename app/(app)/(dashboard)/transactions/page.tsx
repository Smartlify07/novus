import ExportTransactionsButton from '@/app/features/transactions/components/export-transactions-button';

export default function TransactionsPage() {
  return (
    <div className="p-6 flex flex-col gap-10">
      <div className="justify-between flex items-center">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <ExportTransactionsButton />
      </div>
    </div>
  );
}
