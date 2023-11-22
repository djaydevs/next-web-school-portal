import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import url from 'url';

export async function GET(req: NextRequest) {
    const { query } = url.parse(req.nextUrl.toString(), true);
    const strandId = Array.isArray(query.strandId) ? query.strandId[0] : query.strandId;

    try {
        const sections = await prisma.section.findMany({
            where: {
                strandId: strandId,
            }
        });

        if (!sections) {
            return NextResponse.json({ message: "No sections found" }, { status: 404 });
        }

        return NextResponse.json(sections, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}