import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json({ users }, { status: 200 });

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {

    const body = await req.json();

    // const parsedData = userSchema.parse(body)
    // console.log(parsedData);

    const invite = await prisma.user.create({
      data: {
        email: body.email,
        role: body.role,
      },
    });

    return NextResponse.json(invite, { status: 200 })

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}