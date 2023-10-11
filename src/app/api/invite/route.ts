import { prisma } from "@/lib/prisma";
import { userSchema } from "@/types";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const parsedData = userSchema.parse(body)
        console.log(parsedData);

        const invite = await prisma.user.create ({
            data: {
                email: parsedData.email,
                role: parsedData.role,
            },
        });

        return NextResponse.json( invite, {status: 200})
        
    } catch (error: any) {
        return NextResponse.json({message: error.message}, { status: 500})
    }
}