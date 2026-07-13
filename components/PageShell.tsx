import { AppHeader } from "./AppHeader";
import { LearningNavigator } from "./LearningNavigator";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/images/home-background.png')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-gradient-to-b from-white/70 via-paper/75 to-paper"
      />
      <div className="relative z-10">
        <AppHeader />
        <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 sm:px-6 sm:py-8 xl:pr-64">
          {children}
        </main>
        <LearningNavigator />
      </div>
    </div>
  );
}
