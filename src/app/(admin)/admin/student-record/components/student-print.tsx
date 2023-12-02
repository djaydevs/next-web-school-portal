import React, { useRef } from "react";
import ReactToPrint, { PrintContextConsumer, useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
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

export interface ComponentToPrintProps {
    filteredDataRef: React.RefObject<any>; // Change 'any' to the appropriate type
}

interface StudentData {
    id: string;
    original: {
      studentProfile: {
        lrnNumber: string;
        lastName: string;
        firstName: string;
        middleName: string;
        gradeLevel: {
            gradeLevel: number;
        };
        strand: {
            strandCode: string;
        };
        section: {
            sectionName: string;
        };
      };
    };
  }

const ComponentToPrint: React.FC<ComponentToPrintProps> = ({ filteredDataRef }) => {
    
    return (
      <div>
        <Table>
        <TableCaption>Report: Student Record</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">LRN Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Grade Level</TableHead>
            <TableHead>Strand</TableHead>
            <TableHead>Section</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {filteredDataRef.current.map((row: StudentData, index: number) => (
            <TableRow key={index}>
                <TableCell className="font-medium">{row.original.studentProfile.lrnNumber}</TableCell>
                <TableCell>{`${row.original.studentProfile.lastName}, ${row.original.studentProfile.firstName} ${row.original.studentProfile.middleName}`}</TableCell>
                <TableCell>{row.original.studentProfile.gradeLevel?.gradeLevel}</TableCell>
                <TableCell>{row.original.studentProfile.strand?.strandCode}</TableCell>
                <TableCell>{row.original.studentProfile.section?.sectionName}</TableCell>
            </TableRow>
        ))}
        </TableBody>
        <TableFooter>
            <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            </TableRow>
        </TableFooter>
        </Table>
      </div>
    );
  }

  export default function PrintComponent({ filteredDataRef }: { filteredDataRef: React.RefObject<any> }) {
    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    
      const handlePrintButtonClick = () => {
        // Check if the componentRef has content before triggering print
        if (componentRef.current) {
          handlePrint();
        } else {
          console.warn("Component content is not ready for printing.");
        }
      };

  return (
    <>
      <div id="print_component">
        {/* Button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <Button><Icons.FilePlus2 className="mr-2" />Print</Button>}
          content={() => componentRef.current}
        >
          {/* Add PrintContextConsumer to get the print function */}
          <PrintContextConsumer>
            {({ handlePrint }) => (
            <Button onClick={handlePrintButtonClick}>
                Print
            </Button>
            )}
          </PrintContextConsumer>
        </ReactToPrint>

        {/* Component to be printed */}
        <div style={{ display: "none" }}>
          <ComponentToPrint filteredDataRef={filteredDataRef} />
        </div>
      </div>
    </>
  );
};
