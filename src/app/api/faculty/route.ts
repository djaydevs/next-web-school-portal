import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get the list of faculty users
export async function GET(req: NextRequest) {
    try {
        const faculty = await prisma.user.findMany({
            where: {
                role: "faculty",
            }, include: {
                facultyProfile: {
                    include: {
                        section: true,
                        subjects: true,
                        gradeLevel: true,
                    }
                },
            },
        });

        if (!faculty) {
            return NextResponse.json({ message: "No users found" }, { status: 404 });
        }

        return NextResponse.json(faculty, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

//Add a new faculty
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const addFaculty = await prisma.facultyProfile.create({
            data: {
                empNumber: body.empNumber,
                lastName: body.lastName,
                firstName: body.firstName,
                middleName: body.middleName,
                age: body.age,
                dateOfBirth: body.dateOfBirth,
                gender: body.gender,
                address: body.address,
                contactNumber: body.contactNumber,
            },
        });

        return NextResponse.json(addFaculty, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}