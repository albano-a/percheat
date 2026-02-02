"use client";

import { useState } from "react";
import { account, ID } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-provider";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { checkAuth } = useAuth();

  const handleRegister = async () => {
    setError(null);
    try {
      setIsLoading(true);
      await account.create(ID.unique(), email, password, email);
      await account.createEmailPasswordSession(email, password);
      await checkAuth(); // Update global auth state
      router.push("/"); // Redirect after successful registration
    } catch (error: any) {
      console.error("Registration failed:", error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="developer@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent font-mono text-sm"
          />
          {error && (
            <div className="text-sm text-red-500 font-medium text-center">
              {error}
            </div>
          )}
        </div>
      </div>

      <Button
        className="w-full rounded-full font-medium"
        size="lg"
        onClick={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground hover:underline underline-offset-4"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
