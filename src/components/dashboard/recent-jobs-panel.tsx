'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Search } from 'lucide-react';

const appliedJobs = [
    {
        role: 'Senior Frontend Engineer',
        company: 'Vercel',
        logo: 'https://logo.clearbit.com/vercel.com',
        status: 'Applied',
        date: '2d ago'
    },
    {
        role: 'Product Manager, AI',
        company: 'Google',
        logo: 'https://logo.clearbit.com/google.com',
        status: 'Interviewing',
        date: '5d ago'
    },
    {
        role: 'UX/UI Designer',
        company: 'Figma',
        logo: 'https://logo.clearbit.com/figma.com',
        status: 'Offer',
        date: '1w ago'
    },
];

const statusColors = {
    Applied: 'bg-blue-500/10 text-blue-500',
    Interviewing: 'bg-yellow-500/10 text-yellow-500',
    Offer: 'bg-green-500/10 text-green-500',
    Rejected: 'bg-red-500/10 text-red-500',
};


export function RecentJobsPanel() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
                <CardTitle>Recent Jobs Applied</CardTitle>
                <CardDescription>Track your latest applications.</CardDescription>
            </div>
            <div className="relative mt-4 sm:mt-0 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search applied jobs..." className="pl-10" />
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {appliedJobs.map((job, index) => (
          <div key={index} className="flex items-center gap-4 rounded-md border p-3 transition-colors hover:bg-muted/50">
             <Image 
                src={job.logo} 
                alt={`${job.company} logo`}
                width={40}
                height={40}
                className="rounded-md"
                data-ai-hint="company logo"
              />
            <div className="flex-1">
              <p className="font-semibold">{job.role}</p>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <div className="text-right">
                <Badge variant="secondary" className={statusColors[job.status as keyof typeof statusColors]}>
                    {job.status}
                </Badge>
                <p className="mt-1 text-xs text-muted-foreground">{job.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
