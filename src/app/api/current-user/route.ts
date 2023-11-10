import { NextRequest, NextResponse } from "next/server";

import { getSession } from "@/hooks/getUsers";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      }, include: {
        studentProfile: true,
        facultyProfile: true,
        adminProfile: true,
      }
    });

    if (!currentUser) {
      return NextResponse.json({ error: "Current user not found" }, { status: 404 });
    }

    return NextResponse.json(currentUser, { status: 200 });

  } catch (error: any) {
    return null;
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        studentProfile: true,
        facultyProfile: true,
        adminProfile: true,
      },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "Current user not found" }, { status: 404 });
    }

    const { role } = currentUser;
    const body = await req.json();

    if (role === "student") {
      // Update student profile
      const updatedStudentProfile = await prisma.studentProfile.update({
        where: { id: currentUser.studentProfile?.id },
        data: {
          lrnNumber: body.lrnNumber,
          lastName: body.lastName,
          firstName: body.firstName,
          middleName: body.middleName,
          dateOfBirth: body.dateOfBirth,
          age: body.age,
          gender: body.gender,
          address: body.address,
          parentGuardianName: body.parentGuardianName,
          parentGuardianAddress: body.parentGuardianAddress,
          parentGuardianOccupation: body.parentGuardianOccupation,
          contactNumber: body.contact,
        },
      });

      // Update user table
      await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          name: body.name,
          email: body.email,
          image: body.image,
        },
      });

      return NextResponse.json(updatedStudentProfile, { status: 200 });
    } else if (role === "faculty") {
      // Update faculty profile || to be edited once the new fields are implemented
      const updatedFacultyProfile = await prisma.facultyProfile.update({
        where: { id: currentUser.facultyProfile?.id },
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

      // Update user table
      await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          name: body.name,
          email: body.email,
          image: body.image,
        },
      });

      return NextResponse.json(updatedFacultyProfile, { status: 200 });
    } else if (role === "admin") {
      // Update admin profile
      const updatedAdminProfile = await prisma.adminProfile.update({
        where: { id: currentUser.adminProfile?.id },
        data: {
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

      // Update user table
      await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          name: body.name,
          email: body.email,
          image: body.image,
        },
      });

      return NextResponse.json(updatedAdminProfile, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid user role" }, { status: 400 });
    }

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}