import bcrypt from "bcrypt"
import { type NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from 'next-auth/adapters';

import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = ({
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: "jwt",
    },
    // pages: {
    //     signIn: "/signin",
    //     error: "/error",
    // },
    providers: [
        GoogleProvider({
            // profile(profile: GoogleProfile) {
            //     return {
            //         ...profile,
            //         role: profile.role ?? "STUDENT",
            //         id: profile.id.toString(),
            //         name: profile.name,
            //         email: profile.email,
            //         image: profile.picture,
            //     }
            // },
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // CredentialsProvider({
        //     name: 'credentials',
        //     credentials: {
        //       email: { label: 'email', type: 'text' },
        //       password: { label: 'password', type: 'password' }
        //     },
        //     async authorize(credentials) {
        //       if (!credentials?.email || !credentials?.password) {
        //         throw new Error('Invalid credentials');
        //       }
      
        //       const user = await prisma.user.findUnique({
        //         where: {
        //           email: credentials.email
        //         }
        //       });
      
        //       if (!user || !user?.hashedPassword) {
        //         throw new Error('Invalid credentials');
        //       }
      
        //       const isCorrectPassword = await bcrypt.compare(
        //         credentials.password,
        //         user.hashedPassword
        //       );
      
        //       if (!isCorrectPassword) {
        //         throw new Error('Invalid credentials');
        //       }
      
        //       return user;
        //     }
        //   })
    ],
    callbacks: {
        async jwt({ token, user }) {
            const dbUser = await prisma.user.findFirst({
                where: {
                    email: token.email,
                },
            })

            if (!dbUser) {
                token.id = user!.id
                return token
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                role: dbUser.role,
                email: dbUser.email,
                image: dbUser.image,
            }
            // if (user) token.role = user.role
            // return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
                session.user.role = token.role
            }
            // if (session?.user) session.user.role = token.role
            return session
        },
    }
})