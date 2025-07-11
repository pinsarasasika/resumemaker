// src/ai/flows/generate-headshot.ts
'use server';
/**
 * @fileOverview An AI-powered headshot generator.
 *
 * - generateHeadshot - A function that generates a professional headshot from a user-provided photo.
 * - GenerateHeadshotInput - The input type for the generateHeadshot function.
 * - GenerateHeadshotOutput - The return type for the generateHeadshot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHeadshotInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateHeadshotInput = z.infer<typeof GenerateHeadshotInputSchema>;

const GenerateHeadshotOutputSchema = z.object({
  photoDataUri: z.string().describe('The generated headshot photo as a data URI.'),
});
export type GenerateHeadshotOutput = z.infer<typeof GenerateHeadshotOutputSchema>;


export async function generateHeadshot(input: GenerateHeadshotInput): Promise<GenerateHeadshotOutput> {
  return generateHeadshotFlow(input);
}

const generateHeadshotFlow = ai.defineFlow(
  {
    name: 'generateHeadshotFlow',
    inputSchema: GenerateHeadshotInputSchema,
    outputSchema: GenerateHeadshotOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: { url: input.photoDataUri }},
        {text: 'Generate a professional, high-quality, corporate-style headshot of this person suitable for a resume. The person should be looking at the camera with a neutral or slightly smiling expression. The background should be a solid, neutral color like light gray or blue. The final image should be a photorealistic, professional portrait.'},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed.');
    }

    return {
      photoDataUri: media.url,
    };
  }
);
