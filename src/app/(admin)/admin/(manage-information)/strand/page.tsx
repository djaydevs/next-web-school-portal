"use client";

import { FC } from "react";

import AddStrandForm from "@/components/add-strand-form";

interface StrandPageProps {}

const StrandPage: FC<StrandPageProps> = ({}) => {
  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Strand</h2>
        <p className="text-muted-foreground">
          Manage strand as an admin/registrar.
        </p>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <AddStrandForm />
      </div>
    </div>
  );
};

export default StrandPage;
