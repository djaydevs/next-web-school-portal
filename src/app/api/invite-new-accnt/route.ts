import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { formSchema } from "@/app/(admin)/admin/manage-accounts/components/invite-new-account";
import { ZodEnum } from "zod";

export async function POST(request:NextRequest) {

    const body: unknown = await request.json();
    const result = formSchema.safeParse(body);

    // check out Zod's .flatten() method for an easier way to process errors
    let zodErrors = {};
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    } else {

        const userData = result.data // Extract validated user data
        try {     

            const user = await prisma.user.create({
            data: {
                email: userData.email,
                role: userData.role,
            },
            });

            return NextResponse.json({
                message: "Ivited New Account Successfully!",
                success: true
            })    
            
        } catch (error:any) {
            return NextResponse.json({error: error.message},
                {status: 500})            
        }
    }    
}

