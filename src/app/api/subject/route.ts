import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// Create a Subject per Strand
export async function POST(req: NextRequest) {
    try {
      const body = await req.json();

      const addSubject = await prisma.subject.create({
        data: {
          subjectCode: body.subjectCode,
          subjectName: body.subjectName,
          strandId: body.strandId,
        },
      });
  
      return NextResponse.json(addSubject, { status: 200 });
  
    } catch ( error: any ) {
      return NextResponse.json({ message: error.message }, { status: 500 })      
    }
}