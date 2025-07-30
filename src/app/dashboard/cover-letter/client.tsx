'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generateCoverLetter,
  type CoverLetterOutput,
} from '@/ai/flows/cover-letter-generation';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Sparkles, Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const coverLetterSchema = z.object({
  jobDescription: z.string().min(50, 'Job description is too short'),
  tone: z.enum(['Formal', 'Confident', 'Direct']),
});

type CoverLetterValues = z.infer<typeof coverLetterSchema>;

export function CoverLetterClient() {
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CoverLetterValues>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      jobDescription: '',
      tone: 'Confident',
    },
  });

  const onSubmit = async (data: CoverLetterValues) => {
    setIsLoading(true);
    setGeneratedLetter('');
    try {
      const result: CoverLetterOutput = await generateCoverLetter(data);
      setGeneratedLetter(result.coverLetter);
      toast({
        title: 'Cover Letter Generated!',
        description: 'Your personalized cover letter is ready.',
      });
    } catch (error) {
      console.error('Cover letter generation failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate cover letter. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({ title: 'Copied to clipboard!' });
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Cover Letter Generator
          </CardTitle>
          <CardDescription>
            Generate a personalized cover letter in seconds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the full job description here..."
                        rows={12}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Tone</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Formal">Formal</SelectItem>
                        <SelectItem value="Confident">Confident</SelectItem>
                        <SelectItem value="Direct">Direct</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Cover Letter
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generated Letter</CardTitle>
          <CardDescription>
            Review and edit your generated letter below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={generatedLetter}
            onChange={(e) => setGeneratedLetter(e.target.value)}
            rows={20}
            placeholder="Your generated cover letter will appear here..."
            className="h-full"
          />
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              onClick={copyToClipboard}
              disabled={!generatedLetter}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button variant="outline" disabled={!generatedLetter}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
