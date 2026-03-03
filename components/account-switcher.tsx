'use client';
import React from 'react';
import { Dialog } from './ui/dialog';
import { Popover, PopoverContent } from './ui/popover';
import { cn } from '@/lib/utils';
import { Badge, badgeVariants } from './ui/badge';
import { VariantProps } from 'class-variance-authority';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from './ui/field';
import { RadioGroupItem } from './ui/radio-group';

export function AccountPopoverTitle({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn('text-lg font-medium', className)} {...props} />;
}

export function AccountPopoverDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export function AccountPopoverStatusBadge({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  return <Badge variant={variant} {...props} />;
}

export function AccountPopverAction({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn(className)} {...props} />;
}

export function AccountPopoverRadio({
  title,
  description,
  value,
  id,
  children,
  htmlFor,
  ...props
}: React.ComponentProps<'label'> & {
  title: string;
  description: string;
  value: string;
  id: string;
}) {
  return (
    <FieldLabel htmlFor={htmlFor} {...props}>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>{title}</FieldTitle>
          <FieldDescription className="text-xs">
            {description}.
          </FieldDescription>

          {children}
        </FieldContent>
        <RadioGroupItem value={value} id={id} />
      </Field>
    </FieldLabel>
  );
}
