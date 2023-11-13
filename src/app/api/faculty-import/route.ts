import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Webhook for the Faculty CSV file
export async function POST(req: NextRequest) {
    try {
      const data = await req.json(); 
      console.log(data);

      if (!data || !Array.isArray(data.rows)) {
        throw new Error("Data is not an array or does not contain 'rows'.");
      }

      const createInput = data.rows.map((row: any) => {        
        return {
          empNumber: row['Employee Number'],
          lastName: row['Last Name'],
          firstName: row['First Name'],
          middleName: row['M.I'] || null,
          age: parseInt(row['Age'], 10),
          sex: row['Sex'],
          civilStatus: row['Civil Status'] || 'Unknown',
          yearsInMJA: row['Years in MJA'],
          otherSchool: parseInt(row['Other Schools']),
          dateIssued: new Date(row['Date_Issued']).toISOString(),
          dateValid: new Date(row['Valid_Until']).toISOString(),
          licenseNumber: parseInt(row['License Number'], 10),
          profOrg: row['Professional Organization'],
          degree: row['Degree'],
          major: row['Major'],
          minor: row['Minor'],
        };
      });

      console.log(createInput)

      //Create the records using Prisma createMany
      const importFaculty = await prisma.facultyProfile.createMany({
        data: createInput,
      });     

      return NextResponse.json( importFaculty, { status: 200 });
  
    } catch ( error: any ) {
      console.error( error );
      return NextResponse.json({ message: error.message, stack: error.stack  }, { status: 500 })      
    }
}