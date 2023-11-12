"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import VerifyForm from "@/components/verify-form";

interface VerifyUserIdPageProps {
  params: {
    id: string;
  };
}

const VerifyUserIdPage: FC<VerifyUserIdPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div className="m-auto flex h-screen w-full flex-col items-center justify-center gap-3 p-4 md:w-1/2  lg:w-2/6">
      <div className="relative text-lg font-medium">
        <Link
          href="/"
          className="flex flex-col items-center text-2xl font-bold tracking-tight"
        >
          <div className="me-2 h-20 w-20">
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
      <VerifyForm params={{ id }} />
    </div>
  );
};

export default VerifyUserIdPage;
