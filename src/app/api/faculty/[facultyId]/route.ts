import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface contextProps {
  params: {
    userId: string
  }
}

// get faculty by id
export async function GET(req: NextRequest, context: contextProps) {
  try {
    const { params } = context;
    const faculty = await prisma.user.findUnique({
      where: {
        id: params.userId,
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

    const facultyId = await prisma.user.findUnique({
      where: {
        id: body.userId, // Make sure params.userId is a valid user ID
      },
      select: {
        facultyProfile: {
          select: {
            id: true,
          },
        },
      },
    });    

    if (facultyId && facultyId.facultyProfile && facultyId.facultyProfile.id) {
      const facultyProfileId = facultyId.facultyProfile.id; // Extract the ID as a string
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