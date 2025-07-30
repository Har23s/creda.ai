'use server';

/**
 * @fileOverview Generates a cover letter based on a job description and desired tone.
 *
 * - generateCoverLetter - A function that generates a cover letter.
 * - CoverLetterInput - The input type for the generateCoverLetter function.
 * - CoverLetterOutput - The return type for the generateCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CoverLetterInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description for the position being applied for.'),
  tone: z.enum(['Formal', 'Confident', 'Direct']).describe('The desired tone of the cover letter.'),
  yourName: z.string().describe("The user's full name."),
  companyName: z.string().describe('The name of the company being applied to.'),
  hiringManager: z.string().optional().describe("The hiring manager's name, if known."),
});
export type CoverLetterInput = z.infer<typeof CoverLetterInputSchema>;

const CoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter.'),
});
export type CoverLetterOutput = z.infer<typeof CoverLetterOutputSchema>;

export async function generateCoverLetter(input: CoverLetterInput): Promise<CoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'coverLetterPrompt',
  input: {schema: CoverLetterInputSchema},
  output: {schema: CoverLetterOutputSchema},
  prompt: `You are an expert career advisor. Please generate a professional cover letter based on the following information.

My Name: {{{yourName}}}
Company Name: {{{companyName}}}
{{#if hiringManager}}
Hiring Manager: {{{hiringManager}}}
{{/if}}
Job Description: {{{jobDescription}}}
Tone: {{{tone}}}

Generate the cover letter now.`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: CoverLetterInputSchema,
    outputSchema: CoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
