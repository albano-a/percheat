import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifesto | SnippetVault",
  description: "The story behind SnippetVault.",
};

export default function ManifestoPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-24 px-6">
      <div className="max-w-3xl w-full space-y-24">
        {/* Header Section - The Hook */}
        <section className="space-y-8">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-foreground">
            Manifesto
          </h1>
          <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-light">
            I once needed a place to store my code. Not massive folders, not
            sprawling projects... just snippets.
          </p>
        </section>

        {/* The Problem & The Decision */}
        <section className="space-y-12">
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>
              I searched everywhere, endlessly... found nothing that satisfied
              me. Ugly interfaces, programs that wouldn't even open, websites
              built for corporations rather than real users.
            </p>
            <p className="text-foreground font-medium text-2xl">
              Fed up... I decided to build my own.
            </p>
          </div>
        </section>

        {/* The Solution - Core Values */}
        <section className="py-12 border-y border-border/40">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-center text-center">
            <span className="text-3xl md:text-5xl font-mono font-bold text-foreground tracking-tighter">
              Simple.
            </span>
            <span className="text-3xl md:text-5xl font-mono font-bold text-foreground tracking-tighter">
              Elegant.
            </span>
            <span className="text-3xl md:text-5xl font-mono font-bold text-foreground tracking-tighter">
              Reliable.
            </span>
          </div>
        </section>

        {/* The Invitation */}
        <section className="space-y-10">
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              This site was born from that need.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              If you want a space to store your code with easy access, cloud
              synchronization, a clean interface, and seamless GitHub Gist
              integration...
            </p>
          </div>

          <p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            This is your place too.
          </p>
        </section>
      </div>
    </main>
  );
}
