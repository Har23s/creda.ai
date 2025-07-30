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

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: ' / month',
    description: 'For getting started',
    features: [
      '1 Resume',
      'Basic Templates',
      'Limited AI Suggestions',
      '10 Job Searches/day',
    ],
    cta: 'Your Current Plan',
    isCurrent: false,
  },
  {
    name: 'Pro',
    price: '$15',
    period: ' / month',
    description: 'For power users',
    features: [
      'Unlimited Resumes & CVs',
      'All Premium Templates',
      'Full AI-Powered Suggestions',
      'Unlimited Job Searches',
      'LinkedIn Optimization',
      'Cover Letter Generator',
    ],
    cta: 'Manage Subscription',
    isCurrent: true,
  },
  {
    name: 'Lifetime',
    price: '$199',
    period: ' one-time',
    description: 'For your entire career',
    features: [
      'All Pro features, forever',
      'Priority Support',
      'Early access to new features',
    ],
    cta: 'Upgrade to Lifetime',
    isCurrent: false,
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold">Billing & Subscription</h1>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${plan.isCurrent ? 'border-2 border-primary' : ''}`}
          >
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-baseline gap-x-2">
                <span className="text-4xl font-bold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                  {plan.period}
                </span>
              </div>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {plan.features.map((feature) => (
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
                variant={plan.isCurrent ? 'default' : 'outline'}
                disabled={plan.cta === 'Your Current Plan'}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
