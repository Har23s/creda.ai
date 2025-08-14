
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
import { ResumePreview } from '@/components/dashboard/resume-preview';
import { type ResumeValues } from '@/app/dashboard/resume-builder/client';

const coverLetterSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  summary: z.string().min(10, 'Summary is too short'),
  experience: z.array(
    z.object({
      title: z.string().min(1, 'Job title is required'),
      company: z.string().min(1, 'Company name is required'),
      dates: z.string().min(1, 'Dates are required'),
      description: z.string().min(1, 'Description is required'),
    })
  ),
  education: z.array(
    z.object({
      degree: z.string().min(1, 'Degree is required'),
      school: z.string().min(1, 'School name is required'),
      dates: z.string().min(1, 'Dates are required'),
    })
  ),
  projects: z.array(
    z.object({
      name: z.string().min(1, 'Project name is required'),
      description: z.string().min(1, 'Description is required'),
      url: z.string().url('Invalid URL').optional().or(z.literal('')),
    })
  ),
  certificates: z.array(
    z.object({
      name: z.string().min(1, 'Certificate name is required'),
      issuer: z.string().min(1, 'Issuer is required'),
      date: z.string().min(1, 'Date is required'),
    })
  ),
  skills: z.string().min(1, 'Skills are required'),
});

const defaultValues: ResumeValues = {
  fullName: 'Ada Lovelace',
  email: 'ada.lovelace@example.com',
  phone: '123-456-7890',
  linkedin: 'https://linkedin.com/in/ada-lovelace',
  website: 'https://adalovelace.dev',
  summary:
    'Dear Hiring Manager,\n\nI am writing to express my keen interest in the Software Engineer position advertised on [Platform]. With over 5 years of hands-on experience in developing scalable and efficient web applications using modern technologies like TypeScript, React, and Node.js, I am confident that I possess the skills and passion necessary to be a valuable asset to your team.\n\nMy professional background has provided me with a strong foundation in software architecture and a commitment to writing clean, maintainable code. I am particularly proud of my work at Tech Solutions Inc., where I led the transition to a microservices architecture, resulting in a 40% improvement in system scalability. I am eager to bring this same dedication to innovation and excellence to your organization.',
  experience: [],
  education: [],
  projects: [],
  certificates: [],
  skills: 'TypeScript, React, Node.js, Next.js, GraphQL, PostgreSQL, Docker',
};

export function CoverLetterClient() {
  const [jobDescription, setJobDescription] = useState('');
  const [aiResult, setAiResult] = useState<GenerateCoverLetterOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ResumeValues>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues,
    mode: 'onChange',
  });
  
  const resumeData = form.watch();

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({
    control: form.control,
    name: 'experience',
  });
  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({
    control: form.control,
    name: 'education',
  });
    const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: 'projects',
  });
  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({
    control: form.control,
    name: 'certificates',
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
      const optimizedData = JSON.parse(result.optimizedResume);
      if (optimizedData.summary) {
        form.setValue('summary', optimizedData.summary, { shouldValidate: true });
      }
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
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="order-2 md:order-1">
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
                     <FormField name="website" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Website</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                  </div>
                </div>

                <Separator />

                <FormField name="summary" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-headline text-lg font-semibold">Body</FormLabel>
                        <FormControl><Textarea {...field} rows={15} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
              </form>
            </Form>
          </CardContent>
          <CardHeader className="print:hidden">
              <Button className="w-full" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </CardHeader>
        </Card>
      </div>
       <div className="order-1 md:order-2">
        <div className="sticky top-8">
            <h3 className="font-headline text-lg font-semibold mb-4 text-center">Live Preview</h3>
            <div 
              className="w-[300px] h-[424px] mx-auto bg-white shadow-lg rounded-md overflow-hidden"
              style={{ transform: 'scale(1)', transformOrigin: 'top center' }}
            >
              <ResumePreview {...resumeData} />
            </div>
        </div>
      </div>
    </div>
  );
}

    