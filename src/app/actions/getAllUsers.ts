import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth"

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getAllUsers() {
    let query: any = {};
  try {
    const users = await prisma.user.findMany({
        where: query,
    });

    if (!users) {
      return null;
    }

    const safeUsers = users.map((user) => ({
        ...users,
        // createdAt: user.createdAt.toISOString(),
      }));

    return safeUsers;
  } catch (error: any) {
    return null;
  }
}