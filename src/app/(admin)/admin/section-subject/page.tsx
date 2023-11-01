"use client";

import { FC } from "react";

import AddSectionForm from "@/components/add-section-form";
import AddSubjectForm from "@/components/add-subject-form";
import AddSchoolYearForm from "@/components/add-schoolyear-form";
import AddStrandForm from "@/components/add-strand-form";

interface SectionandSubjectPageProps {}

const SectionandSubjectPage: FC<SectionandSubjectPageProps> = ({}) => {
  return (
    <div className="space-x-4 px-4 md:flex">
      <AddSchoolYearForm />
      <AddStrandForm />
      <AddSubjectForm />
      <AddSectionForm />
    </div>
  );
};

export default SectionandSubjectPage;
