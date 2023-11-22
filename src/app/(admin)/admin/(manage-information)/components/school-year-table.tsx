import { FC } from "react";
import { format, isValid } from "date-fns";
import { SchoolYear } from "@prisma/client";

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
import SchoolYearPageIdModal from "../@modal/(.)school-year/[id]/page";

interface SchoolYearTableProps {
  schoolYearInfo?: SchoolYear[];
}

const SchoolYearTable: FC<SchoolYearTableProps> = ({ schoolYearInfo }) => {
  return (
    <Card className="my-auto w-full">
      <CardHeader className="space-y-2">
        <CardTitle>School Year</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schoolYearInfo?.map((sy) => (
              <TableRow key={sy.id}>
                <TableCell>
                  {isValid(new Date(sy?.from))
                    ? format(new Date(sy?.from), "EEEE, MMMM do, yyyy")
                    : "Invalid date"}
                </TableCell>
                <TableCell>
                  {isValid(new Date(sy?.to))
                    ? format(new Date(sy?.to), "EEEE, MMMM do, yyyy")
                    : "Invalid date"}
                </TableCell>
                <TableCell>
                  {sy.semester === 1 ? "1st Semester" : "2nd Semester"}
                </TableCell>
                <TableCell>
                  <SchoolYearPageIdModal schoolYearInfo={sy || undefined} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SchoolYearTable;
