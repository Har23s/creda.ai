
'use client';

import { useState, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  atsResumeOptimization,
  type AtsResumeOptimizationOutput,
} from '@/ai/flows/ats-resume-optimization';
import {
  parseResume,
  type ParseResumeOutput,
} from '@/ai/flows/resume-parsing';

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
  Upload,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ResumePreview } from '@/components/dashboard/resume-preview';

const resumeSchema = z.object({
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

export type ResumeValues = z.infer<typeof resumeSchema>;

const defaultValues: ResumeValues = {
  fullName: 'Ada Lovelace',
  email: 'ada.lovelace@example.com',
  phone: '123-456-7890',
  linkedin: 'https://linkedin.com/in/ada-lovelace',
  website: 'https://adalovelace.dev',
  summary:
    'Innovative and detail-oriented Software Engineer with 5+ years of experience in developing and scaling complex web applications. Proficient in TypeScript, React, and Node.js. Passionate about creating clean, efficient code and collaborating with cross-functional teams to deliver exceptional user experiences.',
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      dates: 'Jan 2021 - Present',
      description:
        '- Led development of a new microservices architecture, improving system scalability by 40%.\n- Mentored junior engineers, fostering a culture of growth and knowledge sharing.',
    },
  ],
  education: [
    {
      degree: 'B.Sc. in Computer Science',
      school: 'University of Technology',
      dates: '2014 - 2018',
    },
  ],
  projects: [],
  certificates: [],
  skills: 'TypeScript, React, Node.js, Next.js, GraphQL, PostgreSQL, Docker',
};

const SUPPORTED_MIME_TYPES = ['application/pdf', 'text/plain'];

