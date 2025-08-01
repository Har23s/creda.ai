
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Save, Globe, User, Briefcase, FileText, Share2, Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

const profileSchema = z.object({
  // Personal Info
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email(),
  phone: z.string().optional(),
  profilePhoto: z.string().url().optional(),

  // Career Preferences
  primaryDomain: z.string().min(1, "Please select a career domain."),
  preferredRoles: z.array(z.string()).optional(), // Assuming this will be a tag input
  preferredLocations: z.array(z.string()).optional(),
  isLookingForJob: z.boolean().default(true),
  openToRelocation: z.boolean().default(false),
  
  // Professional Background
  experienceLevel: z.string().min(1, "Please select your experience level."),
  totalExperience: z.number().optional(),
  professionalTitle: z.string().min(1, 'Title or profession is required'),
  summary: z.string().min(20, 'Summary must be at least 20 characters'),
  skills: z.string().min(1, 'Please list at least one skill'),

  // Socials
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  blog: z.string().url().optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const defaultValues: ProfileFormValues = {
  fullName: 'Ada Lovelace',
  email: 'ada.lovelace@example.com',
  phone: '',
  profilePhoto: 'https://placehold.co/100x100.png',
  primaryDomain: 'IT',
  preferredRoles: ['Frontend Developer', 'React Engineer'],
  preferredLocations: ['London, UK', 'Remote'],
  isLookingForJob: true,
  openToRelocation: false,
  experienceLevel: 'Mid',
  totalExperience: 3,
  professionalTitle: 'Frontend Developer',
  summary: 'Passionate Frontend Developer with a love for creating beautiful and intuitive user interfaces using React and Tailwind CSS.',
  skills: 'TypeScript, React, Next.js, Tailwind CSS, Framer Motion',
  linkedin: 'https://linkedin.com/in/ada-lovelace',
  github: 'https://github.com/adalovelace',
  website: 'https://adalovelace.dev',
  blog: '',
};

export default function SettingsPage() {
  const { toast } = useToast();
  const [completion, setCompletion] = useState(0);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: 'onChange',
  });
  
  const formValues = form.watch();

  useEffect(() => {
    const totalFields = Object.keys(profileSchema.shape).filter(key => !profileSchema.shape[key as keyof typeof profileSchema.shape].isOptional());
    let filledFields = 0;
    
    for (const key of totalFields) {
      const value = formValues[key as keyof ProfileFormValues];
      if (value && (!Array.isArray(value) || value.length > 0)) {
        filledFields++;
      }
    }
    
    setCompletion(Math.round((filledFields / totalFields.length) * 100));

  }, [formValues]);


  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Profile Updated',
      description: 'Your changes have been saved successfully.',
    });
    console.log(data);
  }

  return (
    <div className="space-y-8">
      <div className='space-y-2'>
        <h1 className="font-headline text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">Complete your profile to get the best AI-powered career recommendations.</p>
      </div>

      <Card>
          <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex items-center gap-4">
                <Progress value={completion} className="h-2 flex-1" />
                <span className="text-lg font-bold text-primary">{completion}%</span>
             </div>
             <p className="text-sm mt-2 text-muted-foreground">Fill out all required fields to reach 100%.</p>
          </CardContent>
      </Card>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <User className="w-6 h-6 text-primary" />
                    <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>This information will be displayed on your profile.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                     <FormField
                        control={form.control}
                        name="profilePhoto"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>
                                <Avatar className="h-20 w-20 cursor-pointer">
                                    <AvatarImage src={field.value} data-ai-hint="user avatar" />
                                    <AvatarFallback>AL</AvatarFallback>
                                </Avatar>
                            </FormLabel>
                            <FormControl>
                                <Input type="file" className="hidden" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 flex-1">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl><Input placeholder="Ada Lovelace" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl><Input placeholder="you@example.com" {...field} disabled /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}/>
                    </div>
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                 <div className="flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-primary" />
                    <div>
                        <CardTitle>Career Domain & Preferences</CardTitle>
                        <CardDescription>Help us understand your career goals.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="primaryDomain"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Primary Career Domain</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a domain" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="IT">IT / Technology</SelectItem>
                                <SelectItem value="Medical">Medical / Healthcare</SelectItem>
                                <SelectItem value="Admin">Admin / Office Support</SelectItem>
                                <SelectItem value="BPO">BPO / Customer Service</SelectItem>
                                <SelectItem value="Driving">Driving / Logistics</SelectItem>
                                <SelectItem value="Education">Education / Training</SelectItem>
                                <SelectItem value="Other">Others</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="experienceLevel"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Experience Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="Fresher">Fresher (0-1 year)</SelectItem>
                                <SelectItem value="Junior">Junior (1-3 years)</SelectItem>
                                <SelectItem value="Mid">Mid-level (3-5 years)</SelectItem>
                                <SelectItem value="Senior">Senior (5+ years)</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField control={form.control} name="professionalTitle" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Professional Title</FormLabel>
                        <FormControl><Input placeholder="e.g., Software Engineer" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="totalExperience" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Total Experience (in years)</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 5" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}/>

                    <div className="space-y-4">
                        <FormField control={form.control} name="isLookingForJob" render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                <FormLabel>Are you actively looking for a job?</FormLabel>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="openToRelocation" render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                <FormLabel>Are you open to relocation?</FormLabel>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )}/>
                    </div>
            </CardContent>
          </Card>
          
           <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary" />
                    <div>
                        <CardTitle>Professional Background</CardTitle>
                        <CardDescription>This information powers our AI resume and cover letter tools.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <FormField control={form.control} name="summary" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Professional Summary</FormLabel>
                        <FormControl><Textarea rows={4} placeholder="Write a brief summary about yourself..." {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="skills" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Key Skills</FormLabel>
                        <FormControl><Textarea placeholder="Comma-separated, e.g., React, Next.js, Figma" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormItem>
                    <FormLabel>Resume</FormLabel>
                    <FormControl>
                        <div className="flex items-center gap-4 rounded-md border p-3">
                           <FileText className="h-6 w-6 text-muted-foreground" />
                           <div className="flex-1">
                                <p className="font-medium">current_resume.pdf</p>
                                <p className="text-xs text-muted-foreground">Uploaded 2 weeks ago</p>
                           </div>
                           <Button variant="outline" type="button"><Upload className="mr-2 h-4 w-4" /> Upload New</Button>
                        </div>
                    </FormControl>
                </FormItem>
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Share2 className="w-6 h-6 text-primary" />
                    <div>
                        <CardTitle>Social Profiles & Public Presence</CardTitle>
                        <CardDescription>Add your profiles to enhance your visibility to recruiters.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="linkedin" render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl><div className="relative"><Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-10" placeholder="https://linkedin.com/in/..." {...field} /></div></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
              <FormField control={form.control} name="github" render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl><div className="relative"><Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-10" placeholder="https://github.com/..." {...field} /></div></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
               <FormField control={form.control} name="website" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio / Website</FormLabel>
                    <FormControl><div className="relative"><Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-10" placeholder="https://your-portfolio.com" {...field} /></div></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="blog" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog</FormLabel>
                    <FormControl><div className="relative"><Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-10" placeholder="https://your-blog.com" {...field} /></div></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save All Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
