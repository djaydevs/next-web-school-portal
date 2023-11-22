"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { Section } from "@/types";

import AddSectionForm from "@/components/add-section-form";
import { fetchSections } from "@/hooks/getInfos";
import { SkeletonTable } from "@/components/loading";
import SectionTable from "@/components/section-table";

interface SectionPageProps {}

const SectionPage: FC<SectionPageProps> = ({}) => {
  const {
    data: sections,
    isPending: isLoadingSections,
    isError: isErrorFetchingSections,
    error: sectionsError,
  } = useQuery<Section[]>({
    queryKey: ["sections"],
    queryFn: async () => fetchSections(),
  });

  if (isErrorFetchingSections) {
    return <span>Error: {sectionsError.message}</span>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Section</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of section you can manage as a portal
          admin/registrar.
        </p>
      </div>
      <div className="flex">
        <AddSectionForm />
      </div>
      {isLoadingSections ? (
        <SkeletonTable />
      ) : (
        <SectionTable sectionInfo={sections} />
      )}
    </div>
  );
};

export default SectionPage;
