"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ProofreadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  original: string;
  improved: string;
  suggestions: string[];
  onAccept: (improvedContent: string) => void;
}

export function ProofreadDialog({
  isOpen,
  onClose,
  original,
  improved,
  suggestions,
  onAccept,
}: ProofreadDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>AI Proofreading Suggestions</DialogTitle>
          <DialogDescription>
            Review the suggestions and accept the changes if you're happy with
            them.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 max-h-[60vh]">
          <div className="space-y-4">
            <h3 className="font-semibold">Original Text</h3>
            <ScrollArea className="h-48 rounded-md border p-4 text-sm">
              {original}
            </ScrollArea>
            <h3 className="font-semibold">Suggestions for Improvement</h3>
            <ScrollArea className="h-48 rounded-md border p-4">
              <ul className="list-disc list-inside space-y-2 text-sm">
                {suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </ScrollArea>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">AI-Improved Text</h3>
            <ScrollArea className="h-full rounded-md border p-4 text-sm bg-green-50/50">
              {improved}
            </ScrollArea>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onAccept(improved)}>Accept Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
