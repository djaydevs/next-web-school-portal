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
      const body = await req.json();

      const faculty = await prisma.facultyProfile.findUnique({ where: { id: body.facultyId } });
      const gradeLevel = await prisma.gradeLevel.findUnique({ where: { id: body.gradeLevelId } });
      const section = await prisma.section.findUnique({ where: { id: body.sectionId } });
      const subject = await prisma.subject.findUnique({ where: { id: body.subjectId } });
      
      // Assign faculty to a grade level
      await prisma.gradeLevel.update({
        where: { id: body.gradeLevelId },
        data: { faculty: { connect: { id: body.facultyId } } },
      });
      
      // Assign faculty to a section
      await prisma.section.update({
        where: { id: body.sectionId },
        data: { faculty: { connect: { id: body.facultyId } } },
      });
      
      // Assign faculty to a subject
      await prisma.subject.update({
        where: { id: body.subjectId },
        data: { faculty: { connect: { id: body.facultyId } } },
      });      
    
        return NextResponse.json({ message: "Successfully assign"}, { status: 200});
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });      
    }
}