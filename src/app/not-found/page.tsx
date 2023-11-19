import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8">
      <svg
        className=" h-12 w-12 text-red-500"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
      <h1 className="mt-6 text-4xl font-extrabold">404 - Page Not Found</h1>
      <p className="mt-2 text-base">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          aria-label="Home"
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
          )}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
