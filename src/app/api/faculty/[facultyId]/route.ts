import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface contextProps {
  params: {
    facultyId: string
  }
}

// get faculty by id
export async function GET(req: NextRequest, context: contextProps) {
  try {
    const { params } = context;
    const faculty = await prisma.user.findUnique({
      where: {
        id: params.facultyId,
      }, include: {
        facultyProfile: {
          include: {
            section: true,
            subjects: true,
            gradeLevel: true,
          }
        },
      },
    });

    if (!faculty) {
      return NextResponse.json({ message: "No faculty found" }, { status: 404 });
    }

    return NextResponse.json(faculty, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//Assign the faculty to the selected section and subject
export async function PATCH(req: NextRequest, context: contextProps) {
  try {
    const { params } = context
    const body = await req.json();

    const faculty = await prisma.user.findUnique({
      where: {
        id: params.facultyId,
      },
      select: {
        facultyProfile: {
          select: {
            id: true,
          },
        },
      },
    });

    if (faculty && faculty.facultyProfile && faculty.facultyProfile.id) {
      const facultyProfileId = faculty.facultyProfile.id; // Extract the ID as a string
      // Use facultyProfileId in your Prisma queries    

      const subjectIds = body.subjectIds; // an array of subject IDs
      const sectionIds = body.sectionIds; // an array of section IDs
      const gradeLevelIds = body.gradeLevelIds; // an array of grade level IDs

      // Assign faculty to subjects
      // Assign faculty to subjects
      for (const subjectId of subjectIds) {
        await prisma.subject.update({
          where: { id: subjectId },
          data: { faculty: { connect: { id: facultyProfileId } } },
        });
      }

      // Assign faculty to sections
      for (const sectionId of sectionIds) {
        await prisma.section.update({
          where: { id: sectionId },
          data: { faculty: { connect: { id: facultyProfileId } } },
        });
      }

      // Assign faculty to grade levels
      for (const gradeLevelId of gradeLevelIds) {
        await prisma.gradeLevel.update({
          where: { id: gradeLevelId },
          data: { faculty: { connect: { id: facultyProfileId } } },
        });
      }

      // Now you can use the `faculty` object safely.
    } else {
      // Handle the case where `facultyId` or its properties are null.
      return NextResponse.json({ message: "FacultyId is null" }, { status: 200 });
    }

    return NextResponse.json({ message: "Successfully assign" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//Filter the section, subject and grade Level
export async function POST(req: NextRequest, context: contextProps) {
  try {
    const { params } = context;
    const data = await req.json();
    const selection = await prisma.facultyProfile.findUnique({
      where: {
        userId: params.facultyId,
      },
      include: {
        section: {
          where: {
            id: data.sectionId,
          },
        },
        subjects: {
          where: {
            id: data.subjectId,
          },
        },
        gradeLevel: {
          where: {
            id: data.gradeLevelId,
          },
        },
        grades: {
          select: {
            student: {
              select: {
                lastName: true,
                firstName: true,
                middleName: true,
              },
            },
            firstQuarter: true,
            secondQuarter: true,
            finalGrade: true,
            remarks: true, // "remark" should be singular
          },
          orderBy: {
            student: {
              lastName: 'asc', // Sort by last name in ascending order
            },
          },
        },
      },
    });    
    return NextResponse.json(selection, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}