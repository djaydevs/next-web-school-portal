import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface contextProps {
    params: {
        subjectId: string
    }
}

export async function GET(req: Request, context: contextProps) {
    try {
        const { params } = context;

        const subject = await prisma.subject.findUnique({
            where: {
                id: params.subjectId,
            }, include: {
                strand: true,
                schoolYear: true,
            }
        });

        if (!subject) {
            return NextResponse.json({ message: "No subject found" }, { status: 404 });
        }

        return NextResponse.json(subject, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, context: contextProps) {
    try {
        const { params } = context;
        const body = await req.json();

        const update = await prisma.subject.update({
            where: {
                id: params.subjectId,
            },
            data: {
                subjectName: body.subjectName,
                strandId: body.strandId,
                schoolYearId: body.schoolYearId,
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

        await prisma.subject.delete({
            where: {
                id: params.subjectId,
            },
        });

        return NextResponse.json({ message: "Subject deleted successfully!" }, { status: 204 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}