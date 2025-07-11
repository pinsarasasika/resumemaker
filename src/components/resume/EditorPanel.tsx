"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { SummaryForm } from "./SummaryForm";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { SkillsForm } from "./SkillsForm";
import { CustomSectionsForm } from "./CustomSectionsForm";

export function EditorPanel() {
  return (
    <Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-6">Personal Details</AccordionTrigger>
        <AccordionContent className="px-6">
          <PersonalDetailsForm />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="px-6">Professional Summary</AccordionTrigger>
        <AccordionContent className="px-6">
          <SummaryForm />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="px-6">Professional Experience</AccordionTrigger>
        <AccordionContent className="px-6">
          <ExperienceForm />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="px-6">Education</AccordionTrigger>
        <AccordionContent className="px-6">
          <EducationForm />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger className="px-6">Skills</AccordionTrigger>
        <AccordionContent className="px-6">
          <SkillsForm />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger className="px-6">Custom Sections</AccordionTrigger>
        <AccordionContent className="px-6">
          <CustomSectionsForm />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
