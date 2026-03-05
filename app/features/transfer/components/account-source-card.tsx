import { AccountPopoverRadio } from '@/components/account-switcher';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  formatCurrency,
  splitAccountNumber,
  maskAccountNumber,
} from '@/lib/utils';
import { ArrowReloadHorizontalIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  currentUser,
  currentUserAccounts,
} from '../../dashboard/data/dummyTxs';

export default function AccountSourceCard({
  selectedAccount,
  accounts,
  onSwitch,
}: {
  selectedAccount: (typeof currentUserAccounts)[number] | undefined;
  accounts: typeof currentUserAccounts;
  onSwitch: (account: (typeof currentUserAccounts)[number]) => void;
}) {
  return (
    <Field className="flex flex-col gap-2 max-w">
      <FieldLabel className="text-foreground text-base font-medium">
        Paying from
      </FieldLabel>

      <Card className="bg-muted/50 rounded-md p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Avatar className="rounded-none">
              <AvatarFallback className="font-medium rounded-md text-background bg-primary after:bg-primary">
                {currentUser.firstName.charAt(0)}
                {currentUser.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex flex-col shrink-0">
                <p className="text-foreground text-base font-medium">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-muted-foreground text-sm">
                    {splitAccountNumber(selectedAccount?.accountNumber ?? '')}
                  </p>
                  <div className="rounded-full w-1 h-1 bg-muted-foreground"></div>
                  <p className="text-sm text-muted-foreground capitalize">
                    {`${selectedAccount?.accountType.charAt(0)}${selectedAccount?.accountType.slice(1).toLowerCase()} Account`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'ghost'}
                className="text-primary font-medium hover:text-primary"
              >
                Switch <HugeiconsIcon icon={ArrowReloadHorizontalIcon} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <RadioGroup defaultValue="1" className="max-w-sm">
                {currentUserAccounts.map((account) => (
                  <AccountPopoverRadio
                    onClick={() => onSwitch(account)}
                    key={account.id}
                    title={`${account.accountType.charAt(0)}${account.accountType.slice(1).toLowerCase()} Account`}
                    description={`${maskAccountNumber(account.accountNumber)}`}
                    id={String(account.id)}
                    value={String(account.id)}
                    htmlFor={String(account.id)}
                  >
                    <p className="text-foreground font-medium">
                      {formatCurrency(account.balance, account.currency)}
                    </p>
                  </AccountPopoverRadio>
                ))}
              </RadioGroup>
            </PopoverContent>
          </Popover>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Available Balance</p>
          <h3 className="text-foreground font-semibold text-base">
            {formatCurrency(selectedAccount?.balance ?? 0, 'NGN')}
          </h3>
        </div>
      </Card>
    </Field>
  );
}
