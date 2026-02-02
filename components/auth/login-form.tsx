"use client";

import { useState } from "react";
import { account } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-provider";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { checkAuth } = useAuth();

  const handleLogin = async () => {
    setError(null);
    try {
      setIsLoading(true);
      await account.createEmailPasswordSession({
        email: email,
        password: password,
      });
      await checkAuth(); // Update global auth state
      router.push("/dashboard"); // Redirect after successful login
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.message || "Invalid credentials. Please try again.");
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {/* Optional: Add Forgot Password link here later */}
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent font-mono text-sm"
          />
        </div>
        {error && (
          <div className="text-sm text-red-500 font-medium text-center">
            {error}
          </div>
        )}
      </div>

      <Button
        className="w-full rounded-full font-medium"
        size="lg"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Log In"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-foreground hover:underline underline-offset-4"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
