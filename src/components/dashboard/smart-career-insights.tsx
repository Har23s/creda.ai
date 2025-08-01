'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { BrainCircuit, Lightbulb, PlusCircle } from 'lucide-react';

const trendingSkills = ["React", "Next.js", "Tailwind", "TypeScript", "GraphQL"];
const missingSkills = ["Docker", "CI/CD", "Unit Testing"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const pillVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function SmartCareerInsights() {
  const [resumeContent, setResumeContent] = useState('');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                 <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-6 w-6" />
                    Smart Career Insights
                </CardTitle>
                <CardDescription>AI-generated insights based on your profile.</CardDescription>
            </div>
             <Badge variant="outline" className="text-xs">AI Powered</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="mb-2 text-sm font-semibold text-muted-foreground">Trending skills for your role</h4>
          <motion.div
            className="flex flex-wrap gap-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {trendingSkills.map((skill) => (
              <motion.div key={skill} variants={pillVariants}>
                <Badge variant="secondary">{skill}</Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold text-muted-foreground">Missing from your resume</h4>
           <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill) => (
              <Badge key={skill} variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">
                <Lightbulb className="mr-1 h-3 w-3" />
                {skill}
              </Badge>
            ))}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add to Resume
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Your Resume</DialogTitle>
                <DialogDescription>
                  Add the missing skills to your resume content below. Our AI
                  will help you integrate them naturally later.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Paste your resume content here..."
                rows={10}
                value={resumeContent}
                onChange={(e) => setResumeContent(e.target.value)}
              />
              <DialogFooter>
                <DialogClose asChild>
                    <Button type="button">Save Changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
