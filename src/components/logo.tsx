import Link from 'next/link';
import { BotMessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <BotMessageSquare className="h-6 w-6 text-primary" />
      <span className="font-headline text-lg font-bold">Creda.ai</span>
    </Link>
  );
}
