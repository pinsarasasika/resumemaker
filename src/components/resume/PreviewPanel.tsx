"use client";

import { useRef, useTransition } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Download, Printer, Loader2 } from "lucide-react";
import { PrintResume } from "./PrintResume";
import { downloadAsFile } from "@/lib/utils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function PreviewPanel() {
  const { resume } = useResume();
  const printRef = useRef<HTMLDivElement>(null);
  const [isDownloadingPdf, startPdfDownload] = useTransition();

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
    const printWindow = window.open("/print", "_blank");
    printWindow?.focus();
  };
  
  const handleDownloadPdf = () => {
    startPdfDownload(async () => {
      const element = printRef.current;
      if (!element) return;
  
      // A4 dimensions in mm: 210 x 297. In pixels at 96 DPI: 794 x 1123
      const a4_width = 210;
      const a4_height = 297;
  
      const canvas = await html2canvas(element, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: false,
      });
  
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
  
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      let pdfWidth = a4_width;
      let pdfHeight = pdfWidth / ratio;
      
      // If the content is longer than one page
      let heightLeft = pdfHeight;
      let position = 0;
      
      // Check if it fits in one page
      if (pdfHeight <= a4_height) {
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      } else {
        // Handle multipage PDF
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= a4_height;
        while(heightLeft > 0) {
          position = heightLeft - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
          heightLeft -= a4_height;
        }
      }
      
      pdf.save("resume.pdf");
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 bg-card rounded-t-lg p-4 flex justify-end items-center gap-2 border-b">
        <Button variant="outline" onClick={generateTextFile}>
          <Download className="mr-2 h-4 w-4" />
          Download TXT
        </Button>
         <Button onClick={handleDownloadPdf} disabled={isDownloadingPdf}>
          {isDownloadingPdf ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          Download PDF
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
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
