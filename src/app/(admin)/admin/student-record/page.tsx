"use client";

import { FC } from "react";
import UseCSV from "@usecsv/react";
import * as XLSX from "xlsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { SkeletonTable } from "@/components/loading";
import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import StudentTable from "@/components/student-table";
import { columns } from "@/components/student-columns";
import { Student, studentSchema } from "@/types";
import { fetchStudent } from "@/hooks/getUsers";

interface StudentRecordPageProps {}

const StudentRecordPage: FC<StudentRecordPageProps> = ({}) => {
  const {
    data: students,
    isPending: isLoadingStudentTable,
    isError: isErrorFetchingStudents,
    error,
  } = useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: async () => fetchStudent(),
  });

  const renderButton = (openModal: any) => {
    return (
      <Button onClick={openModal}>
        <Icons.FileUp className="mr-2" />
        Import Data
      </Button>
    );
  };

  const [studentsData, setStudentsData] = useState<Student[]>([]);

  useEffect(() => {
    if (students) {
      setStudentsData(students);
    }
  }, [students]);

  const handleExport = () => {
    const rows = studentsData.map((student) => ({
      lrn: student.studentProfile?.lrnNumber,
      lastname: student.studentProfile?.lastName,
      firstname: student.studentProfile?.firstName,
      middlename: student.studentProfile?.middleName,
      sex: student.studentProfile?.sex,
      age: student.studentProfile?.age,
      dateOfBirth: student.studentProfile.dateOfBirth,
      address: student.studentProfile?.address,
      parent: student.studentProfile?.parentGuardianName,
      parentWork: student.studentProfile?.parentGuardianOccupation,
      parentAddress: student.studentProfile?.parentGuardianAddress,
      gradeLevel: student.studentProfile?.gradeLevel?.gradeLevel,
      section: student.studentProfile?.section?.sectionName,
      strand: student.studentProfile?.strand?.strandCode,
    }));

    // Create workbook and worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.sheet_add_aoa(worksheet, [
      ["LRN Number", "Last Name", "First Name", "Middle Name", "Sex", "Age", "Date of Birth", 
      "Address", "Parent/Guardian's Name", "Parent/Guardian's Occupation", "Parent/Guardian's Address",
      "Grade Level", "Section", "Strand"],
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
    XLSX.writeFile(workbook, "StudentRecord.xlsx", { compression: true });
};
  
  if (isErrorFetchingStudents) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4 px-4 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Manage Student Record
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of student records you can manage as an
          admin/registrar.
        </p>
      </div>
      <div className="flex">
        <div className="flex w-full gap-3">
          <UseCSV
            importerKey="d4dd9a93-3546-44f6-9cbf-4ba978759442"
            user={{ userId: 12345 }}
            render={(openModal) => renderButton(openModal)}
          />
          <Button onClick={handleExport}>
            <Icons.FileDown className="mr-2" />
            Export Data
          </Button>
        </div>
        <div className="flex w-full justify-end">
          <Button variant="secondary">
            <Icons.FilePlus2 className="mr-2" />
            Add Student
          </Button>
        </div>
      </div>
      {isLoadingStudentTable ? (
        <SkeletonTable />
      ) : (
        <StudentTable columns={columns} data={students} />
      )}
    </div>
  );
};

export default StudentRecordPage;
