import { FC } from "react";
import { Strand } from "@/types";

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
import StrandPageIdModal from "../@modal/(.)strand/[id]/page";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StrandTableProps {
  strandInfo?: Strand[];
}

const StrandTable: FC<StrandTableProps> = ({ strandInfo }) => {
  return (
    <Card className="my-auto w-full">
      <CardHeader className="space-y-2">
        <CardTitle>Strand</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[350px]">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Strand Code</TableHead>
                <TableHead>Strand Name</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {strandInfo?.map((str) => (
                <TableRow key={str.id}>
                  <TableCell>{str.strandCode}</TableCell>
                  <TableCell>{str.strandName}</TableCell>
                  <TableCell>
                    <StrandPageIdModal params={{ id: str.id }} />
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

export default StrandTable;
