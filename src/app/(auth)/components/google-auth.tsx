"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

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
        router.push("/admin");
      }
      if (session?.user.role === "FACULTY") {
        router.push("/faculty");
      }
      if (session?.user.role === "STUDENT") {
        router.push("/student");
      }
    }
  }, [router, session, status, toast]);

  return (
    <Button
      onClick={() => signIn("google")}
      variant="outline"
      type="button"
      disabled={isLoading}
      className="text-md p-4 font-semibold"
    >
      {isLoading ? (
        <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.Google className="mr-2 h-4 w-4" />
      )}{" "}
      Continue with Google
    </Button>
  );
}
