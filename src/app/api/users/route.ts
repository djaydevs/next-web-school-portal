import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return null;
    }
  
    return Response.json({users});
  } catch (error: any) {
    return [];
  }
}