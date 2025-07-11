import { Logo } from "@/components/icons/Logo";

export function Header() {
  return (
    <header className="flex items-center gap-3 border-b bg-card p-4">
      <div className="flex items-center gap-2">
        <Logo className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold font-headline text-primary">
          ResumeFlow
        </h1>
      </div>
    </header>
  );
}
