import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface verifyProps {
    params: {
      userId: string
    }
}

export async function POST(req: NextRequest, context: verifyProps) {
    try {
        const { params } = context
        const body = await req.json();

        const existingStudentProfile = await prisma.studentProfile.findUnique({
            where: {
              lrnNumber: body.inputNumber,
            },
          });

        const existingFacultyProfile = await prisma.facultyProfile.findUnique({
        where: {
            empNumber: body.inputNumber, // Assuming empNumber is used for faculty
        },
        });
          
    if (existingStudentProfile) {
        // Update the existing studentProfile to connect to the user
        await prisma.studentProfile.update({
        where: {
            lrnNumber: body.inputNumber,
        },
        data: {
            user: {
            connect: {
                id: params.userId,
            },
            },
        },
        });
    
        // Optionally, update the user's properties if needed
        await prisma.user.update({
        where: {
            id: params.userId,
        },
        data: {
            role: 'student', // Set the default role
            isVerified: true, // Set isVerified to true
            emailVerified: new Date().toISOString(),
        },
        });
    
        return NextResponse.json({ message: 'Account verified and studentProfile updated successfully.' }, { status: 200});
    } else if (existingFacultyProfile) {
        // Update the existing facultyProfile to connect to the user
        await prisma.facultyProfile.update({
        where: {
            empNumber: body.inputNumber,
        },
        data: {
            user: {
            connect: {
                id: params.userId,
            },
            },
        },
        });
            
        // Update the user's properties for faculty, including another field like facultyEmailVerified with the current date
        await prisma.user.update({
        where: {
            id: params.userId,
        },
        data: {
            role: 'faculty', // Set the role for faculty
            isVerified: true, 
            emailVerified: new Date().toISOString(),
        },
        });

        return NextResponse.json({ message: 'Account verified and studentProfile updated successfully.' }, { status: 200});
    } else {
        return NextResponse.json({ message: 'LRN number not found in StudentProfile.' }, { status: 404 });
    }
    
    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 }); 
    }    
}
