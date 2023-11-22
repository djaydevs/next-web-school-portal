"use client";

import { FC } from "react";

import AddSectionForm from "@/components/add-section-form";

interface SectionPageProps {}

const SectionPage: FC<SectionPageProps> = ({}) => {
  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Section</h2>
        <p className="text-muted-foreground">
          Manage section as an admin/registrar.
        </p>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <AddSectionForm />
      </div>
    </div>
  );
};

export default SectionPage;
