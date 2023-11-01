import NextAuth from "next-auth";
import { DefaultSession, User } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { type } from "os";

type UserId = string
declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId,
      role: string,
      isVerified: boolean,
    } & DefaultSession
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: UserId,
    role: string,
    email: string,
    isVerified: boolean,
  }
}