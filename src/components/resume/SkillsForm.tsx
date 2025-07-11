"use client";

import React, { useState } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function SkillsForm() {
  const { resume, setResume } = useResume();
  const [currentSkill, setCurrentSkill] = useState("");

  const handleAddSkill = () => {
    if (currentSkill.trim() !== "") {
      setResume((prev) => ({
        ...prev,
        skills: [
          ...prev.skills,
          { id: crypto.randomUUID(), name: currentSkill.trim() },
        ],
      }));
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (id: string) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="skill-input">Add a skill</Label>
        <div className="flex gap-2">
          <Input
            id="skill-input"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., React, Project Management"
          />
          <Button onClick={handleAddSkill}>Add</Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {resume.skills.length === 0 && (
          <p className="text-sm text-muted-foreground">No skills added yet.</p>
        )}
        {resume.skills.map((skill) => (
          <Badge key={skill.id} variant="secondary" className="pl-3 pr-1 py-1">
            {skill.name}
            <button
              onClick={() => handleRemoveSkill(skill.id)}
              className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {skill.name}</span>
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
