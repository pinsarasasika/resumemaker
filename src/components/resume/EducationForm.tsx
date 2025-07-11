"use client";

import React from "react";
import { useResume } from "@/contexts/ResumeContext";
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
import { Plus, Trash2 } from "lucide-react";

export function EducationForm() {
  const { resume, setResume } = useResume();

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newEducation = [...resume.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setResume((prev) => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: crypto.randomUUID(),
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const removeEducation = (index: number) => {
    const newEducation = resume.education.filter((_, i) => i !== index);
    setResume((prev) => ({ ...prev, education: newEducation }));
  };

  return (
    <div className="space-y-4">
      {resume.education.map((edu, index) => (
        <Card key={edu.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-headline">
              {edu.degree || `Education #${index + 1}`}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeEducation(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`degree-${index}`}>Degree/Certificate</Label>
                <Input
                  id={`degree-${index}`}
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`institution-${index}`}>
                  Institution/University
                </Label>
                <Input
                  id={`institution-${index}`}
                  name="institution"
                  value={edu.institution}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`edu-startDate-${index}`}>Start Date</Label>
                <Input
                  id={`edu-startDate-${index}`}
                  name="startDate"
                  value={edu.startDate}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g., Aug 2016"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`edu-endDate-${index}`}>End Date</Label>
                <Input
                  id={`edu-endDate-${index}`}
                  name="endDate"
                  value={edu.endDate}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g., May 2020"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`edu-description-${index}`}>
                Description (Optional)
              </Label>
              <Textarea
                id={`edu-description-${index}`}
                name="description"
                value={edu.description}
                onChange={(e) => handleChange(index, e)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addEducation} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Education
      </Button>
    </div>
  );
}
