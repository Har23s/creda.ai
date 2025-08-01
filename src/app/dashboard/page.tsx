'use client';

import { WelcomeBanner } from '@/components/dashboard/welcome-banner';
import { RecentJobsPanel } from '@/components/dashboard/recent-jobs-panel';
import { GitHubLinkedInPanel } from '@/components/dashboard/github-linkedin-panel';
import { CoverLetterPanel } from '@/components/dashboard/cover-letter-panel';
import { JobFeedPanel } from '@/components/dashboard/job-feed-panel';
import { ChatAssistant } from '@/components/dashboard/chat-assistant';
import { SubscriptionCard } from '@/components/dashboard/subscription-card';
import { motion } from 'framer-motion';

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
      <motion.div variants={itemVariants}>
        <WelcomeBanner userName="Ada" plan="Pro" />
      </motion.div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
          <RecentJobsPanel />
          <GitHubLinkedInPanel />
          <JobFeedPanel />
        </motion.div>
        <motion.div className="lg:col-span-1 space-y-8" variants={itemVariants}>
          <SubscriptionCard />
          <CoverLetterPanel />
          <ChatAssistant />
        </motion.div>
      </div>
    </motion.div>
  );
}
