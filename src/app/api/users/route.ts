import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
      const users = await prisma.user.findMany();
  
      if (!users) {
        return null;
      }
  
      return NextResponse.json({ users })
    } catch (error: any) {
      return [];
    }
  }