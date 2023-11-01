import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const gradeLevels = await prisma.gradeLevel.findMany();

        if (!gradeLevels) {
            return NextResponse.json({ message: "No grade level found" }, { status: 404 });
        }

        return NextResponse.json(gradeLevels, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}