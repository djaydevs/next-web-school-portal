import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import nodemailer from 'nodemailer'

import { prisma } from '@/lib/prisma'

interface contextProps {
  params: {
    userId: string
  }
}

// get user by id
export async function GET(req: NextRequest, context: contextProps) {
  try {
    const { params } = context
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId
      }
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

// update user role
export async function PATCH(req: NextRequest, context: contextProps) {
  try {
    const { params } = context
    const body = await req.json()

    await prisma.user.update({
      where: {
        id: params.userId
      },
      data: {
        name: body.name,
        role: body.role
      }
    });
    return NextResponse.json({ message: "Role updated successfuly!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

//send email verification link
export async function POST(req: NextRequest, context: contextProps) {
  try {
    const { params } = context
    const { email } = await req.json()

    // Generate a unique token
    const token = Math.random().toString(36).substring(2, 15);

    // Hash the token for security
    const hashToken = await hash(token, 10);

    // Calculate the expiration date for the token
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    // Store the token and user ID in the database
    const invitation = await prisma.invitation.create({
      data: {
        userId: params.userId,
        token: hashToken,
        expiresAt: expirationDate,
      },
    });

    // Send an email to the user with the verification link
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: "schoolportal.project@gmail.com",
        pass: process.env.SMTP_PASSWORD as string,
      },
    });

    const messageData = {
      from: "schoolportal.project@gmail.com",
      to: email,
      subject: "VERIFY YOUR MJA ACCOUNT",
      html: `<p> This is your activation link. Please click <a href="${process.env.NEXTAUTH_URL}/verify?token=${token}">here</a> to verify</p>`,
    };

    const result = await transporter.sendMail(messageData);

    return NextResponse.json({ message: "Invitation sent successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}