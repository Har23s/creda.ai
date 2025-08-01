import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Link from 'next/link';

export function SubscriptionCard() {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
      <CardHeader>
        <CardTitle>Unlock Your Potential</CardTitle>
        <CardDescription>
          Upgrade to Pro for unlimited access to all features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          You are currently on the <span className="font-semibold text-primary">Free</span> plan.
        </p>
        <Link href="/dashboard/billing">
            <Button className="mt-4 w-full">
                <Star className="mr-2 h-4 w-4" />
                Upgrade to Pro
            </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
