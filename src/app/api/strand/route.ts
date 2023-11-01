import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const strands = await prisma.strand.findMany();

        if (!strands) {
            return NextResponse.json({ message: "No strands found" }, { status: 404 });
        }

        return NextResponse.json(strands, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}