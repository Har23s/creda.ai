import { Badge } from '@/components/ui/badge';

interface WelcomeBannerProps {
  userName: string;
  plan: 'Free' | 'Pro';
}

export function WelcomeBanner({ userName, plan }: WelcomeBannerProps) {
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline text-2xl font-bold">
            Welcome back, {userName}!
          </h2>
          <p className="text-muted-foreground">
            Let's make your next career move the best one yet.
          </p>
        </div>
        <Badge variant={plan === 'Pro' ? 'default' : 'secondary'}>{plan} Plan</Badge>
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">Profile Completion: 75%</p>
        {/* Placeholder for progress bar */}
      </div>
    </div>
  );
}
