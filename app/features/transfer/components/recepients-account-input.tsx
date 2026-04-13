import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MAX_ACCT_NUMBER_LENGTH } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function RecepientsAccountInput({
  initialValue,
  onChange,
}: {
  onChange: (value: string) => void;
  initialValue: string;
}) {
  const [value, setValue] = useState(initialValue ?? "");

  useEffect(() => {
    setValue(initialValue ?? "");
  }, [initialValue]);

  const handleChange = (val: string) => {
    const cleaned = val.replace(/[^0-9]/g, "");
    if (cleaned.length <= MAX_ACCT_NUMBER_LENGTH) {
      setValue(cleaned);
      onChange(cleaned);
    }
  };

  return (
    <Field className="flex flex-col gap-2">
      <FieldLabel htmlFor="recepient-account" className="text-base">
        Recepient's Account Number
      </FieldLabel>
      <div className="relative">
        {value !== "" && (
          <span className="text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2 text-lg lg:text-2xl">
            ACC-
          </span>
        )}
        <Input
          name="recepient-account"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
          type="text"
          inputMode="numeric"
          className={cn(
            "no-spinner h-14 text-lg font-semibold placeholder:font-normal lg:text-2xl",
            value !== "" && "pl-16",
          )}
          placeholder="Enter recepient's account number"
          maxLength={MAX_ACCT_NUMBER_LENGTH}
        />
      </div>
    </Field>
  );
}
