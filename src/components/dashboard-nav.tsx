
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Briefcase,
  CreditCard,
  FileText,
  Home,
  Linkedin,
  Mail,
  PenSquare,
  Settings,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: <Home /> },
  { href: '/dashboard/resume-builder', label: 'Resume Builder', icon: <FileText /> },
  { href: '/dashboard/cover-letter', label: 'Cover Letter', icon: <Mail /> },
  { href: '/dashboard/linkedin-optimizer', label: 'LinkedIn Optimizer', icon: <Linkedin /> },
  { href: '/dashboard/my-jobs', label: 'MyJobs', icon: <Briefcase /> },
];

const bottomLinks = [
    { href: '/dashboard/billing', label: 'Billing', icon: <CreditCard /> },
    { href: '/dashboard/settings', label: 'Account Settings', icon: <Settings /> },
]

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href}>
            <SidebarMenuButton
              isActive={pathname.startsWith(link.href) && (link.href !== '/dashboard' || pathname === '/dashboard')}
              tooltip={link.label}
            >
              {link.icon}
              <span>{link.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
    <div className='flex-grow' />
    <SidebarMenu>
      {bottomLinks.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href}>
            <SidebarMenuButton
              isActive={pathname.startsWith(link.href)}
              tooltip={link.label}
            >
              {link.icon}
              <span>{link.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
    </>
  );
}
