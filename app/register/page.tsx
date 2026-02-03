import { RegisterForm } from "@/components/auth/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - SnippetVault",
  description: "Create your SnippetVault account.",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tighter text-foreground">
            Join SnippetVault
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Create your sanctuary for code.
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
