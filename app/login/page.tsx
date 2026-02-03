import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - SnippetVault",
  description: "Access your SnippetVault.",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tighter text-foreground">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Enter your sanctuary.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
