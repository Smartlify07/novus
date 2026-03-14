'use client';
import {
  useCreateAccountStore,
  FundingSource,
} from '@/store/create-account-store';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  BankIcon,
  CreditCard as CreditCardIcon,
  WalletIcon,
} from '@hugeicons/core-free-icons';

const fundingSources: {
  title: string;
  value: FundingSource;
  description: string;
  icon: typeof BankIcon;
}[] = [
  {
    title: 'Bank Transfer',
    value: 'bank_transfer',
    description: 'Transfer from another bank account',
    icon: BankIcon,
  },
  {
    title: 'Debit Card',
    value: 'card',
    description: 'Pay with your debit card',
    icon: CreditCardIcon,
  },
  {
    title: 'Existing Account',
    value: 'existing_account',
    description: 'Fund from your other Novus account',
    icon: WalletIcon,
  },
];

export default function FundingSourceStep({ error }: { error?: string }) {
  const { data, setFundingSource } = useCreateAccountStore();

  return (
    <div className="flex flex-col gap-6 w-full self-center">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-lg font-medium">Fund your account</h2>
        <p className="text-muted-foreground text-sm">
          Choose how you want to fund your new account
        </p>
      </div>

      <RadioGroup
        value={data.fundingSource ?? undefined}
        onValueChange={(value) => setFundingSource(value as FundingSource)}
        className="grid grid-cols-2 gap-4"
      >
        {fundingSources.map((source) => (
          <FieldLabel key={source.value} htmlFor={source.value}>
            <Field
              orientation="vertical"
              className={` rounded-lg  p-4 cursor-pointer transition-colors ${
                data.fundingSource === source.value
                  ? 'border-primary '
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <FieldContent className="flex flex-col items-center justify-center gap-3 text-center">
                <HugeiconsIcon icon={source.icon} size={28} strokeWidth={1.5} />
                <FieldTitle className="text-sm">{source.title}</FieldTitle>
                <FieldDescription className="text-xs text-center">
                  {source.description}
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem
                value={source.value}
                id={source.value}
                className="sr-only"
              />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
      {error && <p className="text-sm text-destructive text-center">{error}</p>}
    </div>
  );
}
