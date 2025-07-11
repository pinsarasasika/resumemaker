"use client";

import React, { createContext, useState, useContext, useEffect, type Dispatch, type SetStateAction } from "react";
import type { ResumeData } from "@/lib/types";
import { initialData } from "@/lib/initial-data";

interface ResumeContextType {
  resume: ResumeData;
  setResume: Dispatch<SetStateAction<ResumeData>>;
  setPhotoDataUri: (uri: string | null) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [resume, setResume] = useState<ResumeData>(initialData);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedResume = localStorage.getItem("resumeData");
      if (savedResume) {
        setResume(JSON.parse(savedResume));
      }
    } catch (error) {
      console.error("Failed to parse resume data from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("resumeData", JSON.stringify(resume));
    }
  }, [resume, isMounted]);

  const setPhotoDataUri = (uri: string | null) => {
    setResume(prev => ({ ...prev, photoDataUri: uri }));
  }

  return (
    <ResumeContext.Provider value={{ resume, setResume, setPhotoDataUri }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
