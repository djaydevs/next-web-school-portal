import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const subjects = await prisma.subject.findMany();

    if (!subjects) {
      return NextResponse.json({ message: "No subjects found" }, { status: 404 });
    }

    return NextResponse.json(subjects, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

// Create a Subject per Strand
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const addSubject = await prisma.subject.create({
      data: {
        subjectName: body.subjectName,
        strandId: body.strandId,
        schoolYearId: body.schoolYearId,
      },
    });

    return NextResponse.json(addSubject, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}