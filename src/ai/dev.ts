import { config } from 'dotenv';
config();

import '@/ai/flows/generate-resume-summary.ts';
import '@/ai/flows/proofread-resume-section.ts';
import '@/ai/flows/generate-headshot.ts';
