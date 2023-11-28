import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface StudentProps {
  params: {
    studentId: string;
  }
}

// Viewing of the grades
export async function GET(req: NextRequest, context: StudentProps) {
  try {
    const { params } = context;

    //return the grades, subject and semester
    const studentGrades = await prisma.studentProfile.findUnique({
      where: { userId: params.studentId }, // model of user: id in the params
      include: {
        grades: {
          select: {
            firstQuarter: true,
            secondQuarter: true,
            finalGrade: true,
            remarks: true,
            subject: {
              select: {
                subjectName: true,
              },
            },
            section: {
              select: {
                schoolYear: {
                  select: {
                    semester: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!studentGrades) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(studentGrades, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//Encoding of grades
export async function POST(req: NextRequest, context: StudentProps) {
  try {
    const { params } = context;
    const data = await req.json();

    //For encoding a single set of grades
    const {
      studentId,
      section,
      subjectId,
      firstQuarter,
      secondQuarter,
      finalGrade,
    } = data;

    // Check if grades already exist for the student, section, and subject
    const existingGrades = await prisma.grades.findFirst({
      where: {
        studentId: studentId,
        section: {
          some: {
            id: section, // Filter based on the section's ID
          },
        },
        subjectId,
      },
    });

    if (existingGrades) {
      // Grades already exist, update them
      const updatedGrades = await prisma.grades.update({
        where: { id: existingGrades.id },
        data: {
          secondQuarter,
          //finalGrade: (firstQuarter + secondQuarter) / 2,
          //remarks: finalGrade < 74 ? "FAILED" : "PASSED",
        },
      });

      // Fetch the updated grades from the database
      const updatedGradesFromDB = await prisma.grades.findUnique({
        where: { id: existingGrades.id },
      });

      // Ensure that updatedGradesFromDB and its relevant fields are not null
      if (
        updatedGradesFromDB &&
        updatedGradesFromDB.firstQuarter !== null &&
        updatedGradesFromDB.secondQuarter !== null
      ) {
        // Calculate finalGrade based on firstQuarter and updated secondQuarter
        const calculatedFinalGrade =
          (Number(updatedGradesFromDB.firstQuarter) +
            Number(updatedGradesFromDB.secondQuarter)) /
          2;

        // Update the finalGrade in the database
        await prisma.grades.update({
          where: { id: existingGrades.id },
          data: {
            finalGrade: calculatedFinalGrade,
            remarks: calculatedFinalGrade < 74 ? "FAILED" : "PASSED",
          },
        });

        return NextResponse.json(
          { message: "Grades updated successfully" },
          { status: 200 }
        );
      } else {
        // Handle the case where any required field is null
        return NextResponse.json(
          { message: "Error fetching or calculating grades from the database" },
          { status: 500 }
        );
      }

    } else {
      // Grades don't exist, create new grades for the first quarter
      const newGrades = await prisma.grades.create({
        data: {
          firstQuarter,
          section: { connect: { id: section } },
          subjectId,
          studentId: studentId,
        },
      });

      return NextResponse.json({ message: 'Grades created successfully' }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
