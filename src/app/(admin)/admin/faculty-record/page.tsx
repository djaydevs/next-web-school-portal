"use client";

import { FC } from "react";
import UseCSV from "@usecsv/react";
import * as XLSX from "xlsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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

    const [facultysData, setFacultysData] = useState<Faculty[]>([]);

    useEffect(() => {
      if (faculties) {
        setFacultysData(faculties);
      }
    }, [faculties]);

    const handleDownload = () => {
      const rows = facultysData.map((faculties) => ({
        empNumber: faculties.facultyProfile?.empNumber,
        lastName: faculties.facultyProfile?.lastName,
        firstName: faculties.facultyProfile?.firstName,
        middleName: faculties.facultyProfile?.middleName,
        age: faculties.facultyProfile?.age,
        sex: faculties.facultyProfile?.sex,
        civilStatus: faculties.facultyProfile?.civilStatus,
        yearsInMJA: faculties.facultyProfile?.yearsInMJA,
        otherSchool: faculties.facultyProfile?.otherSchool,
        dateIssued: faculties.facultyProfile?.dateIssued,
        dateValid: faculties.facultyProfile?.dateValid,
        licenseNumber: faculties.facultyProfile?.licenseNumber,
        profOrg: faculties.facultyProfile?.profOrg,
        degree: faculties.facultyProfile?.degree,
        major: faculties.facultyProfile?.major,
        minor: faculties.facultyProfile?.minor,
        section: faculties.facultyProfile?.section[0]?.sectionName,
        subject: faculties.facultyProfile?.subjects[0]?.subjectName,
      }));

      // Create workbook and worksheet
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);

      XLSX.utils.sheet_add_aoa(worksheet, [
        ["Employee Number", "Last Name", "First Name", "Middle Name", "Age", "Sex", "Civil Status", 
        "Years in MJA", "Other School", "Date Issued", "Date Valid",
        "License Number", "Professional Organization", "Degree", "Major", "Minor", "Section", "Subject"],
      ]);

      // Auto-size columns
      const ref = worksheet['!ref'];
      if (ref) {
        const headerRange = XLSX.utils.decode_range(ref);

        for (let col = headerRange.s.c; col <= headerRange.e.c; ++col) {
          worksheet['!cols'] = worksheet['!cols'] || [];

          // Set a default width for the column
          worksheet['!cols'][col] = worksheet['!cols'][col] || { width: 15 };

          // Adjust column width based on header length
          const headerCell = worksheet[XLSX.utils.encode_cell({ r: headerRange.s.r, c: col })];
          if (headerCell && typeof headerCell.v === 'string') {
            const colInfo = worksheet['!cols'][col]!;
            colInfo.width = colInfo.width || 15; // Default width
            if (headerCell.v.length > colInfo.width) {
              colInfo.width = headerCell.v.length + 2; // Add some padding
            }
          }

          // Adjust column width based on data length
          for (let row = headerRange.s.r + 1; row <= headerRange.e.r; ++row) {
            const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })];
            if (cell && cell.v && typeof cell.v === 'string') {
              const colInfo = worksheet['!cols'][col]!;
              colInfo.width = colInfo.width || 15; // Default width
              if (cell.v.length > colInfo.width) {
                colInfo.width = cell.v.length + 2; // Add some padding
              }
            }
          }
        }
      }

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Student");

      // Save the workbook to a file
      XLSX.writeFile(workbook, "FacultyRecord.xlsx", { compression: true });
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
          <Button onClick={handleDownload}>
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
