'use client';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WelcomeBannerProps {
  userName: string;
  plan: 'Free' | 'Pro';
}

export function WelcomeBanner({ userName, plan }: WelcomeBannerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress loading based on profile data
    // In a real app, this would be calculated based on user data
    const timer = setTimeout(() => setProgress(75), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="group relative rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-headline text-2xl font-bold">
            Welcome back, <span className="text-primary">{userName}</span>!
          </h2>
          <p className="text-muted-foreground">
            Let's make your next career move the best one yet.
          </p>
        </div>
        <Badge variant={plan === 'Pro' ? 'default' : 'secondary'} className="mt-2 sm:mt-0">
          {plan} Plan
        </Badge>
      </div>
    </div>
  );
}
