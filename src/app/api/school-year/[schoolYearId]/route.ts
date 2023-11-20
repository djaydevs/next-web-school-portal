import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface contextProps {
    params: {
        schoolYearId: string
    }
}

export async function GET(req: Request, context: contextProps) {
    try {
        const { params } = context;

        const schoolyear = await prisma.schoolYear.findUnique({
            where: {
                id: params.schoolYearId,
            }
        });

        if (!schoolyear) {
            return NextResponse.json({ message: "No school year found" }, { status: 404 });
        }

        return NextResponse.json(schoolyear, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, context: contextProps) {
    try {
        const { params } = context;
        const body = await req.json();

        const update = await prisma.schoolYear.update({
            where: {
                id: params.schoolYearId,
            },
            data: {
                from: body.schoolYear.from,
                to: body.schoolYear.to,
                semester: body.semester,
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

        await prisma.schoolYear.delete({
            where: {
                id: params.schoolYearId,
            },
        });

        return NextResponse.json({ message: "Section deleted successfully!" }, { status: 204 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}