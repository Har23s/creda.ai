import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, X, Gift } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const features = [
  { feature: 'Resume Builder', free: '🎁 1 Resume', pro: 'Unlimited Resumes', proIcon: <Check className="h-5 w-5 text-green-500" /> },
  { feature: 'Cover Letter Generator', free: '🎁 1 Cover Letter', pro: 'Unlimited Cover Letters', proIcon: <Check className="h-5 w-5 text-green-500" /> },
  { feature: 'AI-Powered Job Recommendations', free: '✅ Standard Matching', pro: '✅ Priority & Personalized Matching', proIcon: <Check className="h-5 w-5 text-green-500" /> },
  { feature: 'Live ATS Score While Typing', free: '❌', pro: '✅ See Score & Feedback Instantly', proIcon: <Check className="h-5 w-5 text-green-500" /> },
  { feature: 'JD-to-Resume Matching %', free: '❌', pro: '✅ Paste JD → Get Match Score & Suggestions', proIcon: <Check className="h-5 w-5 text-green-500" /> },
  { feature: 'Support', free: '❌', pro: '✅ Priority Support', proIcon: <Check className="h-5 w-5 text-green-500" /> },
  { feature: 'AI Features (Improvement & Suggestions)', free: '❌', pro: '✅ Fully Enabled (No chatbot)', proIcon: <Check className="h-5 w-5 text-green-500" /> },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold">Billing & Subscription</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Plans & Features</CardTitle>
          <CardDescription>
            Choose the plan that's right for you. Unlock your full potential with our Pro plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Feature</TableHead>
                  <TableHead className="text-center">Free</TableHead>
                  <TableHead className="text-center border-l-2 border-primary/50 bg-primary/5 rounded-tr-lg">Pro+ ($5 / 6 months)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.feature}</TableCell>
                    <TableCell className="text-center text-muted-foreground">{item.free}</TableCell>
                    <TableCell className="text-center border-l-2 border-primary/50 bg-primary/5">
                      <div className="flex items-center justify-center gap-2 font-semibold text-primary">
                        {item.proIcon}
                        <span>{item.pro}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-8 flex justify-end">
             <Button size="lg">Upgrade to Pro+</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
