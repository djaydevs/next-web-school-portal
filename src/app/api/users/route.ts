import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json({ message: "OK", users }, { status: 200 });

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}