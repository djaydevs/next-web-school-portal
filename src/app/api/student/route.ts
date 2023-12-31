import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const students = await prisma.user.findMany({
      where: {
        role: "student",
        isVerified: true,
      }, include: {
        studentProfile: {
          include: {
            gradeLevel: true,
            section: true,
            strand: {
              include: {
                sections: true,
                subjects: true,
              }
            },
            subjects: {
              include: {
                grades: true,
              }
            },
            grades: true,
            enrollment: true,
          }
        },
      },
    });

    if (!students) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(students, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}