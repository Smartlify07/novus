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
import { useTransferWorkflowStore } from '@/store/transfer-workflow-store';
import { useAccountStore } from '@/store/account-store';
import { useAuth } from '@/hooks/use-auth';
import { useAccounts, useCurrentAccount } from '@/app/features/accounts/hooks';
import { useUser } from '../../auth/hooks/useUser';

export default function AccountSourceCard() {
  const sourceAccountId = useTransferWorkflowStore(
    (s) => s.data.sourceAccountId,
  );
  const handleSwitchSourceAccount = useTransferWorkflowStore(
    (s) => s.handleSwitchSourceAccount,
  );
  const { data: currentAccount } = useCurrentAccount();
  const { data: user } = useUser();
  const { data: accounts } = useAccounts();

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
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex flex-col shrink-0">
                <p className="text-foreground text-base font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-muted-foreground text-sm">
                    {splitAccountNumber(
                      currentAccount?.accountNumber ?? '',
                      3,
                      4,
                    )}
                  </p>
                  <div className="rounded-full w-1 h-1 bg-muted-foreground"></div>
                  <p className="text-sm text-muted-foreground capitalize">
                    {`${currentAccount?.accountType.charAt(0)}${currentAccount?.accountType.slice(1).toLowerCase()} Account`}
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
              <RadioGroup
                defaultValue={String(sourceAccountId)}
                className="max-w-sm"
              >
                {accounts?.map((account) => (
                  <AccountPopoverRadio
                    onClick={() => handleSwitchSourceAccount(account)}
                    key={account.id}
                    title={`${account.accountType.charAt(0)}${account.accountType.slice(1).toLowerCase()} Account`}
                    description={`${maskAccountNumber(account.accountNumber, 3, 4)}`}
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
            {formatCurrency(
              currentAccount?.balance ?? 0,
              currentAccount?.currency ?? 'NGN',
            )}
          </h3>
        </div>
      </Card>
    </Field>
  );
}
