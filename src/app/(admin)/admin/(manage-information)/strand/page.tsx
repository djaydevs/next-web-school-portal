"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { Strand } from "@/types";

import AddStrandForm from "@/components/add-strand-form";
import { fetchStrands } from "@/hooks/getInfos";
import { SkeletonTable } from "@/components/loading";
import StrandTable from "@/components/strand-table";

interface StrandPageProps {}

const StrandPage: FC<StrandPageProps> = ({}) => {
  const {
    data: strands,
    isPending: isLoadingStrands,
    isError: isErrorFetchingStrands,
    error: strandsError,
  } = useQuery<Strand[]>({
    queryKey: ["strands"],
    queryFn: async () => fetchStrands(),
  });

  if (isErrorFetchingStrands) {
    return <span>Error: {strandsError.message}</span>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Strand</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of strand you can manage as a portal
          admin/registrar.
        </p>
      </div>
      <div className="flex">
        <AddStrandForm />
      </div>
      {isLoadingStrands ? (
        <SkeletonTable />
      ) : (
        <StrandTable strandInfo={strands} />
      )}
    </div>
  );
};

export default StrandPage;
