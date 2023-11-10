"use client";

import { FC } from "react";

import VerifyForm from "@/components/verify-form";

interface VerifyUserIdPageProps {
  params: {
    id: string;
  };
}

const VerifyUserIdPage: FC<VerifyUserIdPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div className="m-auto h-full w-2/5">
      <VerifyForm params={{ id }} />
    </div>
  );
};

export default VerifyUserIdPage;
