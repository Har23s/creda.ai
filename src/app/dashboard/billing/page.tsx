import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';

const pricingPlan = {
    name: 'Pro',
    price: '$5',
    period: ' one-time',
    description: 'Unlock all tools for your entire career',
    features: [
      'Unlimited Resume Downloads',
      'All Templates',
      'LinkedIn Optimization',
      'Real-time Job Scraping',
      'Full AI-Powered Suggestions',
      'Cover Letter Generator',
      'Priority Support',
    ],
    cta: 'Unlock All Tools',
};

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold">Billing & Subscription</h1>
      <div className="mx-auto mt-16 flex max-w-lg justify-center">
        <Card className="flex w-full flex-col border-2 border-primary">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                {pricingPlan.name}
              </CardTitle>
              <CardDescription>{pricingPlan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-baseline gap-x-2">
                <span className="text-4xl font-bold tracking-tight">
                  {pricingPlan.price}
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                  {pricingPlan.period}
                </span>
              </div>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {pricingPlan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
              >
                {pricingPlan.cta}
              </Button>
            </CardFooter>
          </Card>
      </div>
    </div>
  );
}
