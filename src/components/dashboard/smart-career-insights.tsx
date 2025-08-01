'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

const trendingSkills = [
  { name: 'React', value: 95 },
  { name: 'Next.js', value: 90 },
  { name: 'Tailwind', value: 85 },
  { name: 'TypeScript', value: 88 },
  { name: 'GraphQL', value: 75 },
  { name: 'Docker', value: 70 },
];

const chartConfig: ChartConfig = {
  value: {
    label: 'Popularity',
    color: 'hsl(var(--primary))',
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

export function SmartCareerInsights() {
  return (
    <motion.div variants={cardVariants}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-6 w-6" />
                Smart Career Insights
              </CardTitle>
              <CardDescription>
                Trending skills for your target role.
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              AI Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={trendingSkills} accessibilityLayer margin={{ left: -20, top: 10, right: 10, bottom: -10 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                fill="var(--color-value)"
              >
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
