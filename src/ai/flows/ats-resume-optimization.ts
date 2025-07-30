'use server';

/**
 * @fileOverview A flow to optimize a resume based on a job description for ATS systems.
 *
 * - atsResumeOptimization - A function that handles the resume optimization process.
 * - AtsResumeOptimizationInput - The input type for the atsResumeOptimization function.
 * - AtsResumeOptimizationOutput - The return type for the atsResumeOptimization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AtsResumeOptimizationInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be optimized.'),
  jobDescription: z
    .string()
    .describe('The job description to match the resume against.'),
});
export type AtsResumeOptimizationInput = z.infer<typeof AtsResumeOptimizationInputSchema>;

const AtsResumeOptimizationOutputSchema = z.object({
  optimizedResume: z
    .string()
    .describe('The optimized resume text with suggested improvements.'),
  suggestions: z.array(z.string()).describe('List of specific suggestions made by the AI.'),
  atsScore: z.number().describe('An estimated ATS score for the optimized resume.'),
});
export type AtsResumeOptimizationOutput = z.infer<typeof AtsResumeOptimizationOutputSchema>;

export async function atsResumeOptimization(input: AtsResumeOptimizationInput): Promise<AtsResumeOptimizationOutput> {
  return atsResumeOptimizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'atsResumeOptimizationPrompt',
  input: {schema: AtsResumeOptimizationInputSchema},
  output: {schema: AtsResumeOptimizationOutputSchema},
  prompt: `You are an expert resume optimizer, specializing in Applicant Tracking Systems (ATS).

  Given a resume and a job description, analyze the resume for missing keywords, areas for improvement, and overall ATS compatibility.
  Provide an optimized resume, a list of specific suggestions, and an estimated ATS score (out of 100).

  Resume:
  {{resumeText}}

  Job Description:
  {{jobDescription}}

  Optimize the resume to better match the job description and improve its ATS score.
  Follow these instructions:
  1. Ensure that all important keywords from the job description are present in the resume.
  2. Rephrase bullet points to include keywords naturally and effectively.
  3. Provide specific suggestions in the "suggestions" output field.
  4. Calculate the ATS score based on the completeness and relevance of the resume content.

  Output format: JSON
  {
    "optimizedResume": "...",
    "suggestions": ["..."],
    "atsScore": 0
  }`,
});

const atsResumeOptimizationFlow = ai.defineFlow(
  {
    name: 'atsResumeOptimizationFlow',
    inputSchema: AtsResumeOptimizationInputSchema,
    outputSchema: AtsResumeOptimizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
