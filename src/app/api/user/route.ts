import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/hooks/sendMail";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

//Create a new user account
export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    console.log(body)

    // const parsedData = userSchema.parse(body)
    // console.log(parsedData);

    const invite = await prisma.user.create({
      data: {
        email: body.email,
        role: body.role,
      },
    });

    await sendMail(invite.id, invite.email);

    return NextResponse.json(invite, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}