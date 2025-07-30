import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Clock, Search } from 'lucide-react';

const jobs = [
    {
        role: 'Senior Frontend Engineer',
        company: 'Vercel',
        location: 'Remote',
        type: 'Full-time',
        posted: '2h ago',
        skills: ['React', 'Next.js', 'TypeScript'],
        description: 'Join our team to build the future of the web. We are looking for a passionate frontend engineer with experience in modern web technologies.'
    },
    {
        role: 'Product Manager, AI',
        company: 'Google',
        location: 'Mountain View, CA',
        type: 'Full-time',
        posted: '1d ago',
        skills: ['AI/ML', 'Product Strategy', 'UX'],
        description: 'Lead the development of next-generation AI products. You will work with cross-functional teams to define, build, and launch innovative features.'
    },
    {
        role: 'UX/UI Designer',
        company: 'Figma',
        location: 'San Francisco, CA',
        type: 'Contract',
        posted: '3d ago',
        skills: ['Figma', 'UI Design', 'Prototyping'],
        description: 'We are seeking a talented designer to create beautiful and intuitive user experiences. You will be responsible for the entire design process from concept to delivery.'
    },
    {
        role: 'Backend Engineer (Go)',
        company: 'Stripe',
        location: 'Remote',
        type: 'Full-time',
        posted: '5d ago',
        skills: ['Go', 'APIs', 'Distributed Systems'],
        description: 'Build and maintain the core infrastructure that powers global economic commerce. You will work on highly available and scalable systems.'
    },
];

export default function MyJobsPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold">MyJobs</h1>
      <Card>
        <CardHeader>
          <CardTitle>Job Search</CardTitle>
          <CardDescription>
            Find your next opportunity. Filter by role, location, and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role or Keyword</Label>
              <Input id="role" placeholder="e.g., Software Engineer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., San Francisco" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Employment Type</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end space-x-4">
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="remote-only" />
                <Label htmlFor="remote-only">Remote only</Label>
              </div>
               <Button className="w-full lg:w-auto">
                <Search className="mr-2 h-4 w-4"/>
                Search
               </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Separator />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, index) => (
            <Card key={index} className="flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">{job.role}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1"><Briefcase className="h-4 w-4"/> {job.company}</div>
                        <div className="flex items-center gap-1"><MapPin className="h-4 w-4"/> {job.location}</div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {job.skills.map(skill => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Posted {job.posted}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">Paste JD to Resume</Button>
                        <Button size="sm">Apply</Button>
                    </div>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
