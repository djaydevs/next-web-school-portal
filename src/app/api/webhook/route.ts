import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Webhook for the CSV file
export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      console.log(body);

      const student = await prisma.studentProfile.create({
        data: {
            lrnNumber: body.lrnNumber,
            sex: body.sex,
            age: body.age,
            lastName: body.lastName,
            firstName: body.firstName,
            middleName: body.middleName,
            dateOfBirth: body.dateOfBirth,
            gender: body.gender,
            genAveJHS: body.genAveJHS,
            nameOfJHS: body.nameOfJHS,
            address: body.address,
            jhsCompleted: body.jhsCompleted,
            placeOfBirth: {
                create: {
                    province: body.province,
                    town: body.town,
                    barangay: body.barangay,
                }                
            },
            parentGuardian: {
                create: {
                    name: body.name,
                    address: body.address,
                    occupation: body.occupation,
                },                
            }, 
            workImmersion: body.workImmersion,
        },
      });

      return NextResponse.json( { status: 200 });
  
    } catch ( error: any ) {
      return NextResponse.json({ message: error.message }, { status: 500 })      
    }
}