"use client";

import React, { useState, useTransition } from "react";
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
import { Plus, Trash2, BookCheck, Loader2 } from "lucide-react";
import { proofreadSectionAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { ProofreadDialog } from "./ProofreadDialog";

export function CustomSectionsForm() {
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
    const newSections = [...resume.customSections];
    newSections[index] = { ...newSections[index], [name]: value };
    setResume((prev) => ({ ...prev, customSections: newSections }));
  };

  const addSection = () => {
    setResume((prev) => ({
      ...prev,
      customSections: [
        ...prev.customSections,
        {
          id: crypto.randomUUID(),
          title: "",
          content: "",
        },
      ],
    }));
  };

  const removeSection = (index: number) => {
    const newSections = resume.customSections.filter((_, i) => i !== index);
    setResume((prev) => ({ ...prev, customSections: newSections }));
  };
  
  const handleProofread = (index: number, title: string, content: string) => {
    startProofreading(async () => {
      const result = await proofreadSectionAction(
        title || "Custom Section",
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
    const newSections = [...resume.customSections];
    newSections[proofreadData.index] = {
      ...newSections[proofreadData.index],
      content: newContent,
    };
    setResume((prev) => ({ ...prev, customSections: newSections }));
    setProofreadData(null);
  };

  return (
    <div className="space-y-4">
      {resume.customSections.map((section, index) => (
        <Card key={section.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-headline">
              {section.title || `Custom Section #${index + 1}`}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSection(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`custom-title-${index}`}>Section Title</Label>
              <Input
                id={`custom-title-${index}`}
                name="title"
                value={section.title}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`custom-content-${index}`}>Content</Label>
              <Textarea
                id={`custom-content-${index}`}
                name="content"
                value={section.content}
                onChange={(e) => handleChange(index, e)}
                rows={4}
              />
               <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => handleProofread(index, section.title, section.content)}
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
      <Button variant="outline" onClick={addSection} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Custom Section
      </Button>

      {proofreadData !== null && (
        <ProofreadDialog
          isOpen={true}
          onClose={() => setProofreadData(null)}
          original={resume.customSections[proofreadData.index].content}
          improved={proofreadData.improved}
          suggestions={proofreadData.suggestions}
          onAccept={acceptProofread}
        />
      )}
    </div>
  );
}
