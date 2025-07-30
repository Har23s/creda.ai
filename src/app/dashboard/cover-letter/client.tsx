'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generateCoverLetter,
  type CoverLetterOutput,
} from '@/ai/flows/cover-letter-generation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import {
  Sparkles,
  Download,
  Loader2,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const coverLetterSchema = z.object({
  yourName: z.string().min(1, "Your name is required"),
  companyName: z.string().min(1, "Company name is required"),
  hiringManager: z.string().optional(),
  letterBody: z.string().min(50, 'Cover letter body is too short'),
});

type CoverLetterValues = z.infer<typeof coverLetterSchema>;

const defaultValues: CoverLetterValues = {
    yourName: 'Ada Lovelace',
    companyName: 'Tech Innovations Inc.',
    hiringManager: 'Mr. Charles Babbage',
    letterBody: `Dear Mr. Babbage,

I am writing to express my keen interest in the Software Engineer position at Tech Innovations Inc., which I discovered on your company's career page. With my extensive background in developing and scaling complex web applications, I am confident that I possess the skills and experience necessary to be a valuable asset to your team.

In my previous role, I led the development of a microservices architecture that resulted in a 40% improvement in system scalability. I am proficient in TypeScript, React, and Node.js and am passionate about writing clean, efficient code.

I am eager to learn more about this opportunity and discuss how my qualifications can benefit your organization. Thank you for your time and consideration.

Sincerely,
Ada Lovelace`
};

const templates = [
  { name: 'Classic', thumb: 'https://placehold.co/150x200.png', hint: 'cover letter template' },
  { name: 'Modern', thumb: 'https://placehold.co/150x200.png', hint: 'cover letter template' },
  { name: 'Minimalist', thumb: 'https://placehold.co/150x200.png', hint: 'cover letter template' },
  { name: 'Professional', thumb: 'https://placehold.co/150x200.png', hint: 'cover letter template' },
];

export function CoverLetterClient() {
  const [jobDescription, setJobDescription] = useState('');
  const [aiResult, setAiResult] = useState<CoverLetterOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CoverLetterValues>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues,
    mode: 'onChange',
  });

  const coverLetterText = JSON.stringify(form.getValues(), null, 2);

  const handleImproveWithAI = async () => {
    if (!jobDescription) {
      toast({
        title: 'Job Description Missing',
        description: 'Please paste a job description to get AI suggestions.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setAiResult(null);
    try {
      const result = await generateCoverLetter({
        coverLetterText,
        jobDescription,
      });
      setAiResult(result);
      form.setValue('letterBody', JSON.parse(result.optimizedCoverLetter).letterBody, { shouldValidate: true });
      toast({
        title: 'Cover Letter Improved!',
        description: 'AI suggestions have been applied.',
      });
    } catch (error) {
      console.error('AI optimization failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to get AI suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-headline text-2xl">
                  Cover Letter Generator
                </CardTitle>
                <CardDescription>
                  Craft a compelling cover letter for your job application.
                </CardDescription>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Sparkles className="mr-2 h-4 w-4" /> Improve with AI
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Improve based on Job Description</SheetTitle>
                    <SheetDescription>
                      Paste a job description and our AI will suggest keywords
                      and rephrase sentences to optimize your cover letter.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <Textarea
                      placeholder="Paste job description here..."
                      className="min-h-[200px]"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                    <Button onClick={handleImproveWithAI} disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      Generate Suggestions
                    </Button>
                  </div>
                  {aiResult && (
                    <div>
                      <h3 className="font-semibold">AI Suggestions</h3>
                      <Progress value={aiResult.matchScore} className="my-2" />
                      <p className="text-sm text-muted-foreground">
                        Match Score: {aiResult.matchScore}%
                      </p>
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
                        {aiResult.suggestions.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-8">
                 <div className="space-y-4">
                  <h3 className="font-headline text-lg font-semibold">
                    Recipient & Your Details
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField name="yourName" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Your Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField name="companyName" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                     <FormField name="hiringManager" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Hiring Manager (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                  </div>
                </div>

                <Separator />
                
                <FormField
                  control={form.control}
                  name="letterBody"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-headline text-lg font-semibold">Cover Letter Body</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your cover letter here..."
                          rows={20}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              <div className="aspect-[8.5/11] w-full rounded-md border bg-white p-4 shadow-sm overflow-auto">
                 <p className="text-xs text-gray-800 whitespace-pre-wrap">{form.watch('letterBody')}</p>
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
