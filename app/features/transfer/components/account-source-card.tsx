import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { splitAccountNumber } from '@/lib/utils';
import { ArrowReloadHorizontalIcon, Switch } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export default function AccountSourceCard() {
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
                OA
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex flex-col shrink-0">
                <p className="text-foreground text-base font-medium">
                  Obinna Anosike
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-muted-foreground text-sm">
                    {splitAccountNumber('1010223333')}
                  </p>
                  <div className="rounded-full w-1 h-1 bg-muted-foreground"></div>
                  <p className="text-sm text-muted-foreground">
                    Savings Account
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button variant={'ghost'} className="text-primary font-medium">
            Switch <HugeiconsIcon icon={ArrowReloadHorizontalIcon} />
          </Button>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Available Balance</p>
          <h3 className="text-foreground font-bold text-base">₦153,000.45</h3>
        </div>
      </Card>
    </Field>
  );
}
