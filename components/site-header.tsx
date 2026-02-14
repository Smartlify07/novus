'use client';
import { usePathname } from 'next/navigation';

export function SiteHeader() {
  const headerTitle = usePathname().split('/').pop()?.toUpperCase();
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 px-6">
      <h1 className="text-lg font-semibold tracking-tight">{headerTitle}</h1>
    </header>
  );
}
