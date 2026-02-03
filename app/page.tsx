import { Button } from "@/components/ui/button";
import { FaArrowRight, FaCode, FaFingerprint, FaSearch } from "react-icons/fa";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center py-32 px-6">
        <h1 className="text-5xl md:text-8xl font-black text-foreground mb-8 tracking-tighter">
          Your Code.
          <br />
          <span className="text-muted-foreground">Everywhere.</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          The elegant sanctuary for your code snippets.{" "}
          <br className="hidden md:inline" /> Organized, private, and ready when
          you are.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="rounded-full cursor-pointer px-8 py-7 text-lg font-medium transition-transform hover:scale-105"
          >
            Get Started
            <FaArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full cursor-pointer px-8 py-7 text-lg text-muted-foreground hover:text-foreground hover:bg-transparent"
          >
            <Link href="/manifesto">Read the manifesto</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="space-y-4 border border-border p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <FaCode className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight">
              Purposeful Storage
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Forget cluttered folders. Tag, categorize, and find your logic in
              an instant. A home for your genius.
            </p>
          </div>

          <div className="space-y-4 border border-border p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <FaSearch className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight">
              Instant Recall
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Powerful search that understands your context. Filter by language,
              date, or tags effortlessly.
            </p>
          </div>

          <div className="space-y-4 border border-border p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <FaFingerprint className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight">
              Private by Design
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Your code stays yours. End-to-end encryption ensures your
              algorithms remain your competitive advantage.
            </p>
          </div>
        </div>
      </section>

      {/* Minimal CTA */}
      <section className="w-full py-32 px-6 text-center border-t border-border/50">
        <h2 className="text-3xl font-bold tracking-tight mb-6">
          Simplicity is the ultimate sophistication.
        </h2>
        <Button
          variant="outline"
          size="lg"
          className="rounded-full px-8 border-input"
        >
          Join Percheat
        </Button>
      </section>
    </div>
  );
}
