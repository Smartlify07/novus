import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from './ui/card';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './ui/button';
import { VariantProps } from 'class-variance-authority';

export function ErrorCardComponent({
  className,
  children,
}: React.ComponentProps<'div'>) {
  return (
    <Card className={cn('-bg-linear-60 from-muted/50 to-card', className)}>
      {children}
    </Card>
  );
}

export function ErrorTitle({
  children,
  className,
}: React.ComponentProps<'h1'>) {
  return (
    <CardTitle className={cn('text-lg font-medium', className)}>
      {children}
    </CardTitle>
  );
}

export function ErrorDescription({
  children,
  className,
}: React.ComponentProps<'div'>) {
  return (
    <CardDescription className={cn(className)}>{children}</CardDescription>
  );
}

export function ErrorContent({
  children,
  className,
}: React.ComponentProps<'div'>) {
  return <CardContent className={cn(className)}>{children}</CardContent>;
}

export function ErrorAction({
  children,
  className,
  variant,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  return (
    <Button
      className={cn(className)}
      variant={variant ? variant : 'outline'}
      {...props}
    >
      {children}
    </Button>
  );
}

export function ErrorFooter({
  children,
  className,
}: React.ComponentProps<'div'>) {
  return (
    <CardFooter className={cn('bg-card', className)}>{children}</CardFooter>
  );
}
