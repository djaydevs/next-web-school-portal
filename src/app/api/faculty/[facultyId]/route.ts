import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface contextProps {
    params: {
      facultyId: string
    }
  };

//Assign the faculty to the selected section and subject
export async function PATCH(req: NextRequest, context: contextProps) {
    try {
        const { params } = context
        const body = await req.json()
        
        await prisma.facultyProfile.update({
          where: { id: params.facultyId},
          data: {
            section: { connect: { id: body.sectionId } },
            subjects: { connect: { id: body.subjectId } },
            gradeLevel: { connect: { id: body.gradeLevelId } },
          },
        });
    
        return NextResponse.json({ message: "Successfully assign"}, { status: 200});
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });      
    }
}