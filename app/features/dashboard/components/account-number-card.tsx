import { Copy, Copy01Icon, Copy02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export default function AccountNumberCard() {
  return (
    <div className="flex items-center gap-6">
      <div className=" h-8 px-6 bg-accent/40 rounded-md flex text-sm items-center gap-6 justify-between border border-accent">
        <span className="text-foreground font-medium truncate w-30">
          Obinna Smart Anosike
        </span>
        <span className="text-muted-foreground font-medium tracking-wide">
          9081664414
        </span>
      </div>
      <div className="rounded-full border border-accent size-8 justify-center items-center flex cursor-pointer">
        <HugeiconsIcon icon={Copy} size={16} className="text-primary" />
      </div>
    </div>
  );
}
