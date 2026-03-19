'use client';
import { cn } from '@/lib/utils';
import React, { createContext, useContext, useState } from 'react';

type StepperContextType = {
  step: undefined | string | number;
  onChange: (step: StepperContextType['step']) => void;
};
export const StepperContext = createContext<StepperContextType>({
  step: undefined,
  onChange: (step) => {},
});

export const useStepper = () => {
  return useContext(StepperContext);
};

export function StepperProvider({
  children,
  defaultValue,
}: {
  children?: React.ReactNode;
  defaultValue: string;
}) {
  const [step, setStep] = useState<StepperContextType['step']>(defaultValue);
  const onChange = (step: StepperContextType['step']) => {
    setStep(step);
  };

  return (
    <StepperContext.Provider value={{ step, onChange }}>
      {children}
    </StepperContext.Provider>
  );
}

export default function Stepper({
  defaultValue,
  children,
  className,
}: {
  defaultValue: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <StepperProvider defaultValue={defaultValue}>
      <div className={cn('max-w-xl', className)}>{children}</div>
    </StepperProvider>
  );
}

export function StepTrigger({
  className,
  children,
  variant = 'default',
  value,
  onClick,
  ...props
}: {
  className?: string;
  variant?: 'default' | 'success' | 'active';
  children?: React.ReactNode;
  value: string | number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
} & React.ComponentProps<'div'>) {
  const values = useStepper();
  return (
    <div
      {...props}
      className={cn(
        'size-8 rounded-full flex items-center justify-center text-sm',
        variant === 'default' && 'bg-card ring-border ring-1 text-foreground',
        variant === 'active' && 'bg-primary text-primary-foreground',
        variant === 'success' && 'bg-foreground text-primary-foreground',
        className,
      )}
      onClick={(e) => {
        values.onChange(value);
        onClick?.(e);
      }}
    >
      {children}
    </div>
  );
}

export function StepLabel({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className="text-sm" {...props}>
      {children}
    </div>
  );
}
export function StepGroup({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col', className)} {...props}>
      {children}
    </div>
  );
}

export function StepContent({
  children,
  className,
  value,
  ...props
}: React.ComponentProps<'div'> & {
  value: string | number;
}) {
  const values = useStepper();
  console.log(values.step);
  if (values.step !== value) {
    return null;
  }
  return (
    <div className={cn('flex flex-col', className)} {...props}>
      {children}
    </div>
  );
}

export function Connector({
  className,
  value,
  active = false,
  completed = false,
}: {
  value: StepperContextType['step'];
  active?: boolean;
  completed?: boolean;
} & React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'h-0.5 min-w-8 flex-1 rounded-full bg-muted mb-4',
        active && 'bg-primary',
        completed && 'bg-primary',
        className,
      )}
    />
  );
}
