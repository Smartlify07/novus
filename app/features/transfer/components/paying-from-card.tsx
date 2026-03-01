import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Field, FieldLabel } from '@/components/ui/field';
import React from 'react';

export default function PayingFromCard() {
  return (
    <Field className="flex flex-col gap-2">
      <FieldLabel className="text-muted-foreground text-sm font-medium">
        Paying from
      </FieldLabel>

      <div className="bg-muted rounded-md p-4 max-w-md flex items-center justify-between gap-6">
        <div className="flex gap-4">
          <Avatar className="rounded-md after:border-none after:rounded-md">
            <AvatarFallback className="rounded-md">OA</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 shrink-0">
              <p className="text-muted-foreground text-sm">Obinna Anosike</p>
              <div className="rounded-full bg-muted-foreground w-1 h-1"></div>
              <p className="text-muted-foreground text-sm">1010223333</p>
            </div>
            <p className="text-foreground text-lg font-bold">₦150,000</p>
          </div>
        </div>
      </div>
    </Field>
  );
}
