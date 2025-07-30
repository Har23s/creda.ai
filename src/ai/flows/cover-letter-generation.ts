'use server';

/**
 * @fileOverview Generates and optimizes a cover letter.
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
  coverLetterText: z
    .string()
    .describe('The text content of the cover letter to be optimized.'),
});
export type CoverLetterInput = z.infer<typeof CoverLetterInputSchema>;

const CoverLetterOutputSchema = z.object({
  optimizedCoverLetter: z
    .string()
    .describe('The optimized cover letter text with suggested improvements.'),
  suggestions: z
    .array(z.string())
    .describe('List of specific suggestions made by the AI.'),
  matchScore: z
    .number()
    .describe(
      'An estimated score (out of 100) for how well the cover letter matches the job description.'
    ),
});
export type CoverLetterOutput = z.infer<typeof CoverLetterOutputSchema>;

export async function generateCoverLetter(
  input: CoverLetterInput
): Promise<CoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'coverLetterPrompt',
  input: {schema: CoverLetterInputSchema},
  output: {schema: CoverLetterOutputSchema},
  prompt: `You are an expert career advisor specializing in cover letters.

  Given a cover letter and a job description, analyze the cover letter for missing keywords, tone, and overall match with the job.
  Provide an optimized cover letter, a list of specific suggestions, and an estimated match score (out of 100).

  Cover Letter:
  {{coverLetterText}}

  Job Description:
  {{jobDescription}}

  Optimize the cover letter to better match the job description.
  Follow these instructions:
  1. Ensure the tone is professional and confident.
  2. Incorporate keywords from the job description naturally.
  3. Provide specific, actionable suggestions in the "suggestions" output field.
  4. Calculate the match score based on relevance, tone, and keyword alignment.

  Output format: JSON
  {
    "optimizedCoverLetter": "...",
    "suggestions": ["..."],
    "matchScore": 0
  }`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: CoverLetterInputSchema,
    outputSchema: CoverLetterOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
