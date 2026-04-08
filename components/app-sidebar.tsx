'use client';

import * as React from 'react';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  DashboardSquare01Icon,
  Menu01Icon,
  ChartHistogramIcon,
  Folder01Icon,
  UserGroupIcon,
  Camera01Icon,
  File01Icon,
  Settings05Icon,
  HelpCircleIcon,
  SearchIcon,
  Database01Icon,
  Analytics01Icon,
  CommandIcon,
  CreditCard,
  MoneyBag02FreeIcons,
  Invoice03Icon,
  Users,
  MoneyBag01Icon,
  GoogleDocIcon,
} from '@hugeicons/core-free-icons';
import AppLogo from './app-logo';
import { useUser } from '@/app/features/auth/hooks/useUser';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
    },
    {
      title: 'Loans',
      url: '/loans',
      icon: <HugeiconsIcon icon={MoneyBag02FreeIcons} strokeWidth={2} />,
    },
    {
      title: 'Transactions',
      url: '/transactions',
      icon: <HugeiconsIcon icon={Invoice03Icon} strokeWidth={2} />,
    },
    {
      title: 'Cards',
      url: '/cards',
      icon: <HugeiconsIcon icon={CreditCard} strokeWidth={2} />,
    },
  ],

  navAdmin: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
    },
    {
      title: 'Loan Applications',
      url: '/loan-applications',
      icon: <HugeiconsIcon icon={GoogleDocIcon} strokeWidth={2} />,
    },
    {
      title: 'Users',
      url: '/users',
      icon: <HugeiconsIcon icon={Users} strokeWidth={2} />,
    },
  ],

  navSecondary: [
    {
      title: 'Settings',
      url: '/settings',
      icon: <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />,
    },
    {
      title: 'Get Help',
      url: '/help',
      icon: <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user, isPending, error } = useUser();
  const isAdmin = user?.roles.includes('ADMIN');
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu className="flex flex-row items-center justify-between gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <AppLogo />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarTrigger />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          isPending={isPending}
          items={isAdmin ? data.navAdmin : data.navMain}
        />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
