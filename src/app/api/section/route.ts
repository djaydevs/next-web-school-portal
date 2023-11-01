import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create a Section and Strand
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const add = await prisma.section.create({
      data: {
        schoolYearId: body.schoolYearId,
        gradeLevelId: body.gradeLevelId,
        strandId: body.strandId,
        sectionName: body.sectionName,
        room: body.room,
      },
    });

    return NextResponse.json(add, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}