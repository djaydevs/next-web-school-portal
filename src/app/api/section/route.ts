import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create a Section and Strand
export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
  
      const add = await prisma.gradeLevel.create({
        data: {
          gradeLevel: body.gradeLevel,
          strand: {
            create: {
              strandCode: body.strandCode,
              strandName: body.strandName,
              section: {
                create: {
                  sectionName: body.sectionName,
                },
              }, 
            },   
          },                            
        },
      });
  
      return NextResponse.json(add, { status: 200 });
  
    } catch ( error: any ) {
      return NextResponse.json({ message: error.message }, { status: 500 })      
    }
}