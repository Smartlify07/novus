'use client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Transaction } from '@/types';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { transactionColumns } from '../columns';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from '@/components/date-picker';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search } from '@hugeicons/core-free-icons';

export function TransactionsDataTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [globalFilter, setGlobalFilter] = useState<any>('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data: transactions,
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });
  const [date, setDate] = useState<DateRange | undefined>();
  return (
    <Card className="gap-10 py-6">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg">Transactions</CardTitle>
        <div className="flex items-center gap-6">
          <div className="flex items-center relative">
            <HugeiconsIcon
              icon={Search}
              className="absolute text-muted-foreground ml-1"
              size={16}
            />
            <Input
              placeholder="Search..."
              value={globalFilter ?? ''}
              onChange={(event) =>
                table.setGlobalFilter(String(event.target.value))
              }
              type="text"
              className="max-w-sm pl-6"
            />
          </div>
          <DatePickerWithRange
            setDateRange={setDate}
            onChange={(value) => table.getColumn('date')?.setFilterValue(value)}
          />
        </div>
      </CardHeader>
      <div className="px-4">
        <Table className="">
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={transactions.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
