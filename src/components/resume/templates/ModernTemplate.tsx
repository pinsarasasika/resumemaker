import type { TemplateProps } from "../PrintResume";
import { Mail, Phone, MapPin, User, Briefcase, GraduationCap, Star, Grip, Link as LinkIcon, Linkedin, Github, Globe } from "lucide-react";
import Image from "next/image";

const getLinkIcon = (label: string) => {
  const lowerCaseLabel = label.toLowerCase();
  if (lowerCaseLabel.includes('linkedin')) {
    return <Linkedin className="w-4 h-4 text-primary-foreground/80"/>;
  }
  if (lowerCaseLabel.includes('github')) {
    return <Github className="w-4 h-4 text-primary-foreground/80"/>;
  }
  if (lowerCaseLabel.includes('website') || lowerCaseLabel.includes('portfolio')) {
    return <Globe className="w-4 h-4 text-primary-foreground/80"/>;
  }
  return <LinkIcon className="w-4 h-4 text-primary-foreground/80"/>;
}

export function ModernTemplate({ resume }: TemplateProps) {
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
    <div className="bg-white text-gray-800 font-body a4-container flex">
      {/* Left Column */}
      <aside className="w-1/3 bg-primary text-primary-foreground p-8 flex flex-col gap-8">
        {photoSrc && (
            <div className="mx-auto mt-4">
              <Image
                src={photoSrc}
                alt={personalDetails.name}
                width={160}
                height={160}
                className="rounded-full object-cover aspect-square"
                data-ai-hint="person face"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/160x160.png'; }}
              />
            </div>
          )}

        <div>
            <h2 className="text-xl font-bold font-headline text-primary-foreground/60 tracking-widest uppercase">Contact</h2>
            <div className="border-t-2 border-primary-foreground/30 my-3"></div>
            <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary-foreground/80 shrink-0"/>
                    <span>{personalDetails.email}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary-foreground/80 shrink-0"/>
                    <span>{personalDetails.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary-foreground/80 shrink-0"/>
                    <span>{personalDetails.address}</span>
                </div>
                 {personalDetails.links?.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:underline">
                  {getLinkIcon(link.label)}
                  <span className="truncate">{link.url.replace(/^(https?:\/\/)?(www\.)?/, '')}</span>
                </a>
             ))}
            </div>
        </div>

        {education.length > 0 && (
        <div>
            <h2 className="text-xl font-bold font-headline text-primary-foreground/60 tracking-widest uppercase">Education</h2>
            <div className="border-t-2 border-primary-foreground/30 my-3"></div>
            <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <h3 className="font-bold text-md">{edu.degree}</h3>
                    <p className="font-medium text-primary-foreground/80">{edu.institution}</p>
                    <p className="text-xs text-primary-foreground/60">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
            </div>
        </div>
        )}

        {skills.length > 0 && (
            <div>
                <h2 className="text-xl font-bold font-headline text-primary-foreground/60 tracking-widest uppercase">Skills</h2>
                <div className="border-t-2 border-primary-foreground/30 my-3"></div>
                <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="bg-primary-foreground/20 text-primary-foreground text-sm px-3 py-1 rounded-full">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
        )}
      </aside>

      {/* Right Column */}
      <main className="w-2/3 p-10">
        <header className="text-left mb-10">
            <h1 className="text-5xl font-bold font-headline text-primary">
                {personalDetails.name}
            </h1>
            <p className="text-2xl text-accent font-medium mt-1">
                {personalDetails.jobTitle}
            </p>
        </header>

        <section className="mb-8">
            <h2 className="flex items-center gap-3 text-2xl font-bold font-headline mb-4 text-primary border-b-2 border-gray-200 pb-2">
              <User className="w-6 h-6 text-accent" />
              Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">{summary}</p>
        </section>

        {experiences.length > 0 && (
            <section className="mb-8">
              <h2 className="flex items-center gap-3 text-2xl font-bold font-headline mb-4 text-primary border-b-2 border-gray-200 pb-2">
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
            <section key={sec.id} className="mb-8">
            <h2 className="flex items-center gap-3 text-2xl font-bold font-headline mb-4 text-primary border-b-2 border-gray-200 pb-2">
                <Grip className="w-6 h-6 text-accent" />
                {sec.title}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{sec.content}</p>
            </section>
        ))}

      </main>
    </div>
  );
}
