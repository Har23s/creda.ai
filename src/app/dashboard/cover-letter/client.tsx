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
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

const coverLetterSchema = z.object({
  jobDescription: z.string().min(50, 'Job description is too short'),
  tone: z.enum(['Formal', 'Confident', 'Direct']),
  companyName: z.string().min(1, "Company name is required"),
  hiringManager: z.string().optional(),
  yourName: z.string().min(1, "Your name is required"),
});

type CoverLetterValues = z.infer<typeof coverLetterSchema>;

const templates = [
  { name: 'Classic', thumb: 'https://placehold.co/150x200.png', hint: 'cover letter template' },
  { name: 'Modern', thumb: 'https://placehold.co/150x200.png', hint: 'cover letter template' },
  { name: 'Minimalist', thumb: 'https://placehold.co/150x200.png', hint: 'cover letter template' },
  { name: 'Professional', thumb: 'https://placehold.co/150x200.png', hint: 'cover letter template' },
];

export function CoverLetterClient() {
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CoverLetterValues>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      jobDescription: '',
      tone: 'Confident',
      companyName: '',
      hiringManager: '',
      yourName: '',
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
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
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
                  name="yourName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your name"
                          rows={1}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the company name"
                          rows={1}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="hiringManager"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hiring Manager (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the hiring manager's name"
                          rows={1}
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
                 <Separator />

                <h3 className="font-headline text-lg font-semibold">Generated Letter</h3>
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
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

       <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle className="font-headline">Preview & Templates</CardTitle>
            <CardDescription>
              Select a template and see a live preview.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div key={template.name} className="relative cursor-pointer">
                    <Image
                      src={template.thumb}
                      alt={template.name}
                      width={150}
                      height={200}
                      data-ai-hint={template.hint}
                      className="rounded-md border-2 border-transparent hover:border-primary"
                    />
                    <p className="text-center text-sm mt-1">{template.name}</p>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="aspect-[8.5/11] w-full rounded-md border bg-white p-4 shadow-sm">
                 <p className="text-xs text-gray-800">{generatedLetter || "Your generated cover letter preview will appear here."}</p>
              </div>
            </div>
          </CardContent>
          <CardHeader>
             <Button className="w-full">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
