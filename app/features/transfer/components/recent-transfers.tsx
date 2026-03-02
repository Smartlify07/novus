import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Transaction } from '@/types';
import { ChevronRight } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React from 'react';

export default function RecentTransfers({
  recentTransfers,
  onSelect,
}: {
  recentTransfers: Transaction[];
  onSelect: (value: Transaction['recepient']) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base font-medium text-foreground">
        Recent Beneficiaries
      </h3>
      <div className="grid grid-cols-2 gap-6">
        {recentTransfers.map((transfer) => (
          <Card
            onClick={() => onSelect(transfer.recepient)}
            key={transfer.recepient.id}
            className="flex flex-row items-center p-4 max-w- gap-6 bg-muted/50 justify-between cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Avatar className="rounded-none">
                <AvatarFallback className="font-medium rounded-md text-background bg-primary after:bg-primary">
                  {transfer.recepient.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardContent className="px-0">
                <CardTitle className="text-base">
                  {transfer.recepient.name}
                </CardTitle>
                <CardDescription>
                  {transfer.recepient.accountNumber}
                </CardDescription>
              </CardContent>
            </div>

            <CardAction className="self-center cursor-pointer">
              <HugeiconsIcon icon={ChevronRight} />
            </CardAction>
          </Card>
        ))}
      </div>
    </div>
  );
}
