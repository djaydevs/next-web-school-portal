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

        const student = await prisma.studentProfile.findUnique({ where: { id: body.studentId} });
        
        const sectionIds = body.sectionIds; // an array of section IDs
        const gradeLevelIds = body.gradeLevelIds; // an array of grade level IDs
        const strandIds = body.strandIds; // an array of strand IDs
        
        // Assign student to a section
        await prisma.section.update({
            where: { id: sectionIds },
            data: { student: { connect: { id: body.studentId } } },
        });
        
        // Assign student to a gradeLevel
        await prisma.gradeLevel.update({
            where: { id: gradeLevelIds },
            data: { student: { connect: { id: body.studentId } } },
        });   

        // Assign student to a strand
        await prisma.strand.update({
            where: { id: strandIds },
            data: { student: { connect: { id: body.studentId } } },
        });   
    
        return NextResponse.json({ message: "Successfully assign"}, { status: 200});
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });      
    }
}