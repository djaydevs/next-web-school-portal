import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface StudentProps {
    params: {
        studentId: string;
    }
}

// Viewing of the grades
export async function GET(req: NextRequest, context: StudentProps) {
    try {
        const { params } = context;

        //return the grades, subject and semester
        const studentGrades = await prisma.studentProfile.findUnique({
            where: { userId: params.studentId }, // model of user: id in the params
            include: {
              grades: {
                select: {
                  firstQuarter: true,
                  secondQuarter: true,
                  finalGrade: true,
                  remarks: true,
                  subject: {
                    select: {
                      subjectName: true,
                    },
                  },
                  section: {
                    select: {
                        schoolYear: {
                            select: {
                                semester: true,
                            },
                        },
                    },
                  },
                },
              },
            },
        });

        if (!studentGrades) {
            return NextResponse.json({ error: 'Student not found' }, {status: 404});
        }

        return NextResponse.json(studentGrades, { status: 200});
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });      
    }
}