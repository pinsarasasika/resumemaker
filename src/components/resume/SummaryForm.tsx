"use client";

import { useState, useTransition } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, BookCheck } from "lucide-react";
import { generateSummaryAction, proofreadSectionAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { ProofreadDialog } from "./ProofreadDialog";

export function SummaryForm() {
  const { resume, setResume } = useResume();
  const { toast } = useToast();
  const [isGenerating, startGeneration] = useTransition();
  const [isProofreading, startProofreading] = useTransition();
  const [proofreadData, setProofreadData] = useState<{
    improved: string;
    suggestions: string[];
  } | null>(null);

  const handleGenerate = () => {
    startGeneration(async () => {
      const result = await generateSummaryAction(
        resume.experiences,
        resume.skills
      );
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      } else if (result.summary) {
        setResume((prev) => ({ ...prev, summary: result.summary! }));
        toast({
          title: "Success",
          description: "AI summary generated!",
        });
      }
    });
  };

  const handleProofread = () => {
    startProofreading(async () => {
      const result = await proofreadSectionAction(
        "Professional Summary",
        resume.summary
      );
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      } else if (result.improvedSectionContent && result.suggestions) {
        setProofreadData({
          improved: result.improvedSectionContent,
          suggestions: result.suggestions,
        });
      }
    });
  };

  const acceptProofread = (newContent: string) => {
    setResume((prev) => ({ ...prev, summary: newContent }));
    setProofreadData(null);
    toast({
      title: "Success",
      description: "Summary updated with AI suggestions.",
    });
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="summary">Your Summary</Label>
        <Textarea
          id="summary"
          value={resume.summary}
          onChange={(e) =>
            setResume((prev) => ({ ...prev, summary: e.target.value }))
          }
          placeholder="A brief professional summary..."
          rows={6}
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <Button onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Sparkles />
          )}
          Generate with AI
        </Button>
        <Button
          variant="outline"
          onClick={handleProofread}
          disabled={isProofreading}
        >
          {isProofreading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <BookCheck />
          )}
          Proofread
        </Button>
      </div>

      <ProofreadDialog
        isOpen={!!proofreadData}
        onClose={() => setProofreadData(null)}
        original={resume.summary}
        improved={proofreadData?.improved ?? ""}
        suggestions={proofreadData?.suggestions ?? []}
        onAccept={acceptProofread}
      />
    </>
  );
}
