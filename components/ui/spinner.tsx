import { cn } from '@/lib/utils';
import { HugeiconsIcon, HugeiconsIconProps } from '@hugeicons/react';
import { Loading03Icon } from '@hugeicons/core-free-icons';

type SpinnerProps = Omit<HugeiconsIconProps, 'icon'>;

function Spinner({ className, strokeWidth = 2, ...props }: SpinnerProps) {
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      strokeWidth={strokeWidth}
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
