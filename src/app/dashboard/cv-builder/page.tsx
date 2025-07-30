import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';

export default function CvBuilderPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold">CV Builder</h1>
      <Card>
        <CardHeader>
          <CardTitle>Academic CV</CardTitle>
          <CardDescription>
            Build a comprehensive CV for academic and research positions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="research">Research Experience</Label>
            <Textarea id="research" placeholder="Describe your research..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="publications">Publications</Label>
            <Textarea id="publications" placeholder="List your publications..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="awards">Awards and Honors</Label>
            <Textarea id="awards" placeholder="List your awards..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="presentations">Presentations</Label>
            <Textarea id="presentations" placeholder="List your presentations..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="teaching">Teaching Experience</Label>
            <Textarea id="teaching" placeholder="Describe your teaching experience..." />
          </div>
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Custom Section
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
