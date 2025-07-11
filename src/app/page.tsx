"use client";

import { EditorPanel } from "@/components/resume/EditorPanel";
import { PreviewPanel } from "@/components/resume/PreviewPanel";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <ResumeProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-4 p-4 overflow-hidden">
          <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2 h-full overflow-y-auto bg-card rounded-lg shadow">
            <EditorPanel />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-3 h-full overflow-y-auto">
            <PreviewPanel />
          </div>
        </main>
      </div>
    </ResumeProvider>
  );
}
