import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// Create a Subject per Strand
export async function POST(req: NextRequest) {
    try {
      const body = await req.json();

      const add = await prisma.subject.create({
        data: {
          subjectName: body.subjectName,
          strandId: body.strandId,
          semester: {
            create: {
              semesterInfo: body.semestre
            },
          },
          schoolYear: {
            create: {
              yearStart: body.yearStart,
              yearEnd: body.yearEnd,
            },   
          },                            
        },
      });
  
      return NextResponse.json(add, { status: 200 });
  
    } catch ( error: any ) {
      return NextResponse.json({ message: error.message }, { status: 500 })      
    }
}