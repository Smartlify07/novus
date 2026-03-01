import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Field, FieldLabel } from '@/components/ui/field';
import { splitAccountNumber } from '@/lib/utils';
import React from 'react';

export default function AccountSourceCard() {
  return (
    <Field className="flex flex-col gap-2">
      <FieldLabel className="text-muted-foreground text-sm font-medium">
        Paying from
      </FieldLabel>

      <div className="bg-muted rounded-md p-4 max-w-sm flex items-center justify-between gap-6">
        <div className="flex gap-4">
          <Avatar className="rounded-none">
            <AvatarFallback className="font-medium rounded-md text-background bg-primary after:bg-primary">
              OA
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 shrink-0">
              <p className="text-muted-foreground text-sm">Obinna Anosike</p>
              <div className="rounded-full w-1 h-1 bg-muted-foreground"></div>
              <p className="text-muted-foreground text-sm">
                {splitAccountNumber('1010223333')}
              </p>
            </div>
            <p className="text-foreground text-lg font-bold">₦150,000</p>
          </div>
        </div>
      </div>
    </Field>
  );
}
