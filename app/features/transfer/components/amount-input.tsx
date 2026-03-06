import { Field, FieldError } from '@/components/ui/field';
import { HugeiconsIcon } from '@hugeicons/react';
import { Alert } from '@hugeicons/core-free-icons';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { useState } from 'react';
export default function AmountInput({
  isBalanceSufficient,
  initialValue,
  ...props
}: {
  isBalanceSufficient: boolean;
  initialValue: number | undefined;
} & NumericFormatProps) {
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <Field
      data-invalid={!isBalanceSufficient}
      className="flex flex-col items-center gap-2 self-center max-w-sm"
    >
      <NumericFormat
        {...props}
        // Reuses shadcn's input styling
        customInput={Input}
        thousandSeparator=","
        decimalScale={2}
        fixedDecimalScale
        prefix="₦ "
        onValueChange={(values, sourceInfo) => {
          props.onValueChange?.(values, sourceInfo);

          setValue(values.floatValue);
        }}
        placeholder="₦ 0.00"
        className={cn(
          'h-14 text-4xl md:text-4xl font-bold placeholder:font-bold border-b! text-center ',
        )}
        aria-invalid={!isBalanceSufficient}
        value={initialValue ?? value}
      />
      {!isBalanceSufficient && (
        <FieldError className=" items-center gap-2 mx-auto self-center justify-center">
          <HugeiconsIcon icon={Alert} size={16} />
          Insufficient balance
        </FieldError>
      )}
    </Field>
  );
}
