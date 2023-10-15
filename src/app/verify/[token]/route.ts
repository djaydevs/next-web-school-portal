import { NextResponse, NextRequest } from "next/server";
import { hash } from "bcrypt";
import { compare } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export async function GET (req: NextRequest, { params }: { params: {token: string}}) {
  try {
    const { token } = params
    //const decodedToken = decodeURIComponent(token)

    const user = await prisma.user.findFirst({
        where: {
          invitations: {
            some: {
              AND: [
                {
                  activatedAt: null,
                },
                {
                  createdAt: {
                    gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
                  },
                },
                {
                  token
                },
              ],
            },
          },
        },
      })
    
      if (!user) {
        throw new Error('Token is invalid or expired')
      }
    
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isVerified: true,
        },
      })
    
      await prisma.invitation.update({
        where: {
          token,
        },
        data: {
          activatedAt: new Date(),
        },
      })

      
      //redirect('/signin');
      
    return NextResponse.redirect('/signin');
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, {status: 500});
  }
}

 // // Find the invitation with the matching token
    // const invitation = await prisma.invitation.findFirst({
    //   where: {
    //     token: token,
    //   },
    //   include: {
    //     user: true,
    //   },
    // });

    // if (!invitation) {
    //   return NextResponse.json({ message: "Invalid token" }, {status: 400});
    // }
    

    // // Check if the invitation has expired
    // if (invitation.expiresAt) {
    //     const expirationDate = new Date(invitation.expiresAt);
    //     if (expirationDate < new Date()) {
    //       return NextResponse.json({ message: "Invitation has expired" }, { status: 400 });
    //     }
    // }
  
    // // Mark the user as verified
    // await prisma.user.update({
    //   where: {
    //     id: invitation.userId,
    //   },
    //   data: {
    //     isVerified: true,
    //   },
    // });
