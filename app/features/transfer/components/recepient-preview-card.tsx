import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AccountWithUser, Transaction } from "@/types";
import { UserRemove01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function RecepientReviewCard({
  recepient,
  onChange,
  onConfirm,
  variant,
}: {
  recepient: AccountWithUser | null;
  onChange: () => void;
  onConfirm: (value: AccountWithUser) => void;
  variant: "error" | "success";
}) {
  return (
    <Card
      className={cn(
        "max-w- bg-muted/50 flex flex-row items-center justify-between gap-6 p-4",
        variant === "error" && "bg-destructive/5 ring-destructive ring",
      )}
    >
      {variant === "success" && (
        <>
          <div className="flex items-center gap-4">
            <Avatar className="rounded-none">
              <AvatarFallback className="text-background bg-primary after:bg-primary rounded-md font-medium">
                {recepient?.user?.firstName?.charAt(0) ?? "Unknown"}
                {recepient?.user?.lastName?.charAt(0) ?? "Unknown"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <CardTitle className="text-base">
                {recepient?.user?.firstName ?? "Unknown"}
                {recepient?.user?.lastName ?? "Unknown"}
              </CardTitle>
              <CardDescription>{recepient?.accountNumber}</CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CardAction
              onClick={() => onChange()}
              className="flex items-center gap-2 self-center"
            >
              <Button variant={"outline"}>Change</Button>
            </CardAction>
            <CardAction
              onClick={() => {
                recepient && onConfirm(recepient);
              }}
              className="flex items-center gap-2 self-center"
            >
              <Button>Confirm</Button>
            </CardAction>
          </div>
        </>
      )}
      {variant === "error" && (
        <>
          <div className="flex items-center gap-4">
            <HugeiconsIcon
              icon={UserRemove01Icon}
              className="text-destructive shrink-0"
            />
            <div className="flex flex-col gap-0">
              <CardTitle className="text-foreground text-base font-medium">
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
              className="flex items-center gap-2 self-center"
            >
              <Button variant={"outline"}>Change</Button>
            </CardAction>
          </div>
        </>
      )}
    </Card>
  );
}
