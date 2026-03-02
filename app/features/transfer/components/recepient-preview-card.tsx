import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Transaction } from '@/types';
import { UserRemove01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export default function RecepientReviewCard({
  recepient,
  onChange,
  onConfirm,
  variant,
}: {
  recepient: Transaction['recepient'];
  onChange: () => void;
  onConfirm: (value: Transaction['recepient']) => void;
  variant: 'error' | 'success';
}) {
  return (
    <Card
      className={cn(
        'flex flex-row items-center p-4 max-w- gap-6 bg-muted/50 justify-between',
        variant === 'error' && 'bg-destructive/5 ring ring-destructive ',
      )}
    >
      {variant === 'success' && (
        <>
          <div className="flex items-center gap-4">
            <Avatar className="rounded-none">
              <AvatarFallback className="font-medium rounded-md text-background bg-primary after:bg-primary">
                {recepient.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <CardTitle className="text-base">{recepient.name}</CardTitle>
              <CardDescription>{recepient.accountNumber}</CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CardAction
              onClick={() => onChange()}
              className="self-center flex items-center gap-2 "
            >
              <Button variant={'outline'}>Change</Button>
            </CardAction>
            <CardAction
              onClick={() => onConfirm(recepient)}
              className="self-center flex items-center gap-2"
            >
              <Button>Confirm</Button>
            </CardAction>
          </div>
        </>
      )}
      {variant === 'error' && (
        <>
          <div className="flex items-center gap-4">
            <HugeiconsIcon
              icon={UserRemove01Icon}
              className="text-destructive"
            />
            <div className="flex flex-col gap-0">
              <CardTitle className="text-base text-destructive font-medium">
                Account Not Found
              </CardTitle>
              <CardDescription>
                We could not find any account matching the account number.
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CardAction
              onClick={() => onChange()}
              className="self-center flex items-center gap-2 "
            >
              <Button variant={'outline'}>Change</Button>
            </CardAction>
          </div>
        </>
      )}
    </Card>
  );
}
