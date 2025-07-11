export interface Link {
  id: string;
  label: string;
  url: string;
}

export interface PersonalDetails {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  photoUrl: string;
  links: Link[];
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  customSections: CustomSection[];
  photoDataUri?: string | null;
  template: string;
}
