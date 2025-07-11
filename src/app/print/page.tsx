"use client";

import { useEffect, useState } from "react";
import { PrintResume } from "@/components/resume/PrintResume";
import { initialData } from "@/lib/initial-data";
import type { ResumeData } from "@/lib/types";
import "@/app/globals.css"; // We need this for the styling of the resume itself

export default function PrintPage() {
  const [resume, setResume] = useState<ResumeData>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      setResume(JSON.parse(savedData));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => window.print(), 500);
    }
  }, [isLoading]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading preview...</div>;
  }

  return (
    <div className="bg-white">
      <style type="text/css" media="print">
        {`
          @page { 
            size: A4;
            margin: 0;
          }
          body { -webkit-print-color-adjust: exact; }
          .a4-container {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
          }
        `}
      </style>
      <div id="resume-to-print" className="a4-container">
        <PrintResume resume={resume} />
      </div>
    </div>
  );
}
