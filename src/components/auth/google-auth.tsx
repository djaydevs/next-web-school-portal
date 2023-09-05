"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ToastProvider } from "../ui/toast";

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
      });
    }

    if (status === "loading") {
      setIsLoading(true);
    }

    if (status === "authenticated") {
      if (session?.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      }
      if (session?.user.role === "FACULTY") {
        router.push("/faculty/dashboard");
      }
      if (session?.user.role === "STUDENT") {
        router.push("/student/dashboard");
      }
    }
  }, [router, session, status]);

  return (
    <Button
      onClick={() => signIn("google")}
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
