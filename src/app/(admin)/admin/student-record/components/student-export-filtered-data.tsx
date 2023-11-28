import React from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Student } from "@/types";

interface StudentExportFilteredDataProps {
    filteredData: Student[]; // Adjust the type based on your actual data structure
}

const StudentExportFilteredData: React.FC<StudentExportFilteredDataProps> = ({ filteredData }) => {
    console.log('Filtered Data:', filteredData);
    const handleExport = () => {
      // Ensure that filteredDataArray is not empty before proceeding
      if (filteredData.length > 0) {
        // Create workbook and worksheet
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
            
            // Auto-size columns
            const ref = worksheet['!ref'];
            if (ref) {
            // ... (rest of your column auto-sizing logic)
            }
        
            // Add the worksheet to the workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Student');
        
            // Save the workbook to a file
            XLSX.writeFile(workbook, 'StudentRecord.xlsx', { compression: true });
        } else {
            console.warn('Filtered data array is empty. No data to export.');
        }
    };
  return (
    <Button onClick={handleExport}>
      Export Filtered Data
    </Button>
  );
};

export default StudentExportFilteredData;
