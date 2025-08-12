
'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generateCoverLetter,
  type GenerateCoverLetterOutput,
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
  PlusCircle,
  Sparkles,
  Trash2,
  Download,
  Loader2,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const coverLetterSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  summary: z.string().min(10, 'Body of the cover letter is too short'),
  experience: z.array(
    z.object({
      title: z.string().min(1, 'Job title is required'),
      company: z.string().min(1, 'Company name is required'),
    })
  ),
});

type CoverLetterValues = z.infer<typeof coverLetterSchema>;

const defaultValues: CoverLetterValues = {
  fullName: 'Ada Lovelace',
  email: 'ada.lovelace@example.com',
  phone: '123-456-7890',
  linkedin: 'https://linkedin.com/in/ada-lovelace',
  summary:
    'I am writing to express my keen interest in the Software Engineer position at Tech Innovations Inc., which I discovered on your company\'s career page. With my extensive background in developing and scaling complex web applications, I am confident that I possess the skills and experience necessary to be a valuable asset to your team. In my previous role, I led the development of a microservices architecture that resulted in a 40% improvement in system scalability. I am proficient in TypeScript, React, and Node.js and am passionate about writing clean, efficient code. I am eager to learn more about this opportunity and discuss how my qualifications can benefit your organization. Thank you for your time and consideration.',
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
    },
  ],
};

export function CoverLetterClient() {
  const [jobDescription, setJobDescription] = useState('');
  const [aiResult, setAiResult] = useState<GenerateCoverLetterOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CoverLetterValues>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({
    control: form.control,
    name: 'experience',
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
        resumeText: coverLetterText,
        jobDescription,
      });
      setAiResult(result);
      form.setValue('summary', JSON.parse(result.optimizedResume).summary, { shouldValidate: true });
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
  
  const handleDownload = () => {
    window.print();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="print:shadow-none print:border-none">
        <CardHeader className="print:hidden">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">
                Cover Letter Builder
              </CardTitle>
              <CardDescription>
                Fill out the sections below to create your cover letter.
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
                    and rephrase bullet points to optimize your cover letter.
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
                    <Progress value={aiResult.atsScore} className="my-2" />
                    <p className="text-sm text-muted-foreground">
                      Match Score: {aiResult.atsScore}%
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
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField name="fullName" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField name="email" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField name="phone" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField name="linkedin" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>LinkedIn</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                </div>
              </div>

              <Separator />

              <FormField name="summary" control={form.control} render={({ field }) => (
                  <FormItem>
                      <FormLabel className="font-headline text-lg font-semibold">Body</FormLabel>
                      <FormControl><Textarea {...field} rows={10} /></FormControl>
                      <FormMessage />
                  </FormItem>
              )}/>

              <Separator />
              
              <div>
                <h3 className="font-headline text-lg font-semibold mb-4">Relevant Experience</h3>
                 <p className="text-sm text-muted-foreground mb-4">Briefly mention past roles relevant to this application.</p>
                <div className="space-y-6">
                  {expFields.map((field, index) => (
                    <Card key={field.id} className="p-4 print:border-none print:shadow-none">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <FormField name={`experience.${index}.title`} control={form.control} render={({ field }) => (
                              <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>
                          )}/>
                          <FormField name={`experience.${index}.company`} control={form.control} render={({ field }) => (
                              <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>
                          )}/>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => removeExp(index)} className="mt-4 print:hidden"><Trash2 className="mr-2 h-4 w-4" /> Remove</Button>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => appendExp({ title: '', company: '' })} className="mt-4 print:hidden"><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
              </div>
              
            </form>
          </Form>
        </CardContent>
          <CardHeader>
              <Button className="w-full" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </CardHeader>
      </Card>
    </div>
  );
}
