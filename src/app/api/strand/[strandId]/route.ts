import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface contextProps {
    params: {
        strandId: string
    }
}

export async function GET(req: Request, context: contextProps) {
    try {
        const { params } = context;

        const strand = await prisma.strand.findUnique({
            where: {
                id: params.strandId,
            }, include: {
                gradeLevel: true,
            }
        });

        if (!strand) {
            return NextResponse.json({ message: "No strand found" }, { status: 404 });
        }

        return NextResponse.json(strand, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, context: contextProps) {
    try {
        const { params } = context;
        const body = await req.json();

        const update = await prisma.strand.update({
            where: {
                id: params.strandId,
            },
            data: {
                gradeLevelId: body.gradeLevelId,
                strandCode: body.strandCode,
                strandName: body.strandName,
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

        await prisma.strand.delete({
            where: {
                id: params.strandId,
            },
        });

        return NextResponse.json({ message: "Strand deleted successfully!" }, { status: 204 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}