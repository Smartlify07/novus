import { AccountPopoverRadio } from "@/components/account-switcher";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  formatCurrency,
  splitAccountNumber,
  maskAccountNumber,
} from "@/lib/utils";
import { ArrowReloadHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTransferWorkflowStore } from "@/store/transfer-workflow-store";
import { useAccountStore } from "@/store/account-store";
import { useAuth } from "@/hooks/use-auth";
import { useAccounts, useCurrentAccount } from "@/app/features/accounts/hooks";
import { useUser } from "../../auth/hooks/useUser";
import { convertToCapitalized } from "../../loans/repayment/utils";

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
    <Field className="flex flex-col gap-2">
      <FieldLabel className="text-foreground text-base font-medium">
        Paying from
      </FieldLabel>

      <Card className="flex flex-col gap-4 rounded-md p-4">
        <div className="flex justify-between lg:items-center">
          <div className="flex gap-4">
            <Avatar className="">
              <AvatarFallback className="">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex shrink-0 flex-col">
                <p className="text-foreground text-base font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                  <p className="text-muted-foreground text-sm">
                    {splitAccountNumber(
                      currentAccount?.accountNumber ?? "",
                      3,
                      4,
                    )}
                  </p>
                  <div className="bg-muted-foreground hidden h-1 w-1 rounded-full lg:block"></div>
                  <p className="text-muted-foreground text-sm capitalize">
                    {`${convertToCapitalized(currentAccount?.accountType ?? "")} Account`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                className="text-primary hover:text-primary font-medium"
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
          <p className="text-muted-foreground text-sm">Available Balance</p>
          <h3 className="text-foreground text-base font-semibold">
            {formatCurrency(
              currentAccount?.balance ?? 0,
              currentAccount?.currency ?? "NGN",
            )}
          </h3>
        </div>
      </Card>
    </Field>
  );
}
