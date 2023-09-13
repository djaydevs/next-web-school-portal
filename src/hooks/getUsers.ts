import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getSession = async () => {
  return await getServerSession(authOptions)
}

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      }
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: 
        currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}

export const fetchUsers = async () => {
  const response = await fetch("/api/users");
  const data = await response.json();
  return data;
};