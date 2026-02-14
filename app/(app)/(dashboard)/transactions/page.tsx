import SummaryCard from '@/app/features/dashboard/components/summary-card';
import { transactions } from '@/app/features/dashboard/data/dummyTxs';
import ExportTransactionsButton from '@/app/features/transactions/components/export-transactions-button';
import {
  calculateTotalExpenses,
  calculateTotalIncome,
  calculateTotalTransactionsAmount,
  getExpensePercentageChangeColor,
} from '@/lib/transaction-utils';
import { calculatePercentageChange, cn, formatCurrency } from '@/lib/utils';
import {
  ArrowDown02Icon,
  ArrowUp02Icon,
  Wallet01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export default function TransactionsPage() {
  const totalTransactionsAmount =
    calculateTotalTransactionsAmount(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const expensesPercentageChange = calculatePercentageChange(
    1000,
    totalExpenses,
  );
  const incomePercentageChange = calculatePercentageChange(0, totalIncome);
  const transactionsPercentageChange = calculatePercentageChange(
    100000,
    totalTransactionsAmount,
  );

  // @todo: refactor percentage change calculations to compare with previous month data instead of hardcoded values, refactor the code to use a single function or something to know the color for the percentage change, instead of doing it everywhere rn cuz it's a mess.
  return (
    <div className="p-6 flex flex-col gap-10">
      <div className="justify-between flex items-center">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <ExportTransactionsButton />
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
          icon={<HugeiconsIcon icon={Wallet01Icon} />}
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
          icon={<HugeiconsIcon icon={Wallet01Icon} />}
          title="Total Expenses"
          value={formatCurrency(calculateTotalExpenses(transactions), 'NGN')}
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
    </div>
  );
}
