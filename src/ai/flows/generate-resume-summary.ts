'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a resume summary.
 *
 * - generateResumeSummary - A function that generates a resume summary based on the provided input.
 * - GenerateResumeSummaryInput - The input type for the generateResumeSummary function.
 * - GenerateResumeSummaryOutput - The output type for the generateResumeSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeSummaryInputSchema = z.object({
  experiences: z.array(
    z.object({
      jobTitle: z.string().describe('The job title of the experience.'),
      company: z.string().describe('The company name of the experience.'),
      dates: z.string().describe('The start and end dates of the experience.'),
      description: z.string().describe('The description of the experience.'),
    })
  ).describe('A list of professional experiences.'),
  skills: z.array(z.string()).describe('A list of skills.'),
});
export type GenerateResumeSummaryInput = z.infer<typeof GenerateResumeSummaryInputSchema>;

const GenerateResumeSummaryOutputSchema = z.object({
  summary: z.string().describe('The generated resume summary.'),
});
export type GenerateResumeSummaryOutput = z.infer<typeof GenerateResumeSummaryOutputSchema>;

export async function generateResumeSummary(input: GenerateResumeSummaryInput): Promise<GenerateResumeSummaryOutput> {
  return generateResumeSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumeSummaryPrompt',
  input: {schema: GenerateResumeSummaryInputSchema},
  output: {schema: GenerateResumeSummaryOutputSchema},
  prompt: `You are a professional resume writer. Generate a compelling resume summary based on the following experiences and skills.

Experiences:
{{#each experiences}}
- {{jobTitle}} at {{company}} ({{dates}}): {{description}}
{{/each}}

Skills:
{{#each skills}}
- {{this}}
{{/each}}

Write a concise and professional summary (2-3 sentences) that highlights the candidate's key accomplishments and skills, making them a strong fit for potential employers.`,
});

const generateResumeSummaryFlow = ai.defineFlow(
  {
    name: 'generateResumeSummaryFlow',
    inputSchema: GenerateResumeSummaryInputSchema,
    outputSchema: GenerateResumeSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
