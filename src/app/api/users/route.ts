import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return null;
    }
  
    return NextResponse.json({ users });
  } catch (error: any) {
    return [];
  }
}