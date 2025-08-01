
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { animate } from 'framer-motion';
import { Briefcase, FilePenLine, CalendarCheck, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const progressData = {
  jobsApplied: 4,
  resumesUpdated: 2,
  interviews: 1,
  goalTarget: 5,
};

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [value]);

  return <>{displayValue}</>;
}


export function WeeklyProgressTracker() {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const calculatedProgress = (progressData.jobsApplied / progressData.goalTarget) * 100;
    // Animate the progress bar fill
    const timer = setTimeout(() => setProgressValue(calculatedProgress), 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Jobs Applied', value: progressData.jobsApplied, icon: <Briefcase className="h-5 w-5 text-primary" /> },
    { label: 'Resumes Updated', value: progressData.resumesUpdated, icon: <FilePenLine className="h-5 w-5 text-green-500" /> },
    { label: 'Interviews', value: progressData.interviews, icon: <CalendarCheck className="h-5 w-5 text-amber-500" /> },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
        <CardDescription>Stay on track with your job search goals.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map(stat => (
                 <div key={stat.label} className="flex flex-col items-center">
                    <div className="mb-1">{stat.icon}</div>
                    <p className="text-2xl font-bold">
                        <AnimatedNumber value={stat.value} />
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
            ))}
        </div>
        
        <div>
          <div className="mb-2 flex items-center justify-between">
             <h4 className="flex items-center gap-2 text-sm font-semibold">
                <Target className="h-4 w-4"/>
                Weekly Goal
             </h4>
             <span className="text-sm font-medium">{progressData.jobsApplied}/{progressData.goalTarget} applications</span>
          </div>
          <Progress value={progressValue} />
        </div>

        <Link href="/dashboard/my-jobs" className='w-full'>
            <Button className="w-full">
                View Suggested Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
