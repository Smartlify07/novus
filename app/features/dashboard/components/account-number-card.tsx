'use client';
import { Copy, Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';

export default function AccountNumberCard({
  accountName,
  accountNumber,
}: {
  accountName: string;
  accountNumber: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setIsCopied(true);
      // Optional: Revert the "Copied!" message after a few seconds
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
          {accountNumber}
        </span>
      </div>
      <button
        className="rounded-full border border-accent size-8 justify-center items-center flex cursor-pointer hover:bg-accent/60 transition-colors duration-300"
        onClick={copyTextToClipboard}
      >
        {isCopied ? (
          <HugeiconsIcon icon={Tick02Icon} size={16} className="text-primary" />
        ) : (
          <HugeiconsIcon icon={Copy} size={16} className="text-primary" />
        )}
      </button>
    </div>
  );
}
