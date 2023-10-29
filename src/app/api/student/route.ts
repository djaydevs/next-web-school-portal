import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// Assign a Section to the student
export async function GET(req: NextRequest) {
    try {

      const student = await prisma.user.findMany({
        where: {
            role: "student",                
        }, include: {
            studentProfile: true,
        },
      });

      if (!student) {
          return NextResponse.json({ message: "No users found" }, { status: 404 });
      }    
  
      return NextResponse.json(student, { status: 200 });
  
    } catch ( error: any ) {
      return NextResponse.json({ message: error.message }, { status: 500 })      
    }
}