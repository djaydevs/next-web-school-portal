"use client";

import { FC } from "react";

import AddSchoolYearForm from "@/components/add-schoolyear-form";

interface SchoolYearPageProps {}

const SchoolYearPage: FC<SchoolYearPageProps> = ({}) => {
  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Manage School Year
        </h2>
        <p className="text-muted-foreground">
          Manage school year as an admin/registrar.
        </p>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <AddSchoolYearForm />
      </div>
    </div>
  );
};

export default SchoolYearPage;
