// src/ai/flows/proofread-resume-section.ts
'use server';

/**
 * @fileOverview An AI-powered proofreading tool for resume sections.
 *
 * - proofreadSection - A function that proofreads a given section of a resume and suggests improvements.
 * - ProofreadSectionInput - The input type for the proofreadSection function.
 * - ProofreadSectionOutput - The return type for the proofreadSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProofreadSectionInputSchema = z.object({
  sectionTitle: z.string().describe('The title of the resume section to proofread.'),
  sectionContent: z.string().describe('The content of the resume section to proofread.'),
});
export type ProofreadSectionInput = z.infer<typeof ProofreadSectionInputSchema>;

const ProofreadSectionOutputSchema = z.object({
  improvedSectionContent: z.string().describe('The proofread and improved content of the resume section.'),
  suggestions: z.array(z.string()).describe('Specific suggestions for improvement.'),
});
export type ProofreadSectionOutput = z.infer<typeof ProofreadSectionOutputSchema>;

export async function proofreadSection(input: ProofreadSectionInput): Promise<ProofreadSectionOutput> {
  return proofreadSectionFlow(input);
}

const proofreadSectionPrompt = ai.definePrompt({
  name: 'proofreadSectionPrompt',
  input: {schema: ProofreadSectionInputSchema},
  output: {schema: ProofreadSectionOutputSchema},
  prompt: `You are an AI resume expert. Your task is to proofread and improve the given section of a resume.

  Section Title: {{{sectionTitle}}}
  Section Content: {{{sectionContent}}}

  Provide an improved version of the section content, as well as a list of specific suggestions for improvement.
  The improvedSectionContent MUST incorporate all of your suggestions.
  `, 
});

const proofreadSectionFlow = ai.defineFlow(
  {
    name: 'proofreadSectionFlow',
    inputSchema: ProofreadSectionInputSchema,
    outputSchema: ProofreadSectionOutputSchema,
  },
  async input => {
    const {output} = await proofreadSectionPrompt(input);
    return output!;
  }
);
