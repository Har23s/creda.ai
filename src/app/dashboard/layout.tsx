import { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { DashboardNav } from '@/components/dashboard-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <Logo />
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <DashboardNav />
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="user avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">User Name</p>
                <p className="truncate text-xs text-muted-foreground">Pro Plan</p>
            </div>
            <Link href="/">
                <Button variant="ghost" size="icon" className='h-8 w-8'>
                    <LogOut className="h-4 w-4" />
                </Button>
            </Link>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="min-h-screen bg-background p-4 sm:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