export function ResumeBuilderClient() {
  const [jobDescription, setJobDescription] = useState('');
  const [aiResult, setAiResult] = useState<AtsResumeOptimizationOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ResumeValues>({
    resolver: zodResolver(resumeSchema),
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

  const resumeText = JSON.stringify(form.getValues(), null, 2);

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
      const result = await atsResumeOptimization({
        resumeText,
        jobDescription,
      });
      setAiResult(result);
      try {
        const optimizedData = JSON.parse(result.optimizedResume);
         if(optimizedData.summary) {
            form.setValue('summary', optimizedData.summary, { shouldValidate: true });
         }
      } catch (e) {
         console.error("Failed to parse optimized resume JSON", e);
         toast({
            title: 'AI Response Error',
            description: 'The AI returned an unexpected format. Please try again.',
            variant: 'destructive'
         });
         return;
      }
     
      toast({
        title: 'Resume Improved!',
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
      toast({
        title: 'Unsupported File Type',
        description: `Please upload a PDF or TXT file. You uploaded a ${file.type} file.`,
        variant: 'destructive',
      });
      return;
    }

    setIsParsing(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const resumeDataUri = reader.result as string;
        const parsedData = await parseResume({ resumeDataUri });

        form.reset({
          ...parsedData,
          linkedin: parsedData.linkedin || '',
          website: parsedData.website || '',
          projects: parsedData.projects || [],
          certificates: parsedData.certificates || [],
        });

        toast({
          title: 'Resume Parsed',
          description: 'Your resume has been imported successfully.',
        });
      };
      reader.onerror = (error) => {
        throw new Error('Error reading file');
      };
    } catch (error) {
      console.error('Resume parsing failed:', error);
      toast({
        title: 'Error Parsing Resume',
        description: 'Could not parse the resume. Please try another file or enter details manually.',
        variant: 'destructive',
      });
    } finally {
      setIsParsing(false);
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="grid grid-cols-1">
        <Card className="print:shadow-none print:border-none">
          <CardHeader className="print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <CardTitle className="font-headline text-2xl">
                  Resume Builder
                </CardTitle>
                <CardDescription>
                  Fill out the sections below or upload your resume to get started.
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <Sparkles className="mr-2 h-4 w-4" /> Improve with AI
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Improve based on Job Description</SheetTitle>
                      <SheetDescription>
                        Paste a job description and our AI will suggest keywords
                        and rephrase bullet points to optimize your resume.
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
                          ATS Score: {aiResult.atsScore}%
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
                 <Button 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isParsing}
                 >
                   {isParsing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="mr-2 h-4 w-4" />
                    )}
                   Upload Resume
                 </Button>
                <Input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept={SUPPORTED_MIME_TYPES.join(',')}
                />
              </div>
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
                        <FormLabel className="font-headline text-lg font-semibold">Summary</FormLabel>
                        <FormControl><Textarea {...field} rows={5} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                <Separator />
                
                <div>
                  <h3 className="font-headline text-lg font-semibold mb-4">Experience</h3>
                  <div className="space-y-6">
                    {expFields.map((field, index) => (
                      <Card key={field.id} className="p-4 print:border-none print:shadow-none">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormField name={`experience.${index}.title`} control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField name={`experience.${index}.company`} control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                        <FormField name={`experience.${index}.dates`} control={form.control} render={({ field }) => (
                            <FormItem className="mt-4"><FormLabel>Dates</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField name={`experience.${index}.description`} control={form.control} render={({ field }) => (
                            <FormItem className="mt-4"><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <Button variant="destructive" size="sm" onClick={() => removeExp(index)} className="mt-4 print:hidden"><Trash2 className="mr-2 h-4 w-4" /> Remove</Button>
                      </Card>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => appendExp({ title: '', company: '', dates: '', description: '' })} className="mt-4 print:hidden"><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
                </div>
                
                <Separator />

                <div>
                    <h3 className="font-headline text-lg font-semibold mb-4">Education</h3>
                    <div className="space-y-6">
                    {eduFields.map((field, index) => (
                      <Card key={field.id} className="p-4 print:border-none print:shadow-none">
                        <FormField name={`education.${index}.school`} control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>School</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField name={`education.${index}.degree`} control={form.control} render={({ field }) => (
                            <FormItem className="mt-4"><FormLabel>Degree</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField name={`education.${index}.dates`} control={form.control} render={({ field }) => (
                            <FormItem className="mt-4"><FormLabel>Dates</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <Button variant="destructive" size="sm" onClick={() => removeEdu(index)} className="mt-4 print:hidden"><Trash2 className="mr-2 h-4 w-4" /> Remove</Button>
                      </Card>
                    ))}
                    </div>
                      <Button variant="outline" size="sm" onClick={() => appendEdu({ school: '', degree: '', dates: '' })} className="mt-4 print:hidden"><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
                </div>
                
                <Separator />

                <div>
                  <h3 className="font-headline text-lg font-semibold mb-4">Projects</h3>
                  <div className="space-y-6">
                    {projectFields.map((field, index) => (
                      <Card key={field.id} className="p-4 print:border-none print:shadow-none">
                        <FormField name={`projects.${index}.name`} control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField name={`projects.${index}.description`} control={form.control} render={({ field }) => (
                            <FormItem className="mt-4"><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage /></FormItem>
                        )}/>
                         <FormField name={`projects.${index}.url`} control={form.control} render={({ field }) => (
                            <FormItem className="mt-4"><FormLabel>Project URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <Button variant="destructive" size="sm" onClick={() => removeProject(index)} className="mt-4 print:hidden"><Trash2 className="mr-2 h-4 w-4" /> Remove Project</Button>
                      </Card>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => appendProject({ name: '', description: '', url: '' })} className="mt-4 print:hidden"><PlusCircle className="mr-2 h-4 w-4" /> Add Project</Button>
                </div>

                <Separator />

                 <div>
                  <h3 className="font-headline text-lg font-semibold mb-4">Certificates</h3>
                  <div className="space-y-6">
                    {certFields.map((field, index) => (
                      <Card key={field.id} className="p-4 print:border-none print:shadow-none">
                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                           <FormField name={`certificates.${index}.name`} control={form.control} render={({ field }) => (
                              <FormItem><FormLabel>Certificate Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )}/>
                          <FormField name={`certificates.${index}.issuer`} control={form.control} render={({ field }) => (
                              <FormItem><FormLabel>Issuer</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )}/>
                        </div>
                         <FormField name={`certificates.${index}.date`} control={form.control} render={({ field }) => (
                            <FormItem className="mt-4"><FormLabel>Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <Button variant="destructive" size="sm" onClick={() => removeCert(index)} className="mt-4 print:hidden"><Trash2 className="mr-2 h-4 w-4" /> Remove Certificate</Button>
                      </Card>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => appendCert({ name: '', issuer: '', date: '' })} className="mt-4 print:hidden"><PlusCircle className="mr-2 h-4 w-4" /> Add Certificate</Button>
                </div>
                
                <Separator />
                
                <FormField name="skills" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-headline text-lg font-semibold">Skills</FormLabel>
                        <FormControl><Textarea {...field} placeholder="e.g. JavaScript, React, Leadership" /></FormControl>
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
  );
}
