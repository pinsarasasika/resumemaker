import { DefaultTemplate } from "./templates/DefaultTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import type { ResumeData } from "@/lib/types";

export interface TemplateProps {
  resume: ResumeData;
}

const templates: Record<string, React.ComponentType<TemplateProps>> = {
  default: DefaultTemplate,
  modern: ModernTemplate,
};

export function PrintResume({ resume }: TemplateProps) {
  const TemplateComponent = templates[resume.template] || DefaultTemplate;
  return <TemplateComponent resume={resume} />;
}
