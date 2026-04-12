'use client';
import { useState } from 'react';
import { Header } from './header';
import { PaginationSection } from './pagination-section';
import { SummaryCards } from './summary-cards';
import { UsersTable } from './users-table';

export function UsersPage() {
  return (
    <div className="flex flex-col p-6 gap-10">
      <Header />
      <SummaryCards />
      <UsersTable />
    </div>
  );
}
