import { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from 'next-auth/adapters';

import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = ({
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
        error: "/signin",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         email: {
        //             label: "Email:",
        //             type: "email",
        //             placeholder: "example@example.com"
        //         },
        //         password: {
        //             label: "Password:",
        //             type: "password"
        //         }
        //     },
        //     async authorize(credentials) {
        //         if (!credentials || !credentials.email || !credentials.password) {
        //             return null
        //         }

        //         const dbUser = await prisma.user.findFirst({ 
        //             where: { email: credentials.email },
        //         })
                
        //         if (dbUser && dbUser.password === credentials.password) {
        //             const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser
        //             return dbUserWithoutPassword as User
        //         }

        //         return null
        //     }
        // })
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