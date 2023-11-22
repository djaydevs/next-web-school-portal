import { NextRequest,  NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

interface StudentProps {
    params: {
      studentId: string;
    }
  }
  

export async function PUT(req: NextRequest, context: StudentProps) {
    try {
        const { params} = context;
        const body = await req.json();

        // Find the student with the given ID along with related section, school year, and grade level
        const student = await prisma.studentProfile.findUnique({
            where: { userId: params.studentId },
            include: {
                gradeLevel: true,
            },
        });

        if (!student) {
            return NextResponse.json({ error: 'Student not found' });
        }

        // Find the ID of the existing grade level with gradeLevel value 12
        const targetGradeLevelId = await prisma.gradeLevel.findUnique({
            where: { gradeLevel: 12 }, // Adjust this condition based on your data
            select: { id: true },
        });

        if (!targetGradeLevelId) {
            return NextResponse.json({ error: 'Target grade level not found' });
        }

        // Disconnect the current grade level
        await prisma.studentProfile.update({
            where: { userId: params.studentId },
            data: {
                gradeLevel: {
                    disconnect: true,
                },
            },
        });

        // Connect to the target grade level
        const newGradeLevel = await prisma.studentProfile.update({
            where: { userId: params.studentId },
            data: {
                // Add other properties you want to update
                gradeLevel: {
                    connect: {
                        id: targetGradeLevelId.id,
                    },
                },
            },
        });        
        
        const newSection = await prisma.studentProfile.update({
            where: { userId:  params.studentId},
            data: {
                sectionId: body.sectionId
                // Add other properties you want to update
                // section: {
                //     connect: {
                //         id: body.section.id,
                //     },
                // },
            },
        });

        const enrollmentId = await prisma.studentProfile.findUnique({
            where: { userId: params.studentId },
            include: {
                enrollment: true,
            },
        });
        
        if (enrollmentId && enrollmentId.enrollment.length > 0) {
            const enrollmentRecord = enrollmentId.enrollment[0];
        
            // Create a new enrollment record
            const newEnrollment = await prisma.enrollment.update({
                where: { id: enrollmentRecord.id },
                data: {
                    status: "Enrolled",
                },
            });
        };

        return NextResponse.json("Student Succesfully Enrolled!", { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
