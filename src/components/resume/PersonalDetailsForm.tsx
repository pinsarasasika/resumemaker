"use client";

import { useResume } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PersonalDetailsForm() {
  const { resume, setResume } = useResume();

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
        <Label htmlFor="photoUrl">Photo URL</Label>
        <Input
          id="photoUrl"
          name="photoUrl"
          value={resume.personalDetails.photoUrl}
          onChange={handleChange}
          placeholder="https://your-photo.com/profile.jpg"
        />
      </div>
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
