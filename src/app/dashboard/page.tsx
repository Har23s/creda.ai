'use client';

import { RecentJobsPanel } from '@/components/dashboard/recent-jobs-panel';
import { SubscriptionCard } from '@/components/dashboard/subscription-card';
import { WeeklyProgressTracker } from '@/components/dashboard/weekly-progress-tracker';
import { motion } from 'framer-motion';
import { JobFeedPanel } from '@/components/dashboard/job-feed-panel';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};


export default function DashboardPage() {
  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold">
            Welcome back, <span className="text-primary">Ada</span>!
        </h1>
        <p className="text-muted-foreground">
            Let's make your next career move the best one yet.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
          <RecentJobsPanel />
          <JobFeedPanel />
        </motion.div>
        <motion.div className="lg:col-span-1 space-y-8" variants={itemVariants}>
          <SubscriptionCard />
          <WeeklyProgressTracker />
        </motion.div>
      </div>
    </motion.div>
  );
}
