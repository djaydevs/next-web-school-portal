"use client";

import { FC } from "react";

import AddSubjectForm from "@/components/add-subject-form";

interface SubjectPageProps {}

const SubjectPage: FC<SubjectPageProps> = ({}) => {
  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Subject</h2>
        <p className="text-muted-foreground">
          Manage subject as an admin/registrar.
        </p>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <AddSubjectForm />
      </div>
    </div>
  );
};

export default SubjectPage;
