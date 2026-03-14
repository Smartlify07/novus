'use client';
import { Copy, Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import { maskAccountNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCurrentAccount } from '../../accounts/hooks';
import { useUser } from '../../auth/hooks/useUser';

export default function AccountNumberCard() {
  const {
    data: currentAccount,
    error,
    isPending: isCurrentAccountPending,
  } = useCurrentAccount();
  const { data: user, error: userError, isPending: isUserPending } = useUser();
  const [isCopied, setIsCopied] = useState(false);

  const accountName = user ? `${user.firstName} ${user.lastName}` : '';
  const accountNumber = currentAccount?.accountNumber ?? '';

  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber.slice(3));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex items-center gap-6">
      <div className=" h-8 px-6 bg-accent/40 rounded-md flex text-sm items-center gap-6 justify-between border border-accent">
        <span className="text-foreground font-medium truncate uppercase w-30">
          {accountName}
        </span>
        <span className="text-muted-foreground font-medium tracking-wide">
          ACC-{maskAccountNumber(accountNumber.slice(3), 3, 4)}
        </span>
      </div>
      <Button
        variant={'ghost'}
        className="border border-accent justify-center items-center flex cursor-pointer hover:bg-accent/60 transition-colors duration-300"
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
