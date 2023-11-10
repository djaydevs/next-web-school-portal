import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const schoolyears = await prisma.schoolYear.findMany();

        if (!schoolyears) {
            return NextResponse.json({ message: "No school years found" }, { status: 404 });
        }

        return NextResponse.json(schoolyears, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}

// Create a school year
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const add = await prisma.schoolYear.create({
            data: {
                from: body.schoolYear.from,
                to: body.schoolYear.to,
                semesters: {
                    create: [
                      {
                        semesterNum: body.semester,
                      },
                    ],
                },
            },
        });

        return NextResponse.json(add, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}