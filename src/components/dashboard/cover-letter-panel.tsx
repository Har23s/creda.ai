import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileEdit, Trash2, FileText } from 'lucide-react';
import { Badge } from '../ui/badge';

const coverLetters = [
  { title: 'Cover Letter for Google', date: 'June 28, 2024', resume: 'Software Engineer Resume' },
  { title: 'Speculative Application - Stripe', date: 'June 25, 2024', resume: 'Product Manager Resume' },
  { title: 'Senior Engineer - Vercel', date: 'June 20, 2024', resume: 'Senior Engineer Resume' },
];

export function CoverLetterPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Cover Letters</CardTitle>
        <CardDescription>Manage your recent applications.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {coverLetters.map((letter, index) => (
            <li
              key={index}
              className="flex flex-col items-start gap-2 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">{letter.title}</p>
                <p className="text-xs text-muted-foreground">{letter.date}</p>
                <div className="mt-2 flex items-center gap-2">
                    <FileText className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Using: {letter.resume}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 self-end sm:self-center">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileEdit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
