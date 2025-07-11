import type { ResumeData } from "./types";

export const initialData: ResumeData = {
  personalDetails: {
    name: "Your Name",
    jobTitle: "Your Job Title",
    email: "your.email@example.com",
    phone: "(123) 456-7890",
    address: "Your City, State",
    photoUrl: "",
    links: [],
  },
  summary:
    "A brief professional summary about yourself. You can also generate one with AI based on your experience and skills.",
  experiences: [],
  education: [],
  skills: [],
  customSections: [],
};
