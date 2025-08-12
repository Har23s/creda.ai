'use server';

/**
 * @fileOverview A flow to parse a resume file and extract structured data.
 *
 * - parseResume - A function that handles the resume parsing process.
 * - ParseResumeInput - The input type for the parseResume function.
 * - ParseResumeOutput - The return type for the parseResume function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExperienceSchema = z.object({
  title: z.string().describe('The job title.'),
  company: z.string().describe('The company name.'),
  dates: z.string().describe('The dates of employment.'),
  description: z.string().describe('The job description and accomplishments.'),
});

const EducationSchema = z.object({
  degree: z.string().describe('The degree obtained.'),
  school: z.string().describe('The name of the school or university.'),
  dates: z.string().describe('The dates of attendance.'),
});

const ProjectSchema = z.object({
  name: z.string().describe('The name of the project.'),
  description: z.string().describe('A description of the project.'),
  url: z.string().optional().describe('A URL to the project if available.'),
});

const CertificateSchema = z.object({
  name: z.string().describe('The name of the certificate.'),
  issuer: z.string().describe('The issuing organization.'),
  date: z.string().describe('The date the certificate was awarded.'),
});

const ParseResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "A resume file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ParseResumeInput = z.infer<typeof ParseResumeInputSchema>;

const ParseResumeOutputSchema = z.object({
  fullName: z.string().describe("The user's full name."),
  email: z.string().describe("The user's email address."),
  phone: z.string().describe("The user's phone number."),
  linkedin: z.string().optional().describe("A URL to the user's LinkedIn profile."),
  website: z.string().optional().describe("A URL to the user's personal website or portfolio."),
  summary: z.string().describe("A professional summary about the user."),
  experience: z.array(ExperienceSchema).describe("A list of the user's work experiences."),
  education: z.array(EducationSchema).describe("A list of the user's educational background."),
  projects: z.array(ProjectSchema).describe("A list of the user's projects."),
  certificates: z.array(CertificateSchema).describe("A list of the user's certificates."),
  skills: z.string().describe("A comma-separated list of the user's skills."),
});

export type ParseResumeOutput = z.infer<typeof ParseResumeOutputSchema>;

export async function parseResume(input: ParseResumeInput): Promise<ParseResumeOutput> {
  return parseResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeParserPrompt',
  input: { schema: ParseResumeInputSchema },
  output: { schema: ParseResumeOutputSchema },
  prompt: `You are an expert resume parser. Analyze the provided resume file and extract the user's information into a structured JSON format.

Resume file: {{media url=resumeDataUri}}

Parse all sections including personal details, summary, work experience, education, projects, certificates, and skills. Be as accurate as possible. For skills, provide a single comma-separated string. If a section is not present, return an empty array or an empty string for that field.`,
});

const parseResumeFlow = ai.defineFlow(
  {
    name: 'parseResumeFlow',
    inputSchema: ParseResumeInputSchema,
    outputSchema: ParseResumeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
