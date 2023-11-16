import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface contextProps {
    params: {
        studentId: string
    }
};

export async function GET(req: NextRequest, context: contextProps) {
    try {
        const { params } = context;
        const student = await prisma.user.findUnique({
            where: {
                id: params.studentId,
            }, include: {
                studentProfile: {
                    include: {
                        gradeLevel: true,
                        strand: {
                            include: {
                                subjects: {
                                    include: {
                                        grades: true,
                                    }
                                },
                            }
                        },
                        section: true,
                        subjects: true,
                        grades: true,
                    }
                },
            },
        });

        if (!student) {
            return NextResponse.json({ message: "No student found" }, { status: 404 });
        }

        return NextResponse.json(student, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, context: contextProps) {
    try {
        const { params } = context
        const body = await req.json();

        await prisma.studentProfile.update({
            where: {
                userId: params.studentId,
            },
            data: {
                gradeLevelId: body.gradeLevelId,
                strandId: body.strandId,
                sectionId: body.sectionId,
            },
        });

        return NextResponse.json({ message: "Successfully assign to student" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}