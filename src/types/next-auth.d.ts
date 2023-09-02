import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

import { User } from "@/types/intefaces";

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      role: String,
    } & DefaultSession
  }

  interface User extends DefaultUser {
    role: String,
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: String,
  }
}