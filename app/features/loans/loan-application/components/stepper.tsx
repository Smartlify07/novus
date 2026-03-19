'use client';
import { cn } from '@/lib/utils';
import React, { createContext, useContext, useState } from 'react';

export type StepData = {
  id: number;
  value: string;
};

type StepperContextType = {
  step: StepData | null;
  onChange: (step: StepData) => void;
};
export const StepperContext = createContext<StepperContextType>({
  step: null,
  onChange: () => {},
});

export const useStepper = () => {
  return useContext(StepperContext);
};

export function StepperProvider({
  children,
  defaultValue,
}: {
  children?: React.ReactNode;
  defaultValue: StepData;
}) {
  const [step, setStep] = useState<StepperContextType['step']>(defaultValue);
  const onChange = (step: StepperContextType['step']) => {
    if (step) setStep(step);
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
  defaultValue: StepData;
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
  value,
  stepId,
  onClick,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  value: string;
  stepId: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
} & React.ComponentProps<'div'>) {
  const { step, onChange } = useStepper();
  const isActive = step?.id === stepId;
  const isCompleted = step !== null && step.id > stepId;
  return (
    <div
      {...props}
      data-active={isActive}
      data-completed={isCompleted}
      className={cn(
        'size-8 rounded-full flex items-center justify-center text-sm',
        isActive && 'bg-primary text-primary-foreground',
        isCompleted && 'bg-foreground text-primary-foreground',
        !isActive &&
          !isCompleted &&
          'bg-card ring-border ring-1 text-foreground',
        className,
      )}
      onClick={(e) => {
        onChange({ id: stepId, value });
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
  stepId,
  ...props
}: React.ComponentProps<'div'> & {
  value: string;
  stepId: number;
}) {
  const { step } = useStepper();
  if (step?.id !== stepId) {
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
  stepId,
}: {
  stepId: number;
} & React.ComponentProps<'div'>) {
  const { step } = useStepper();
  const isActive = step?.id === stepId;
  const isCompleted = step !== null && step.id > stepId;

  return (
    <div
      data-active={isActive}
      className={cn(
        'h-0.5 min-w-8 flex-1 rounded-full bg-muted mb-4',
        isActive && 'bg-primary',
        isCompleted && 'bg-foreground',
        className,
      )}
    />
  );
}
