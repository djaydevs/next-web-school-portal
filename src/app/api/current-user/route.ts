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

export async function PUT(req: NextRequest, res: NextResponse) {
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
      const body = await req.json();

      // Find the student with the given ID along with related section, school year, and grade level
      const student = await prisma.studentProfile.findUnique({
          where: { id: currentUser.studentProfile?.id },
          include: {
              section: {
                  include: {
                      schoolYear: true, // Include the school year through the section
                  },
              },
              gradeLevel: true,
          },
      });

      if (!student) {
          return NextResponse.json({ error: 'Student not found' });
      }

      const activeSchoolYear = student.section?.schoolYear;

      if (!activeSchoolYear) {
          return NextResponse.json({ error: 'Active school year not found' });
      }

      // Disconnect the current grade level and section
      await prisma.studentProfile.update({
          where: { id: currentUser.studentProfile?.id },
          data: {
              gradeLevel: {
                  disconnect: true,
              },
              section: {
                  disconnect: true,
              },
          },
      });

      // Find the ID of the existing grade level with gradeLevel value 12
      const targetGradeLevelId = await prisma.gradeLevel.findUnique({
          where: { gradeLevel: 12 }, // Adjust this condition based on your data
          select: { id: true },
      });

      if (!targetGradeLevelId) {
          return NextResponse.json({ error: 'Target grade level not found' });
      }

      // Disconnect the current grade level
      await prisma.studentProfile.update({
          where: { id: currentUser.studentProfile?.id },
          data: {
              gradeLevel: {
                  disconnect: true,
              },
          },
      });

      // Connect to the target grade level
      const newGradeLevel = await prisma.studentProfile.update({
          where: { id: currentUser.studentProfile?.id },
          data: {
              // Add other properties you want to update
              gradeLevel: {
                  connect: {
                      id: targetGradeLevelId.id,
                  },
              },
          },
      });

      // Create a new school year without inserting into the database
      const newSchoolYear = {
          from: new Date(activeSchoolYear.to.getFullYear() + 1, activeSchoolYear.to.getMonth(), activeSchoolYear.to.getDate()),
          to: new Date(activeSchoolYear.to.getFullYear() + 2, activeSchoolYear.to.getMonth(), activeSchoolYear.to.getDate()),
          semester: 1, // Adjust this based on your logic for the new school year
      };

      // Create a new enrollment record
      const newEnrollment = await prisma.enrollment.create({
          data: {
              academicYear: `${newSchoolYear.from.getFullYear()}-${newSchoolYear.to.getFullYear()}`,
              status: 'Pending',
              enrollmentDate: new Date().toISOString(),
              student: {
                  connect: {
                      id: currentUser.studentProfile?.id,
                  },
              },
          },
      });
      

      // Update the student profile to connect the new enrollment record and grade level
      const updatedStudentProfile = await prisma.studentProfile.update({
          where: { id: currentUser.studentProfile?.id },
          data: {
              lastName: body.lastName,
              firstName: body.firstName,
              middleName: body.middleName,
              dateOfBirth: new Date(body.dateOfBirth).toISOString() ,
              age: body.age,
              sex: body.sex,
              gender: body.gender,
              address: body.address,
              parentGuardianName: body.parentGuardianName,
              parentGuardianAddress: body.parentGuardianAddress,
              parentGuardianOccupation: body.parentGuardianOccupation,
              contactNumber: body.contact,
              enrollment: {
                  connect: {
                      id: newEnrollment.id,
                  },
              },
          },
      });

      return NextResponse.json(updatedStudentProfile, { status: 200 });
    } else if (role === "admin") {
      // Update admin profile
      const addAdminProfile = await prisma.adminProfile.update({
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

      return NextResponse.json(addAdminProfile, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid user role" }, { status: 400 });
    }

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}