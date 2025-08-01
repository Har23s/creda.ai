import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles } from 'lucide-react';

export function ResumePanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Overview</CardTitle>
        <CardDescription>
          A quick look at your primary resume's performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 rounded-md border p-4 bg-background/50 text-xs text-muted-foreground">
          <p><strong>[Your Name]</strong></p>
          <p>Software Engineer</p>
          <p>A highly skilled and motivated software engineer with experience in building scalable web applications...</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
             <p className="text-sm font-medium">Live ATS Score: 82%</p>
             <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <Progress value={82} />
        </div>
        <Button className="mt-6 w-full">Get AI Feedback</Button>
      </CardContent>
    </Card>
  );
}
