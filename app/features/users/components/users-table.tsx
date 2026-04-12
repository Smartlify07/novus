'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUsers } from '../hooks';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { PaginationSection } from './pagination-section';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { userTableColumns } from './columns';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { FieldLabel, FieldSet } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function UsersTable() {
  const { data: usersResponse, error, isPending } = useUsers();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const users = usersResponse?.content ?? [];
  console.log(users);
  const table = useReactTable({
    data: users,
    columns: userTableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;
  const firstRowIndex = pageIndex * pageSize + 1;
  const lastRowIndex = Math.min(
    firstRowIndex + table.getRowModel().rows.length - 1,
    totalRows,
  );

  if (isPending) {
    return (
      <Card>
        <CardContent>
          <Table>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow className="w-full" key={index}>
                  <TableCell className="h-4  py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="rounded-full size-8" />
                      <div className="flex flex-col gap-1">
                        <Skeleton className="w-40 h-4" />
                        <Skeleton className="w-60 h-4" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <Skeleton className="rounded-full h-4" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="uppercase text-sm text-muted-foreground">
          All Users
        </CardTitle>
        <CardDescription>Toggle to activate / deactivate</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="overflow-hidden">
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-4" key={cell.id}>
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
                <TableCell colSpan={6} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <CardDescription>
          Showing {firstRowIndex}-{lastRowIndex} of {totalRows} users
        </CardDescription>
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

        <div className="flex items-center gap-6">
          <FieldSet className="flex flex-row w-full  items-center gap-2">
            <FieldLabel className="">Rows per page</FieldLabel>
            <Select
              defaultValue="5"
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select value" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>{' '}
          </FieldSet>
        </div>
      </CardFooter>
    </Card>
  );
}
