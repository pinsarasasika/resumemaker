"use client";

import React, { useState, useTransition } from "react";
import { useResume } from "@/contexts/ResumeContext";
import type { Experience } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2, BookCheck, Loader2 } from "lucide-react";
import { proofreadSectionAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { ProofreadDialog } from "./ProofreadDialog";

export function ExperienceForm() {
  const { resume, setResume } = useResume();
  const { toast } = useToast();

  const [isProofreading, startProofreading] = useTransition();
  const [proofreadData, setProofreadData] = useState<{
    index: number;
    improved: string;
    suggestions: string[];
  } | null>(null);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newExperiences = [...resume.experiences];
    newExperiences[index] = { ...newExperiences[index], [name]: value };
    setResume((prev) => ({ ...prev, experiences: newExperiences }));
  };

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: crypto.randomUUID(),
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    const newExperiences = resume.experiences.filter((_, i) => i !== index);
    setResume((prev) => ({ ...prev, experiences: newExperiences }));
  };

  const handleProofread = (index: number, content: string) => {
    startProofreading(async () => {
      const result = await proofreadSectionAction(
        "Experience Description",
        content
      );
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      } else if (result.improvedSectionContent && result.suggestions) {
        setProofreadData({
          index,
          improved: result.improvedSectionContent,
          suggestions: result.suggestions,
        });
      }
    });
  };

  const acceptProofread = (newContent: string) => {
    if (proofreadData === null) return;
    const newExperiences = [...resume.experiences];
    newExperiences[proofreadData.index] = {
      ...newExperiences[proofreadData.index],
      description: newContent,
    };
    setResume((prev) => ({ ...prev, experiences: newExperiences }));
    setProofreadData(null);
  };

  return (
    <div className="space-y-4">
      {resume.experiences.map((exp, index) => (
        <Card key={exp.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-headline">
              {exp.jobTitle || `Experience #${index + 1}`}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeExperience(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                <Input
                  id={`jobTitle-${index}`}
                  name="jobTitle"
                  value={exp.jobTitle}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`company-${index}`}>Company</Label>
                <Input
                  id={`company-${index}`}
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                <Input
                  id={`startDate-${index}`}
                  name="startDate"
                  value={exp.startDate}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g., Jan 2020"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${index}`}>End Date</Label>
                <Input
                  id={`endDate-${index}`}
                  name="endDate"
                  value={exp.endDate}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g., Present"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                name="description"
                value={exp.description}
                onChange={(e) => handleChange(index, e)}
                rows={4}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => handleProofread(index, exp.description)}
                disabled={isProofreading && proofreadData?.index === index}
              >
                {isProofreading && proofreadData?.index === index ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <BookCheck className="mr-2 h-4 w-4" />
                )}
                Proofread
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addExperience} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Experience
      </Button>

      {proofreadData !== null && (
        <ProofreadDialog
          isOpen={true}
          onClose={() => setProofreadData(null)}
          original={resume.experiences[proofreadData.index].description}
          improved={proofreadData.improved}
          suggestions={proofreadData.suggestions}
          onAccept={acceptProofread}
        />
      )}
    </div>
  );
}
