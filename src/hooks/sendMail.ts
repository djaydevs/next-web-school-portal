import { prisma } from "@/lib/prisma";
import { hash } from 'bcrypt'
import { randomUUID } from "crypto";
import nodemailer from 'nodemailer'

export async function sendMail(userId: string, email: string) {
    try {
      const token = await prisma.invitation.create({
        data: {
          userId: userId,
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
        },
      })
  
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
        html: `<p> This is your activation link. Please click <a href="${process.env.NEXTAUTH_URL}/verify/${token.token}">here</a> to verify or copy paste the link below in your browser. <br> ${process.env.NEXTAUTH_URL}/verify/${token.token}</p>` ,
      };

      const result = await transporter.sendMail(messageData);
      return result;
  
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

 
      // const { params } = context
      // const { email } = await req.json()
  
      // // Generate a unique token
      // const token = Math.random().toString(36).substring(2, 15);
  
      // // Hash the token for security
      // const hashToken = await hash(token, 10);
  
      // // Calculate the expiration date for the token
      // const expirationDate = new Date();
      // expirationDate.setDate(expirationDate.getDate() + 1);
  
      // // Store the token and user ID in the database
      // const invitation = await prisma.invitation.create({
      //   data: {
      //     userId: userId,
      //     token: hashToken,        
      //     expiresAt: expirationDate,
      //   },
      // });