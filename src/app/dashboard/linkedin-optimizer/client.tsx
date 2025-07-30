'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  optimizeLinkedInProfile,
  type OptimizeLinkedInProfileOutput,
} from '@/ai/flows/linkedin-profile-optimization';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Badge } from '@/components/ui/badge';
import { Loader2, Linkedin, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const linkedInSchema = z.object({
  linkedinUrl: z.string().url('Please enter a valid LinkedIn URL'),
});

type LinkedInValues = z.infer<typeof linkedInSchema>;

export function LinkedInOptimizerClient() {
  const [optimizationResult, setOptimizationResult] =
    useState<OptimizeLinkedInProfileOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LinkedInValues>({
    resolver: zodResolver(linkedInSchema),
    defaultValues: {
      linkedinUrl: '',
    },
  });

  const onSubmit = async (data: LinkedInValues) => {
    setIsLoading(true);
    setOptimizationResult(null);
    try {
      const result = await optimizeLinkedInProfile(data);
      setOptimizationResult(result);
      toast({
        title: 'Optimization Complete!',
        description: 'We found some skills you could add.',
      });
    } catch (error) {
      console.error('LinkedIn optimization failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to optimize profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            LinkedIn Profile Optimizer
          </CardTitle>
          <CardDescription>
            Enter your LinkedIn profile URL to get AI-powered suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-start gap-4 sm:flex-row"
            >
              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="sr-only">LinkedIn URL</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="https://www.linkedin.com/in/your-profile"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Optimize Profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {optimizationResult && (
        <Card>
          <CardHeader>
            <CardTitle>Optimization Results</CardTitle>
            <CardDescription>
              Here are some skills we suggest adding to your profile to attract
              more recruiters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">Missing Skills</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {optimizationResult.missingSkills.length > 0 ? (
                optimizationResult.missingSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Your profile has a great set of skills! No immediate
                  suggestions.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
