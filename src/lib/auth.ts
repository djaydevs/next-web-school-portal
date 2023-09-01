import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { Account } from '@prisma/client'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
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
}