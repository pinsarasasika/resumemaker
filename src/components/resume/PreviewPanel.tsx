"use client";

import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { PrintResume } from "./PrintResume";
import { downloadAsFile } from "@/lib/utils";

export function PreviewPanel() {
  const { resume } = useResume();

  const generateTextFile = () => {
    let text = "";
    text += `${resume.personalDetails.name}\n`;
    text += `${resume.personalDetails.jobTitle}\n`;
    text += `\nContact:\n${resume.personalDetails.email} | ${resume.personalDetails.phone} | ${resume.personalDetails.address}\n`;
    text += `\n--- Summary ---\n${resume.summary}\n`;

    if (resume.experiences.length > 0) {
      text += `\n--- Experience ---\n`;
      resume.experiences.forEach((exp) => {
        text += `\n${exp.jobTitle} at ${exp.company}\n`;
        text += `${exp.startDate} - ${exp.endDate}\n`;
        text += `${exp.description}\n`;
      });
    }

    if (resume.education.length > 0) {
      text += `\n--- Education ---\n`;
      resume.education.forEach((edu) => {
        text += `\n${edu.degree} - ${edu.institution}\n`;
        text += `${edu.startDate} - ${edu.endDate}\n`;
        text += `${edu.description}\n`;
      });
    }

    if (resume.skills.length > 0) {
      text += `\n--- Skills ---\n`;
      text += resume.skills.map((s) => s.name).join(", ") + "\n";
    }

    if (resume.customSections.length > 0) {
      resume.customSections.forEach((sec) => {
        text += `\n--- ${sec.title} ---\n`;
        text += `${sec.content}\n`;
      });
    }

    downloadAsFile("resume.txt", text, "text/plain");
  };
  
  const handlePrint = () => {
    const printWindow = window.open('/print', '_blank');
    printWindow?.focus();
  };


  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 bg-card rounded-t-lg p-4 flex justify-end items-center gap-2 border-b">
        <Button variant="outline" onClick={generateTextFile}>
          <Download className="mr-2 h-4 w-4" />
          Download TXT
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Export as PDF
        </Button>
      </div>
      <div className="flex-1 bg-white p-4 lg:p-8 overflow-y-auto shadow-lg">
        <div className="max-w-4xl mx-auto">
          <PrintResume resume={resume} />
        </div>
      </div>
    </div>
  );
}
