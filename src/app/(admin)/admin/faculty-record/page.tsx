"use client";

import { FC } from "react";
import UseCSV from "@usecsv/react";
import { useQuery } from "@tanstack/react-query";

import { fetchFaculty } from "@/hooks/getUsers";
import FacultyTable from "@/components/faculty-table";
import { SkeletonTable } from "@/components/loading";
import { columns } from "@/components/faculty-columns";
import { Faculty } from "@/types";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";

interface FacultyRecordPageProps {}

const FacultyRecordPage: FC<FacultyRecordPageProps> = ({}) => {
  const {
    data: faculties,
    isPending: isLoadingFacultyTable,
    isError: isErrorFetchingFaculties,
    error,
  } = useQuery<Faculty[]>({
    queryKey: ["faculties"],
    queryFn: async () => fetchFaculty(),
  });

  const renderButton = (openModal: any) => {
    return (
      <Button onClick={openModal}>
        <Icons.FileUp className="mr-2" />
        Import Data
      </Button>
    );
  };

  if (isErrorFetchingFaculties) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Manage Faculty Record
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of faculty records you can manage as an
          admin/registrar.
        </p>
      </div>
      <div className="flex">
        <div className="flex w-full gap-3">
          <UseCSV
            importerKey="d82e0f09-3989-45db-a14b-136267d2815f"
            user={{ userId: 123456 }}
            render={(openModal) => renderButton(openModal)}
          />
          <Button>
            <Icons.FileDown className="mr-2" />
            Export Data
          </Button>
        </div>
        <div className="flex w-full justify-end">
          <Button variant="secondary">
            <Icons.FilePlus2 className="mr-2" />
            Add Faculty
          </Button>
        </div>
      </div>
      {isLoadingFacultyTable ? (
        <SkeletonTable />
      ) : (
        <FacultyTable columns={columns} data={faculties} />
      )}
    </div>
  );
};

export default FacultyRecordPage;
