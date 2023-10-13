import { NextResponse, NextRequest } from "next/server";
import { hash } from "bcrypt";
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function POST (req: NextRequest) {
  try {
    const { token } = await req.json();

    // Find the invitation with the matching token
    const invitation = await prisma.invitation.findUnique({
      where: {
        token: await hash(token, 10),
      },
      include: {
        user: true,
      },
    });

    if (!invitation) {
      return NextResponse.json({ message: "Invalid token" }, {status: 400});
    }
    

    // Check if the invitation has expired
    if (invitation.expiresAt) {
        const expirationDate = new Date(invitation.expiresAt);
        if (expirationDate < new Date()) {
          return NextResponse.json({ message: "Invitation has expired" }, { status: 400 });
        }
    }
  
    // Mark the user as verified
    await prisma.user.update({
      where: {
        id: invitation.userId,
      },
      data: {
        isVerified: true,
      },
    });

    return NextResponse.json({ message: "Verification successful" }, {status: 200});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, {status: 500});
  }
}

