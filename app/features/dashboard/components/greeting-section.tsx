'use client';

import { useAuth } from '@/hooks/use-auth';

export default function GreetingSection() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const firstName = user?.firstName || 'there';

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-semibold tracking-tight">
        {getGreeting()}, {firstName}!
      </h2>
      <p className="text-muted-foreground">{formatDate()}</p>
    </div>
  );
}
