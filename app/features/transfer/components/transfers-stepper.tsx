import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TransfersStepper(
  props: React.ComponentProps<'button'>,
) {
  return (
    <Button
      {...props}
      className={cn(
        'rounded-md bg-primary h-2 w-10 cursor-pointer disabled:bg-secondary disabled:opacity-100',
        props.className,
      )}
      onClick={props.onClick}
    ></Button>
  );
}
