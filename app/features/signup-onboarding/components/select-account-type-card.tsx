import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Account } from '@/types';

type SelectAccountTypeProps = {
  onSelect?: (type: string) => void;
  error?: string;
};

export function SelectAccountType({ onSelect, error }: SelectAccountTypeProps) {
  const accountTypes: {
    title: string;
    value: Account['accountType'];
    description: string;
  }[] = [
    {
      title: 'Savings',
      description: 'Everyday spending with no limits and instant transfers',
      value: 'SAVINGS',
    },
    {
      title: 'Current',
      value: 'CURRENT',
      description: 'Grow your wealth with 4.50% APY and automated goals.',
    },
    {
      title: 'Fixed Desposit',
      value: 'FIXED_DEPOSIT',
      description: 'Grow your wealth with 4.50% APY and automated goals.',
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <RadioGroup
        onValueChange={(value) => {
          onSelect?.(value);
        }}
      >
        {accountTypes.map((type) => (
          <FieldLabel key={type.value} htmlFor={type.value}>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle className="">{type.title}</FieldTitle>
                <FieldDescription>{type.description} </FieldDescription>
              </FieldContent>
              <RadioGroupItem value={type.value} id={type.value} />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
