import React from 'react';
import Header from './admin/header';
import SummaryCards from './admin/summary-cards';
import StatsSection from './admin/stats-section';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Header />
      <SummaryCards />
      <StatsSection />
    </div>
  );
}
