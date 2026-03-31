import React from 'react';
import Header from './header';
import SummaryCards from './summary-cards';
import StatsSection from './stats-section';
import PendingLoans from './pending-loans';
import CapitalDeploymentCard from './capital-deployment-card';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Header />
      <SummaryCards />
      <StatsSection />
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <CapitalDeploymentCard />
        </div>
      </div>
      <PendingLoans />
    </div>
  );
}
