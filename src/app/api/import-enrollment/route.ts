import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req:NextRequest) {
    try {
        const data = await req.json(); 
        console.log(data);

        if (!data || !Array.isArray(data.rows)) {
            throw new Error("Data is not an array or does not contain 'rows'.");
        }

        const studentsData = data.rows.map((row: any) => {        
            return {
              lrnNumber: row['LRN NUMBER'],
              studentName: row['Student Name'],
              strand: row['Strand'],
              gradeLevel: parseInt(row['Grade Level'], 10),
              sectionName: row['Section'],
            };
        });

        // Process each student's data
        for (const studentData of studentsData) {
            const lrnNumber = studentData.lrnNumber;
            const gradeLevel = studentData.gradeLevel;
            const sectionName = studentData.sectionName; 

            const existingStudent = await prisma.studentProfile.findUnique({
                where: { lrnNumber: lrnNumber},
                select: { id: true},
            })

            if (!existingStudent) {
                return NextResponse.json("Student with LRN number ${lrnNumber} not found", {status: 404})
            }

            const targetGradeLevelId = await prisma.gradeLevel.findUnique({
                where: { gradeLevel: gradeLevel},
                select: { id: true},
            })

            if (!targetGradeLevelId) {
                return NextResponse.json("Target grade level not found", {status: 404})
            }

            // Disconnect the current grade level
            await prisma.studentProfile.update({
                where: { id: existingStudent.id },
                data: {
                    gradeLevel: {
                        disconnect: true,
                    },
                },
            });

            if (!sectionName) {
                return NextResponse.json("Section name is missing in the data", { status: 400 });
            }      

            //Find the id of section
            const targetSectionId = await prisma.section.findFirst({
                where: { 
                    sectionName: { 
                        contains: sectionName.toUpperCase(),
                        mode: 'insensitive'
                    } 
                },
                select: { id: true},
            })

            if (!targetSectionId) {
                return NextResponse.json("Target section not found",{status: 404})
            }

            //New Section and Grade Level
            await prisma.studentProfile.update({
                where: {id: existingStudent.id},
                data: {
                    sectionId: targetSectionId.id,
                    gradeLevelId: targetGradeLevelId.id,
                }
            })        

            const enrollmentId = await prisma.studentProfile.findUnique({
                where: { id: existingStudent.id },
                include: {
                    enrollment: true,
                },
            });
    
            if (enrollmentId && enrollmentId.enrollment.length > 0) {
                const enrollmentRecord = enrollmentId.enrollment[0];
    
                // Create a new enrollment record
                await prisma.enrollment.update({
                    where: { id: enrollmentRecord.id },
                    data: {
                        status: "Enrolled",
                    },
                });
            };
        }

        return NextResponse.json("Success", {status: 200})
    } catch (error: any) {
        console.error("Error processing request:", error.message);
        console.error("Request stack trace:", error.stack);
        console.error("Request data:", req);
        console.error("Prisma error:", error);
        return NextResponse.json({ message: error.message, stack: error.stack  }, {status: 500})
    }
}