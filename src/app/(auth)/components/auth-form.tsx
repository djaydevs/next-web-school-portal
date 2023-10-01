"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleSignInButton } from "@/components/google-auth";

interface authFormProps extends React.HTMLAttributes<HTMLDivElement> {
  csrfToken?: string;
}

export function AuthForm({ className, ...props }: authFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/student/dashboard");
    } else {
      console.log("Error: ", signInResponse);
      setError("Your email or password is incorrect!");
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <GoogleSignInButton />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with email
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-3">
          <div className="grid gap-2">
            {error && (
              <span className="p-2 mb-2 text-white bg-red-500">{error}</span>
            )}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} className="my-4 p-4">
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
