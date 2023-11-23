import { FC } from "react";
import { Subject } from "@/types";

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
import SubjectPageIdModal from "../@modal/(.)subject/[id]/page";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SubjectTableProps {
  subjectInfo?: Subject[];
}

const SubjectTable: FC<SubjectTableProps> = ({ subjectInfo }) => {
  return (
    <Card className="my-auto w-full">
      <CardHeader className="space-y-2">
        <CardTitle>Subject</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[350px]">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Subject Name</TableHead>
                <TableHead>Strand</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjectInfo?.map((sec) => (
                <TableRow key={sec.id}>
                  <TableCell>{sec.subjectName}</TableCell>
                  <TableCell>{sec.strandId}</TableCell>
                  <TableCell>
                    <SubjectPageIdModal params={{ id: sec.id }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SubjectTable;
