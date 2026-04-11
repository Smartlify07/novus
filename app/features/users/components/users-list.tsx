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

export function UsersList() {
  const { data: users, error, isPending } = useUsers();
  const [paginationData, setPagiinationData] = useState({
    rowsPerPage: 5,
    currentPage: 1,
    totalData: users?.content.length,
  });
  const totalPages = Math.ceil(
    (users?.content.length ?? 0) / paginationData.rowsPerPage,
  );
  const currentPage = 1;

  console.log(paginationData.rowsPerPage);

  const handleNext = () => {
    if (paginationData.currentPage !== totalPages) {
      setPagiinationData((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePrev = () => {
    if (paginationData.currentPage >= 1) {
      setPagiinationData((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };
  const start =
    paginationData.currentPage === 1 ? 0 : paginationData.rowsPerPage;
  const end = start + paginationData.rowsPerPage;

  if (isPending) {
    return <>Loading...</>;
  }
  return (
    <Card>
      <CardHeader className="">
        <CardTitle className="uppercase text-sm text-muted-foreground">
          All Users
        </CardTitle>
      </CardHeader>
      <CardContent>
        {users?.content.slice(start, end).map((user) => (
          <div className="flex items-center justify-between border-b py-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className="">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0">
                <h1 className="font-medium text-sm capitalize">
                  {user.firstName} {user.lastName}
                </h1>
                <h3 className="text-muted-foreground text-xs">{user.email}</h3>
              </div>
            </div>
            <Switch defaultChecked={user.isActive} />
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex items-center justify-between w-full border">
        <CardDescription>
          Showing from {start + 1}-{end} of users
        </CardDescription>
        <div className="flex items-center gap-4">
          <Button
            disabled={paginationData.currentPage <= 1}
            onClick={handlePrev}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <Button
            disabled={paginationData.currentPage >= totalPages}
            onClick={handleNext}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
        <PaginationSection
          onChangeValue={(value) => {
            setPagiinationData((prev) => ({ ...prev, rowsPerPage: value }));
          }}
          rowPerPage={paginationData.rowsPerPage}
        />
      </CardFooter>
    </Card>
  );
}
