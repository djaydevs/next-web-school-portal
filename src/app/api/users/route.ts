import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return null;
    }
  
    return NextResponse.json({ message: "OK", users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error", error }, { status: 500 });
  }
}