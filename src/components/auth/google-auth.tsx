"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    signIn("google", {
      callbackUrl: "http://localhost:3000/student/dahboard",
    });
  };

  return (
    <Button
      onClick={handleClick}
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
