import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface contextProps {
    params: {
        sectionId: string
    }
}

export async function GET(req: Request, context: contextProps) {
    try {
        const { params } = context;

        const section = await prisma.section.findUnique({
            where: {
                id: params.sectionId,
            }, include: {
                schoolYear: true,
                gradeLevel: true,
                strand: true,
            }
        });

        if (!section) {
            return NextResponse.json({ message: "No school year found" }, { status: 404 });
        }

        return NextResponse.json(section, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, context: contextProps) {
    try {
        const { params } = context;
        const body = await req.json();

        const update = await prisma.section.update({
            where: {
                id: params.sectionId,
            },
            data: {
                schoolYearId: body.schoolYearId,
                gradeLevelId: body.gradeLevelId,
                strandId: body.strandId,
                sectionName: body.sectionName,
                room: body.room,
            },
        });

        return NextResponse.json(update, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, context: contextProps) {
    try {
        const { params } = context;

        await prisma.section.delete({
            where: {
                id: params.sectionId,
            },
        });

        return NextResponse.json({ message: "Section deleted successfully!" }, { status: 204 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}