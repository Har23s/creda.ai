'use server';

/**

 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the cover letter to be optimized.'),
  jobDescription: z
    .string()
    .describe('The job description to match the cover letter against.'),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  optimizedResume: z
    .string()
    .describe('The optimized cover letter text with suggested improvements.'),
  suggestions: z.array(z.string()).describe('List of specific suggestions made by the AI.'),
  atsScore: z.number().describe('An estimated ATS score for the optimized cover letter.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are an expert cover letter writer, specializing in tailoring applications to job descriptions.

  Given a cover letter draft and a job description, analyze the draft for missing keywords, areas for improvement, and overall impact.
  Provide an optimized cover letter, a list of specific suggestions, and an estimated match score (out of 100).

  Cover Letter Draft:
  {{resumeText}}

  Job Description:
  {{jobDescription}}

  Optimize the cover letter to better match the job description and improve its impact.
  Follow these instructions:
  1. Ensure that all important keywords from the job description are present in the cover letter.
  2. Rephrase sentences to be more impactful and align with the company's tone.
  3. Provide specific suggestions in the "suggestions" output field.
  4. Calculate the match score based on the completeness and relevance of the cover letter content, and put it in the atsScore field.
  5. Return the full optimized cover letter as a JSON object string in the 'optimizedResume' field.

  Output format: JSON
  {
    "optimizedResume": "...",
    "suggestions": ["..."],
    "atsScore": 0
  }`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
