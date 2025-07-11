"use client";

import { useResume } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import React, { useRef, useState, useTransition } from "react";
import { generateHeadshotAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

export function PersonalDetailsForm() {
  const { resume, setResume, setPhotoDataUri } = useResume();
  const { toast } = useToast();
  const [isGenerating, startGeneration] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResume((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateHeadshot = () => {
    if (!resume.photoDataUri) {
      toast({
        variant: "destructive",
        title: "No Photo",
        description: "Please select a photo first.",
      });
      return;
    }
    startGeneration(async () => {
      const result = await generateHeadshotAction(resume.photoDataUri!);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      } else if (result.photoDataUri) {
        setPhotoDataUri(result.photoDataUri);
        setResume((prev) => ({
          ...prev,
          personalDetails: {
            ...prev.personalDetails,
            photoUrl: result.photoDataUri,
          },
        }));
        toast({
          title: "Success",
          description: "AI headshot generated!",
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={resume.personalDetails.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={resume.personalDetails.jobTitle}
            onChange={handleChange}
            placeholder="Senior Software Engineer"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="photoUrl">Photo URL (or Upload)</Label>
        <div className="flex gap-2">
          <Input
            id="photoUrl"
            name="photoUrl"
            value={resume.personalDetails.photoUrl}
            onChange={handleChange}
            placeholder="https://your-photo.com/profile.jpg"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>
       {selectedFile && (
         <div className="flex flex-wrap gap-2 mt-2">
          <Button onClick={handleGenerateHeadshot} disabled={isGenerating}>
            {isGenerating ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Sparkles />
            )}
            Generate AI Headshot
          </Button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={resume.personalDetails.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={resume.personalDetails.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={resume.personalDetails.address}
          onChange={handleChange}
          placeholder="City, State, Country"
        />
      </div>
    </div>
  );
}
