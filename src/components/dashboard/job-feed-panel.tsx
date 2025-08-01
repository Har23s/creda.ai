import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const jobs = [
    {
        role: 'Senior Frontend Engineer',
        company: 'Vercel',
        location: 'Remote',
        posted: '5m ago',
        logo: 'https://logo.clearbit.com/vercel.com'
    },
    {
        role: 'Product Manager, AI',
        company: 'Google',
        location: 'Mountain View, CA',
        posted: '2h ago',
        logo: 'https://logo.clearbit.com/google.com'
    },
    {
        role: 'UX/UI Designer',
        company: 'Figma',
        location: 'San Francisco, CA',
        posted: '1d ago',
        logo: 'https://logo.clearbit.com/figma.com'
    },
];

export function JobFeedPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Jobs</CardTitle>
        <CardDescription>Jobs matched to your profile.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobs.map((job, index) => (
          <div key={index} className="flex items-center gap-4 rounded-md border p-3">
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
              <p className="text-sm text-muted-foreground">{job.company} &middot; {job.location}</p>
            </div>
            <Badge variant="outline">{job.posted}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
