'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Star, Code, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { Skeleton } from '../ui/skeleton';

const githubRepos = [
  {
    name: 'resume-builder-ai',
    stars: 88,
    language: 'JavaScript',
    readmeSummary: 'An AI-powered resume builder with live ATS feedback.',
  },
  {
    name: 'creda-dashboard',
    stars: 53,
    language: 'TypeScript',
    readmeSummary: 'React dashboard UI for job seekers using Genkit AI.',
  },
  {
    name: 'job-scraper-bot',
    stars: 39,
    language: 'Python',
    readmeSummary:
      'A job scraper that uses AI to fetch fresh job listings from the web.',
  },
];

const linkedInProfile = {
  name: 'Harsha SJ',
  title: 'Frontend Developer',
  location: 'Bengaluru, India',
  headline: 'Building AI tools for job seekers at Creda.ai',
};

const RepoCard = ({ repo }: { repo: (typeof githubRepos)[0] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      onHoverStart={() => setIsOpen(true)}
      onHoverEnd={() => setIsOpen(false)}
      className="relative rounded-lg border p-3"
    >
      <motion.div layout className="flex items-center justify-between">
        <p className="font-semibold">{repo.name}</p>
        <Button variant="ghost" size="sm">
          Change
        </Button>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: '12px' }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground">
              {repo.readmeSummary}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Code className="h-3 w-3" />
                <span>{repo.language}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                <span>{repo.stars}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function GitHubLinkedInPanel() {
  const [githubConnected, setGithubConnected] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(false);

  React.useEffect(() => {
    // Simulate connecting after a delay
    const timer1 = setTimeout(() => setGithubConnected(true), 1500);
    const timer2 = setTimeout(() => setLinkedinConnected(true), 2000);
    return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Profiles</CardTitle>
        <CardDescription>
          Connect your GitHub and LinkedIn accounts to showcase your work.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* GitHub Section */}
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 font-medium">
            <Github className="h-5 w-5" />
            <span>GitHub Repositories</span>
          </h3>
          {!githubConnected ? (
             <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
             </div>
          ) : githubRepos.length > 0 ? (
            githubRepos.slice(0, 2).map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))
          ) : (
            <Button variant="outline" className="w-full">
              <Github className="mr-2 h-4 w-4" /> Connect GitHub
            </Button>
          )}
        </div>

        {/* LinkedIn Section */}
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 font-medium">
            <Linkedin className="h-5 w-5" />
            <span>LinkedIn Profile</span>
          </h3>
          {!linkedinConnected ? (
             <Skeleton className="h-12 w-full" />
          ) : linkedinConnected ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex cursor-default items-center justify-between rounded-lg border p-3">
                    <p className="font-semibold">{linkedInProfile.name}</p>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" align="start">
                  <div className="p-1 text-sm">
                    <p className="font-bold">{linkedInProfile.name}</p>
                    <p className="text-muted-foreground">{linkedInProfile.title}</p>
                     <p className="text-xs text-muted-foreground">{linkedInProfile.location}</p>
                    <p className="mt-2 text-xs">{linkedInProfile.headline}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button variant="outline" className="w-full">
              <Linkedin className="mr-2 h-4 w-4" /> Connect LinkedIn
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
