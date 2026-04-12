"use client";
import { Copy, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { maskAccountNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCurrentAccount } from "../../accounts/hooks";
import { useUser } from "../../auth/hooks/useUser";

export default function AccountNumberCard() {
  const {
    data: currentAccount,
    error,
    isPending: isCurrentAccountPending,
  } = useCurrentAccount();
  const { data: user, error: userError, isPending: isUserPending } = useUser();
  const [isCopied, setIsCopied] = useState(false);

  const accountName = user ? `${user.firstName} ${user.lastName}` : "";
  const accountNumber = currentAccount?.accountNumber ?? "";

  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber.slice(3));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex items-center gap-4 lg:gap-6">
      <div className="bg-accent/40 border-accent flex h-8 items-center justify-between gap-6 rounded-md border px-4 text-xs lg:px-6">
        <span className="text-foreground w-20 truncate font-medium uppercase lg:w-30">
          {accountName}
        </span>
        <span className="text-muted-foreground text-xs font-medium whitespace-nowrap lg:text-base lg:tracking-wide">
          ACC-{maskAccountNumber(accountNumber.slice(3), 3, 4)}
        </span>
      </div>
      <Button
        variant={"ghost"}
        className="border-accent hover:bg-accent/60 flex cursor-pointer items-center justify-center border transition-colors duration-300"
        onClick={copyTextToClipboard}
      >
        {isCopied ? (
          <HugeiconsIcon icon={Tick02Icon} size={16} className="text-primary" />
        ) : (
          <HugeiconsIcon icon={Copy} size={16} className="text-primary" />
        )}
      </Button>
    </div>
  );
}
