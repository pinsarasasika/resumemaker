"use client";

import { useRef, useTransition } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Download, Printer, Loader2, Palette } from "lucide-react";
import { PrintResume } from "./PrintResume";
import { downloadAsFile } from "@/lib/utils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

export function PreviewPanel() {
  const { resume, setResume } = useResume();
  const printRef = useRef<HTMLDivElement>(null);
  const [isDownloadingPdf, startPdfDownload] = useTransition();

  const handleTemplateChange = (template: string) => {
    setResume((prev) => ({ ...prev, template }));
  };

  const generateTextFile = () => {
    let text = "";
    text += `${resume.personalDetails.name}\n`;
    text += `${resume.personalDetails.jobTitle}\n`;
    text += `\nContact:\n${resume.personalDetails.email} | ${resume.personalDetails.phone} | ${resume.personalDetails.address}\n`;
    (resume.personalDetails.links || []).forEach(link => {
        text += `${link.label}: ${link.url}\n`;
    });
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
    const printWindow = window.open("/print", "_blank");
    printWindow?.focus();
  };
  
  const handleDownloadPdf = () => {
    startPdfDownload(async () => {
      const element = printRef.current;
      if (!element) return;
  
      const a4_width = 210;
      const a4_height = 297;
  
      const canvas = await html2canvas(element, {
        scale: 3, 
        useCORS: true,
        logging: false,
      });
  
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
  
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const canvasRatio = canvasWidth / canvasHeight;
      const pdfWidth = a4_width;
      const pdfHeight = pdfWidth / canvasRatio;

      let heightLeft = canvasHeight * (a4_width / canvasWidth);
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      heightLeft -= a4_height;

      while (heightLeft > 0) {
        position -= a4_height;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= a4_height;
      }
      
      pdf.save("resume.pdf");
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 bg-card rounded-t-lg p-4 flex justify-between items-center gap-2 border-b">
        <div className="flex items-center gap-2">
           <Label htmlFor="template-select" className="flex items-center gap-2 text-sm font-medium"><Palette className="w-4 h-4" /> Template</Label>
           <Select onValueChange={handleTemplateChange} defaultValue={resume.template}>
            <SelectTrigger id="template-select" className="w-[180px]">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={generateTextFile}>
            <Download className="mr-2 h-4 w-4" />
            TXT
          </Button>
           <Button onClick={handleDownloadPdf} disabled={isDownloadingPdf}>
            {isDownloadingPdf ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            PDF
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 p-4 lg:p-8 overflow-y-auto shadow-lg">
        <div 
          ref={printRef}
          className="max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-xl"
        >
          <PrintResume resume={resume} />
        </div>
      </div>
    </div>
  );
}
