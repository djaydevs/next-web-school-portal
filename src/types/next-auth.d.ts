import NextAuth from "next-auth";
import { DefaultSession, User } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import { type } from "os";

type UserId = string
declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId,
      role: UserRole,
    } & DefaultSession
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: UserId,
    role: UserRole,
    email: string,
  }
}