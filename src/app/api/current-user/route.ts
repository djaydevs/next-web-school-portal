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
        studentProfile: {
          include: {
            strand: {
              include: {
                subjects: {
                  include: {
                    grades: true,
                  }
                },
              }
            }
          }
        },
        facultyProfile: true,
        adminProfile: true,
      }
    });

    if (!currentUser) {
      return NextResponse.json({ error: "Current user not found" }, { status: 404 });
    }

    return NextResponse.json(currentUser, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
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
          sex: body.sex,
          civilStatus: body.civilStatus,
          yearsInMJA: body.yearsInMJA,
          otherSchool: body.otherSchool,
          dateIssued: body.dateIssued,
          dateValid: body.dateValid,
          licenseNumber: body.licenseNumber,
          profOrg: body.profOrg,
          degree: body.degree,
          major: body.major,
          minor: body.minor,
          // dateOfBirth: body.dateOfBirth,
          // gender: body.gender,
          // address: body.address,
          // contactNumber: body.contactNumber,
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

      return NextResponse.json(updatedAdminProfile, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid user role" }, { status: 400 });
    }

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
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
      const addStudentProfile = await prisma.studentProfile.create({
        data: {
          user: {
            connect: {
              id: currentUser.id,
            }
          },
          lrnNumber: body.lrnNumber,
          lastName: body.lastName,
          firstName: body.firstName,
          middleName: body.middleName,
          dateOfBirth: body.dateOfBirth,
          age: body.age,
          sex: body.sex,
          genAveJHS: body.genAveJHS,
          nameOfJHS: body.nameOfJHS,
          jhsCompleted: body.jhsCompleted,
          gender: body.gender,
          address: body.address,
          parentGuardianName: body.parentGuardianName,
          parentGuardianAddress: body.parentGuardianAddress,
          parentGuardianOccupation: body.parentGuardianOccupation,
          contactNumber: body.contact,
        },
      });

      return NextResponse.json(addStudentProfile, { status: 200 });
    } else if (role === "faculty") {
      // Update faculty profile || to be edited once the new fields are implemented
      const addFacultyProfile = await prisma.facultyProfile.create({
        data: {
          user: {
            connect: {
              id: currentUser.id,
            }
          },
          empNumber: body.empNumber,
          lastName: body.lastName,
          firstName: body.firstName,
          middleName: body.middleName,
          age: body.age,
          sex: body.sex,
          civilStatus: body.civilStatus,
          yearsInMJA: body.yearsInMJA,
          otherSchool: body.otherSchool,
          dateIssued: body.dateIssued,
          dateValid: body.dateValid,
          licenseNumber: body.licenseNumber,
          profOrg: body.profOrg,
          degree: body.degree,
          major: body.major,
          minor: body.minor,
          // dateOfBirth: body.dateOfBirth,
          // gender: body.gender,
          // address: body.address,
          // contactNumber: body.contactNumber,
        },
      });

      return NextResponse.json(addFacultyProfile, { status: 200 });
    } else if (role === "admin") {
      // Update admin profile
      const addAdminProfile = await prisma.adminProfile.create({
        data: {
          user: {
            connect: {
              id: currentUser.id,
            }
          },
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

      return NextResponse.json(addAdminProfile, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid user role" }, { status: 400 });
    }

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}