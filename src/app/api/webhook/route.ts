import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Webhook for the CSV file
export async function POST(req: NextRequest) {
    try {
      const data = await req.json(); 
      console.log(data);

      if (!data || !Array.isArray(data.rows)) {
        throw new Error("Data is not an array or does not contain 'rows'.");
      }

      const createInput = data.rows.map((row: any) => {        
        return {
          lrnNumber: row['LRN NUMBER (2)'],
          sex: row['SEX (3)'],
          age: parseInt(row['AGE (4)'], 10),
          lastName: row['Last Name (5)'],
          firstName: row['First Name (6)'],
          middleName: row['Middle Name (7)'] || null,
          dateOfBirth:  new Date(row['DOB (8)']),
          gender: row['SEX M/F) (9)'] || 'Unknown',
          genAveJHS: parseFloat(row['GEN Ave. JHS (10)']),
          nameOfJHS: row['Name of JHS (11)'],
          address: row['Address (12)'],
          jhsCompleted: parseInt(row['SY JHS Completed'], 10),
          province: row['Place of Birth: Province'] || null,
          town: row['Place of Birth: Town'] || null,
          barangay: row['Place of Birth: Barangay'] || null,
          parentGuardianName: row['Parent/Guardian (17)'] || null,
          parentGuardianAddress: row['Address of Parent/ Guardian'] || null,
          parentGuardianOccupation: row['Occupation'] || null,
          workImmersion: row['Work Immersion'] || null,
        };
      });

      // Create the records using Prisma createMany
      const createdProfiles = await prisma.studentProfile.createMany({
        data: createInput,
      });     

      return NextResponse.json(createdProfiles, { status: 200 });
  
    } catch ( error: any ) {
      console.error( error );
      return NextResponse.json({ message: error.message, stack: error.stack  }, { status: 500 })      
    }
}