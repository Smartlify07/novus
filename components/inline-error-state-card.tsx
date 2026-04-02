import React from 'react';
import {
  ErrorAction,
  ErrorCardComponent,
  ErrorContent,
  ErrorTitle,
} from './error-card-component';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';
import { Alert } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

type InlineErrorStateCardProps = {
  title: string;
  description: string;
  actions: { label: string; onClick?: () => void; icon?: IconSvgElement }[];
} & React.ComponentProps<'div'>;

export default function InlineErrorStateCard({
  title,
  description,
  actions,
  className,
}: InlineErrorStateCardProps) {
  return (
    <ErrorCardComponent
      className={cn(
        'flex flex-col items-center justify-center gap-6',
        className,
      )}
    >
      <div className="rounded-full border bg-muted/50 size-12 flex items-center justify-center">
        <HugeiconsIcon icon={Alert} />
      </div>
      <div className="flex flex-col gap-0.5 items-center">
        <ErrorTitle className="text-center">{title}</ErrorTitle>
        <ErrorContent className="text-muted-foreground text-center w-10/12">
          {description}
        </ErrorContent>
      </div>
      {actions.map((action) => (
        <ErrorAction className="w-3xs" onClick={() => action?.onClick?.()}>
          {action?.icon && <HugeiconsIcon icon={action?.icon} />}
          {action.label}
        </ErrorAction>
      ))}
    </ErrorCardComponent>
  );
}
