import { getServerSession, type NextAuthOptions } from 'next-auth'
import { redirect } from 'next/navigation'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { useSession } from 'next-auth/react'

import { prisma } from '@/lib/prisma'
import { Account } from '@prisma/client'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            profile(profile: GoogleProfile) {
                return {
                    ...profile,
                    role: profile.role ?? "STUDENT",
                    id: profile.id.toString(),
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            },
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "email",
                    placeholder: "example@example.com"
                },
                password: {
                    label: "Password:",
                    type: "password"
                }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null
                }

                const dbUser = await prisma.account.findFirst({ 
                    where: { email: credentials.email },
                })
                
                if (dbUser && dbUser.password === credentials.password) {
                    const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser
                    return dbUserWithoutPassword as Account
                }

                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role
            return token
        },
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role
            return session
        },
    }
}