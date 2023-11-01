import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

interface contextProps {
  params: {
    userId: string
  }
}

// get user by id
export async function GET(req: NextRequest, context: contextProps) {
  try {
    const { params } = context
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId
      }
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

// update user role
export async function PATCH(req: NextRequest, context: contextProps) {
  try {
    const { params } = context
    const body = await req.json()

    await prisma.user.update({
      where: {
        id: params.userId
      },
      data: {
        name: body.name,
        role: body.role
      }
    });
    return NextResponse.json({ message: "Role updated successfuly!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }

}
