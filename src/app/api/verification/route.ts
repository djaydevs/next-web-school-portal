import { NextResponse, NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token)

        const user = await prisma.verificationToken.findFirst({
            where: {
                token: token,
                expiresAt: { gt: new Date() } //change into expiresAt
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
        }

        console.log(user);

        // await prisma.user.update({
        //     data: {
        //         status: enum("VERIFIED"),
        //     }
        // })
        //ADD A UPDATE FOR ENUM
        // CONDITION IF THE TOKEN IS EXPIRED

        return NextResponse.json({
            message: "Email Verified Successfully!",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }

}