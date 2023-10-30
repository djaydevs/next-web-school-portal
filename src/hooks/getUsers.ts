import axios from "axios";
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
      }, include: {
        studentProfile: true,
        facultyProfile: true,
        adminProfile: true,
      }
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString()
    };
  } catch (error: any) {
    return null;
  }
}

export const fetchUsers = async () => {
  const res = await axios.get("/api/user");
  return res.data;
};

export const fetchUserById = async (userId: string) => {
  const res = await axios.get(`/api/user/${userId}`)
  return res.data
}