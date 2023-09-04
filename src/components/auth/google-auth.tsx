"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
      // if (session?.user.role === "ADMIN") {
      //   signIn("google", {
      //     callbackUrl: "http://localhost:3000/admin/dashboard",
      //   });
      // }
      // if (session?.user.role === "STUDENT") {
      //   signIn("google", {
      //     callbackUrl: "http://localhost:3000/student/dashboard",
      //   });
      // }
      // if (session?.user.role === "FACULTY") {
      //   signIn("google", {
      //     callbackUrl: "http://localhost:3000/faculty/dashboard",
      //   });
      // }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={loginWithGoogle}
      variant="outline"
      type="button"
      disabled={isLoading}
      className="p-4"
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}{" "}
      Continue with Google
    </Button>
  );
}
