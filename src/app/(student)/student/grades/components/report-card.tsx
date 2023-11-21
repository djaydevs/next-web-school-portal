import { FC } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "@/types";

interface ReportCardProps {
  studentInfo?: Student;
}

const ReportCard: FC<ReportCardProps> = ({ studentInfo }) => {
  return (
    <Card className="my-auto w-full">
      <CardHeader className="space-y-2">
        <CardTitle>Report Card Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Subjects</TableHead>
              <TableHead className="text-center">1st Quarter</TableHead>
              <TableHead className="text-center">2nd Quarter</TableHead>
              <TableHead className="text-center">Final Grade</TableHead>
              <TableHead className="text-center">Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentInfo?.studentProfile?.strand?.subjects.map(
              (sub) =>
                sub.grades?.map((grade) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">
                      {sub.subjectName}
                    </TableCell>
                    <TableCell className="text-center">
                      {grade.firstQuarter}
                    </TableCell>
                    <TableCell className="text-center">
                      {grade.secondQuarter}
                    </TableCell>
                    <TableCell className="text-center">
                      {grade.finalGrade}
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      {grade.remarks}
                    </TableCell>
                  </TableRow>
                )),
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              {/* <TableCell colSpan={4}>General Average</TableCell>
              {studentInfo?.studentProfile?.strand?.subjects.map(
                (sub) =>
                  sub.grades?.map((grade) => (
                    <TableCell className="font-medium" key={sub.id}>
                      {grade.genAverage}
                    </TableCell>
                  )),
              )} */}
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
