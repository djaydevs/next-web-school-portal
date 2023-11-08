import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GoogleSignInButton } from "@/components/google-auth";

export const metadata: Metadata = {
  title: "Sign In | Mary Josette Academy",
  description: "Sign in form for Mary Josette Academy",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-brown-500">
            <Image
              priority
              fill
              src="/signin-image.webp"
              alt="Hero Image"
              style={{ objectFit: "cover" }}
              className="hero-image"
            />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link
              href="/"
              className="flex-center text-2xl font-bold tracking-tight"
            >
              <div className="me-2 h-14 w-14">
                <Image
                  priority
                  width="100"
                  height="100"
                  quality={100}
                  src="/mja-logo.png"
                  alt="Logo"
                />
              </div>
              Mary Josette Academy
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Mary Josette Academy aims to...&rdquo;
              </p>
              {/* <footer className="text-sm">Sofia Davis</footer> */}
            </blockquote>
          </div>
        </div>
        <div className="py-24 md:p-8">
          <div className="m-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <div className="mx-auto h-20 w-20 lg:hidden">
                <Link href="/">
                  <Image
                    priority
                    width="100"
                    height="100"
                    quality={100}
                    src="/mja-logo.png"
                    alt="Logo"
                  />
                </Link>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
            </div>
            <GoogleSignInButton />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
