'use client';
import SummaryCard from '@/app/features/dashboard/components/summary-card';
import ExportTransactionsButton from '@/app/features/transactions/components/export-transactions-button';
import { TransactionsDataTable } from '@/app/features/transactions/components/transactions-data-table';
import {
  calculateTotalExpenses,
  calculateTotalIncome,
  calculateTotalTransactionsAmount,
  getExpensePercentageChangeColor,
} from '@/lib/transaction-utils';
import { calculatePercentageChange, cn, formatCurrency } from '@/lib/utils';
import {
  ArrowDown02Icon,
  ArrowDownLeft,
  ArrowUp02Icon,
  ArrowUpRight,
  Wallet01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Sheet } from '@/components/ui/sheet';
import { useTransactionDetails } from '@/context/transaction-details-provider';
import TransactionDetailsSheet from '@/app/features/transactions/components/transaction-details-sheet';
import { useTransactions } from '@/app/features/transactions/hooks';
import { useAccountStore } from '@/store/account-store';
import NewTransactionButton from '@/app/features/transactions/components/new-transaction-button';
import { useCurrentAccount } from '@/app/features/accounts/hooks';

export default function TransactionsPage() {
  const { data: currentAccount } = useCurrentAccount();
  console.log(currentAccount);
  const { data, isPending } = useTransactions({
    accountId: currentAccount?.id,
  });
  const transactions = data?.transactions ?? [];
  const totalTransactionsAmount = calculateTotalTransactionsAmount(
    transactions,
    currentAccount,
  );
  const totalIncome = calculateTotalIncome(transactions, currentAccount);
  const totalExpenses = calculateTotalExpenses(transactions, currentAccount);
  const expensesPercentageChange = calculatePercentageChange(
    1000,
    totalExpenses,
  );
  const incomePercentageChange = calculatePercentageChange(0, totalIncome);
  const transactionsPercentageChange = calculatePercentageChange(
    100000,
    totalTransactionsAmount,
  );
  const { currentId } = useTransactionDetails();
  const transaction = transactions.find(
    (transaction) => String(transaction.id) === currentId,
  );
  // @todo: refactor percentage change calculations to compare with previous month data instead of hardcoded values, refactor the code to use a single function or something to know the color for the percentage change, instead of doing it everywhere rn cuz it's a mess.
  return (
    <Sheet>
      <div className="p-6 flex flex-col gap-10">
        <div className="justify-between flex items-center">
          <h1 className="text-2xl font-semibold">Transactions</h1>
          <div className="flex items-center gap-2">
            <NewTransactionButton />{' '}
            {/*For now this will navigate to transfers */}
            {/* <ExportTransactionsButton /> */}
          </div>
        </div>
        <div className="grid grid-cols-3 items-center gap-6">
          <SummaryCard
            icon={<HugeiconsIcon icon={Wallet01Icon} />}
            title="Total Transactions"
            value={formatCurrency(totalTransactionsAmount, 'NGN')}
          >
            <div
              className={cn(
                'flex items-center gap-1 text-sm font-medium',
                transactionsPercentageChange > 0
                  ? 'text-green-600'
                  : 'text-red-600',
              )}
            >
              {transactionsPercentageChange > 0 ? (
                <HugeiconsIcon size={20} icon={ArrowUp02Icon} />
              ) : (
                <HugeiconsIcon size={20} icon={ArrowDown02Icon} />
              )}
              {transactionsPercentageChange.toFixed(2)}%{' '}
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </SummaryCard>
          <SummaryCard
            icon={<HugeiconsIcon icon={ArrowDownLeft} />}
            title="Total Income"
            value={formatCurrency(totalIncome, 'NGN')}
          >
            <div
              className={cn(
                'flex items-center gap-1 text-sm font-medium',
                incomePercentageChange > 0 ? 'text-green-600' : 'text-red-600',
              )}
            >
              {incomePercentageChange > 0 ? (
                <HugeiconsIcon size={20} icon={ArrowUp02Icon} />
              ) : (
                <HugeiconsIcon size={20} icon={ArrowDown02Icon} />
              )}{' '}
              {incomePercentageChange.toFixed(2)}%{' '}
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </SummaryCard>
          <SummaryCard
            icon={<HugeiconsIcon icon={ArrowUpRight} />}
            title="Total Expenses"
            value={formatCurrency(totalExpenses, 'NGN')}
          >
            <div
              className={cn(
                'flex items-center gap-1 text-sm font-medium',
                getExpensePercentageChangeColor(expensesPercentageChange),
              )}
            >
              {expensesPercentageChange > 0 ? (
                <HugeiconsIcon
                  size={20}
                  icon={ArrowUp02Icon}
                  className="text-red-600"
                />
              ) : (
                <HugeiconsIcon
                  size={20}
                  icon={ArrowDown02Icon}
                  className="text-green-600"
                />
              )}
              {expensesPercentageChange.toFixed(2)}%{' '}
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </SummaryCard>
        </div>

        <TransactionsDataTable
          transactions={transactions}
          isLoading={isPending}
        />
      </div>
      {transaction && <TransactionDetailsSheet transaction={transaction} />}
    </Sheet>
  );
}
