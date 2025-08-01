import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileEdit, Trash2 } from 'lucide-react';

const coverLetters = [
  { title: 'Cover Letter for Google', date: 'June 28, 2024' },
  { title: 'Speculative Application - Stripe', date: 'June 25, 2024' },
  { title: 'Senior Engineer - Vercel', date: 'June 20, 2024' },
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
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div>
                <p className="text-sm font-medium">{letter.title}</p>
                <p className="text-xs text-muted-foreground">{letter.date}</p>
              </div>
              <div className="flex items-center gap-1">
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
