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

    const faculty = await prisma.facultyProfile.findUnique({
      where: {
        userId: params.facultyId,
      }, 
      include: {
        subjects: true,
        section: true,
      }
    });

    //An array of IDs in subject, section and grade level
    const subjectIds = body.subjectIds; 
    const sectionIds = body.sectionIds; 
    const gradeLevelIds = body.gradeLevelIds; 

    if (!faculty) {
      return NextResponse.json({message: "No Faculty found"}, {status: 404})
    }

    // Extract the IDs of the currently connected subjects
    const currentSubjectIds = faculty.subjects.map(subject => subject.id);

    // Calculate the subjects to disconnect
    const subjectsToDisconnect = currentSubjectIds.filter(subjectId => !subjectIds.includes(subjectId));

    // Assign faculty to subjects
    for (const subjectId of subjectIds) {
      await prisma.subject.update({
        where: { id: subjectId },
        data: {
          faculty: {
            connect: { userId: params.facultyId },
          },
        },
      });
    }

    // Disconnect faculty from subjects that are not in the updated subjectIds array
    for (const subjectId of subjectsToDisconnect) {
      await prisma.subject.update({
        where: { id: subjectId },
        data: {
          faculty: {
            disconnect: { userId: params.facultyId },
          },
        },
      });
    }

    // Extract the IDs of the currently connected sections
    const currentSectionIds = faculty.section.map(section => section.id);

    // Calculate the sections to disconnect
    const sectionsToDisconnect = currentSectionIds.filter(sectionId => !sectionIds.includes(sectionId));

    // Assign faculty to sections
    for (const sectionId of sectionIds) {
      await prisma.section.update({
        where: { id: sectionId },
        data: {
          faculty: {
            connect: { userId: params.facultyId },
          },
        },
      });
    }

    // Disconnect faculty from sections that are not in the updated sectionIds array
    for (const sectionId of sectionsToDisconnect) {
      await prisma.section.update({
        where: { id: sectionId },
        data: {
          faculty: {
            disconnect: { userId: params.facultyId },
          },
        },
      });
    }

    // Assign faculty to grade levels
    // for (const gradeLevelId of gradeLevelIds) {
    //   await prisma.gradeLevel.update({
    //     where: { id: gradeLevelId },
    //     data: { faculty: { connect: { userId: params.facultyId } } },
    //   });
    // }

    return NextResponse.json({ message: "Successfully assign" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//Filter the section, subject and grade Level
export async function POST(req: NextRequest, context: contextProps) {
  try {
    console.log('Received PATCH request with body:', req.body);
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