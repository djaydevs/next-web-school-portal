"use client";

import { FC } from "react";

import AddSectionForm from "@/components/add-section-form";
import AddSubjectForm from "@/components/add-subject-form";
import AddSchoolYearForm from "@/components/add-schoolyear-form";
import AddStrandForm from "@/components/add-strand-form";

interface SectionandSubjectPageProps {}

const SectionandSubjectPage: FC<SectionandSubjectPageProps> = ({}) => {
  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Manage Section and Subject
        </h2>
        <p className="text-muted-foreground">
          Add and manage school year, strands, sections, and subjects as an
          admin/registrar.
        </p>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <AddSchoolYearForm />
        <AddStrandForm />
        <AddSubjectForm />
        <AddSectionForm />
      </div>
    </div>
  );
};

export default SectionandSubjectPage;
