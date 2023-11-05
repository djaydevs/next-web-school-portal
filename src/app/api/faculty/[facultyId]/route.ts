import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface contextProps {
  params: {
    facultyId: string
  }
};

// get faculty by id
export async function GET(req: NextRequest, context: contextProps) {
  try {
    const { params } = context
    const faculty = await prisma.user.findUnique({
      where: {
        id: params.facultyId,
        role: "faculty",
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
    return NextResponse.json(faculty, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

//Assign the faculty to the selected section and subject
export async function PATCH(req: NextRequest, context: contextProps) {
  try {
    const { params } = context
    const body = await req.json();

    const faculty = await prisma.facultyProfile.findUnique({ where: { id: body.facultyId } });

    const subjectIds = body.subjectIds; // an array of subject IDs
    const sectionIds = body.sectionIds; // an array of section IDs
    const gradeLevelIds = body.gradeLevelIds; // an array of grade level IDs

    // Assign faculty to subjects
    for (const subjectId of subjectIds) {
      await prisma.subject.update({
        where: { id: subjectId },
        data: { faculty: { connect: { id: body.facultyId } } },
      });
    }

    // Assign faculty to sections
    for (const sectionId of sectionIds) {
      await prisma.section.update({
        where: { id: sectionId },
        data: { faculty: { connect: { id: body.facultyId } } },
      });
    }

    // Assign faculty to grade levels
    for (const gradeLevelId of gradeLevelIds) {
      await prisma.gradeLevel.update({
        where: { id: gradeLevelId },
        data: { faculty: { connect: { id: body.facultyId } } },
      });
    }

    return NextResponse.json({ message: "Successfully assign" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}