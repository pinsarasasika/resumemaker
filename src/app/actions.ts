"use server";

import { generateResumeSummary } from "@/ai/flows/generate-resume-summary";
import { proofreadSection } from "@/ai/flows/proofread-resume-section";
import { generateHeadshot } from "@/ai/flows/generate-headshot";
import type { Experience, Skill } from "@/lib/types";

export async function generateSummaryAction(
  experiences: Experience[],
  skills: Skill[]
) {
  try {
    const result = await generateResumeSummary({
      experiences: experiences.map((exp) => ({
        ...exp,
        dates: `${exp.startDate} - ${exp.endDate}`,
      })),
      skills: skills.map((skill) => skill.name),
    });
    return { summary: result.summary };
  } catch (error) {
    console.error(error);
    return { error: "Failed to generate summary. Please try again." };
  }
}

export async function proofreadSectionAction(
  sectionTitle: string,
  sectionContent: string
) {
  try {
    const result = await proofreadSection({ sectionTitle, sectionContent });
    return result;
  } catch (error) {
    console.error(error);
    return { error: "Failed to proofread content. Please try again." };
  }
}

export async function generateHeadshotAction(photoDataUri: string) {
  try {
    const result = await generateHeadshot({ photoDataUri });
    return { photoDataUri: result.photoDataUri };
  } catch (error) {
    console.error(error);
    return { error: "Failed to generate headshot. Please try again." };
  }
}
