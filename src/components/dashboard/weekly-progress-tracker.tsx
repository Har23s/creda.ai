
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
import { Briefcase, FilePenLine, CalendarCheck, Target, Eye, Handshake } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Separator } from '../ui/separator';

const progressData = {
  jobsApplied: 4,
  resumesUpdated: 2,
  interviews: 1,
  goalTarget: 5,
};

const profilePerformanceData = {
    searchAppearances: 4,
    recruiterActions: 1,
}

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
        
        <Separator />
        
        <div>
            <h4 className="mb-3 text-sm font-semibold">Profile Performance</h4>
            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <p className="flex items-center gap-2 text-muted-foreground"><Eye className="h-4 w-4" /> Search Appearances</p>
                    <div className="flex items-center gap-4">
                        <span className="font-bold"><AnimatedNumber value={profilePerformanceData.searchAppearances} /></span>
                        <Link href="#" className="text-xs text-primary hover:underline">View</Link>
                    </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <p className="flex items-center gap-2 text-muted-foreground"><Handshake className="h-4 w-4" /> Recruiter Actions</p>
                     <div className="flex items-center gap-4">
                        <span className="font-bold"><AnimatedNumber value={profilePerformanceData.recruiterActions} /></span>
                        <Link href="#" className="text-xs text-primary hover:underline">View</Link>
                    </div>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
