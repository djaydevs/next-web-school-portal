import { FC } from "react";
import { Section } from "@/types";

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
import SectionPageIdModal from "../@modal/(.)section/[id]/page";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SectionTableProps {
  sectionInfo?: Section[];
}

const SectionTable: FC<SectionTableProps> = ({ sectionInfo }) => {
  return (
    <Card className="my-auto w-full">
      <CardHeader className="space-y-2">
        <CardTitle>Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[350px]">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Section Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sectionInfo?.map((sec) => (
                <TableRow key={sec.id}>
                  <TableCell>{sec.sectionName}</TableCell>
                  <TableCell>{sec.room}</TableCell>
                  <TableCell>
                    <SectionPageIdModal params={{ id: sec.id }} />
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

export default SectionTable;
