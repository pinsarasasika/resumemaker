import type { ResumeData } from "@/lib/types";
import { Mail, Phone, MapPin, User, Briefcase, GraduationCap, Star, Grip, Link as LinkIcon, Linkedin, Github, Globe } from "lucide-react";
import Image from "next/image";

interface PrintResumeProps {
  resume: ResumeData;
}

const getLinkIcon = (label: string) => {
  const lowerCaseLabel = label.toLowerCase();
  if (lowerCaseLabel.includes('linkedin')) {
    return <Linkedin className="w-4 h-4 text-accent"/>;
  }
  if (lowerCaseLabel.includes('github')) {
    return <Github className="w-4 h-4 text-accent"/>;
  }
  if (lowerCaseLabel.includes('website') || lowerCaseLabel.includes('portfolio')) {
    return <Globe className="w-4 h-4 text-accent"/>;
  }
  return <LinkIcon className="w-4 h-4 text-accent"/>;
}

export function PrintResume({ resume }: PrintResumeProps) {
  const {
    personalDetails,
    summary,
    experiences,
    education,
    skills,
    customSections,
  } = resume;

  const photoSrc = resume.photoDataUri || personalDetails.photoUrl;

  return (
    <div className="bg-white text-gray-800 p-8 md:p-12 font-body print:p-8 a4-container">
      <header className="flex flex-col sm:flex-row items-center gap-8 border-b-2 border-gray-200 pb-8">
        {photoSrc && (
          <div className="flex-shrink-0">
             <Image
              src={photoSrc}
              alt={personalDetails.name}
              width={128}
              height={128}
              className="rounded-full object-cover w-32 h-32"
              data-ai-hint="person face"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/128x128.png'; }}
            />
          </div>
        )}
        <div className="text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
            {personalDetails.name}
          </h1>
          <p className="text-xl md:text-2xl text-accent font-medium mt-1">
            {personalDetails.jobTitle}
          </p>
          <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-sm text-gray-600">
             <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent"/> {personalDetails.email}</span>
             <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent"/> {personalDetails.phone}</span>
             <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent"/> {personalDetails.address}</span>
             {personalDetails.links?.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                  {getLinkIcon(link.label)}
                  {link.url.replace(/^(https?:\/\/)?(www\.)?/, '')}
                </a>
             ))}
          </div>
        </div>
      </header>

      <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold font-headline border-b-2 border-gray-100 pb-2 mb-4 text-primary">
              <User className="w-6 h-6 text-accent" />
              Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>

          {experiences.length > 0 && (
            <section>
              <h2 className="flex items-center gap-3 text-2xl font-bold font-headline border-b-2 border-gray-100 pb-2 mb-4 text-primary">
                 <Briefcase className="w-6 h-6 text-accent" />
                 Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-lg text-gray-800">{exp.jobTitle}</h3>
                      <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="font-medium text-accent">{exp.company}</p>
                    <p className="mt-2 text-gray-600 text-sm whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

           {customSections.map((sec) => (
             <section key={sec.id}>
              <h2 className="flex items-center gap-3 text-2xl font-bold font-headline border-b-2 border-gray-100 pb-2 mb-4 text-primary">
                 <Grip className="w-6 h-6 text-accent" />
                 {sec.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{sec.content}</p>
            </section>
          ))}
        </div>

        <aside className="space-y-10">
           {education.length > 0 && (
            <section>
              <h2 className="flex items-center gap-3 text-2xl font-bold font-headline border-b-2 border-gray-100 pb-2 mb-4 text-primary">
                <GraduationCap className="w-6 h-6 text-accent" />
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-md text-gray-800">{edu.degree}</h3>
                    <p className="font-medium text-accent text-sm">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    <p className="mt-1 text-gray-600 text-xs whitespace-pre-wrap">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="flex items-center gap-3 text-2xl font-bold font-headline border-b-2 border-gray-100 pb-2 mb-4 text-primary">
                <Star className="w-6 h-6 text-accent" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>
      </main>
    </div>
  );
}
