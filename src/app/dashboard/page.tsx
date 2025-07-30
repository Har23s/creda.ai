'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileText,
  PlusCircle,
  TrendingUp,
  CreditCard,
  ArrowRight,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const chartData = [
  { month: 'January', score: 65 },
  { month: 'February', score: 72 },
  { month: 'March', score: 70 },
  { month: 'April', score: 78 },
  { month: 'May', score: 85 },
  { month: 'June', score: 82 },
];

const chartConfig = {
  score: {
    label: 'ATS Score',
    color: 'hsl(var(--primary))',
  },
};

const recentActivity = [
  {
    type: 'Resume',
    name: 'Software Engineer Resume',
    date: '2 days ago',
  },
  {
    type: 'Cover Letter',
    name: 'Cover Letter for Google',
    date: '5 days ago',
  },
  {
    type: 'CV',
    name: 'Academic CV (PhD)',
    date: '1 week ago',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-headline text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/resume-builder">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> New Resume
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Current Plan
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Pro Plan</div>
            <p className="text-xs text-muted-foreground">
              Renews on July 30, 2024
            </p>
            <Link href="/dashboard/billing">
                <Button variant="outline" size="sm" className="mt-4">
                Manage Subscription
                </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              ATS Score Trend
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
            <div className="h-[80px]">
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 10,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-score)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-score)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="score"
                    type="natural"
                    fill="url(#fillScore)"
                    stroke="var(--color-score)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Paste a job description to instantly improve your resume.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <textarea id="job-description" placeholder="Paste job description here..." className="min-h-[100px] w-full rounded-md border bg-background p-2 text-sm" />
                        </div>
                        <Link href="/dashboard/resume-builder">
                           <Button className="w-full">Improve Resume <ArrowRight className='ml-2 h-4 w-4'/></Button>
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your most recently edited documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.date}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
