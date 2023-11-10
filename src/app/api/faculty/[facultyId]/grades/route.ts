import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface contextProps {
  params: {
    facultyId: string;
  };
}

export async function POST(req: NextRequest, context: contextProps) {
  try {
    const { params } = context;
    const data = await req.json();

    //For encoding a grades
    const result = [];
    for (const item of data) {
      const {
        section,
        subjectId,
        studentId,
        grades: {
          firstQuarter,
          secondQuarter,
          finalGrade,
        },
      } = item;

      // Check if grades already exist for the student, section, and subject
      const existingGrades = await prisma.grades.findFirst({
        where: {
          studentId,
          section: {
            some: {
              id: section, // Filter based on the section's ID
            },
          },
          subjectId,
          facultyId: params.facultyId, // Consider the facultyId parameter
        },
      });

      if (existingGrades) {
        // Grades already exist, update them
        const updatedGrades = await prisma.grades.update({
          where: { id: existingGrades.id },
          data: {
            secondQuarter,
            finalGrade: (firstQuarter + secondQuarter) / 2,
            remarks: finalGrade < 74 ? "FAILED" : "PASSED",
          },
        });

        result.push(updatedGrades);
      } else {
        // Grades don't exist, create new grades for the first quarter
        const newGrades = await prisma.grades.create({
          data: {
            firstQuarter,
            section: { connect: { id: section } },
            subjectId,
            studentId,
            facultyId: params.facultyId,
          },
        });
        result.push(newGrades);
      }
    }
    return NextResponse.json({ message: 'Grades encoded successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}