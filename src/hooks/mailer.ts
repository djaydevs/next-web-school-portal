import { createTransport } from "nodemailer";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { date } from "zod";

export const sendEmailVerification = async ({email, emailId}:any) => {
    try {
        const hashToken = await bcrypt.hash(emailId.toString(), 10)

        const user = await prisma.user.findUnique ({
            where: {
                id: emailId,
            }
        });

        if (!user) {
            throw new Error(`User with ID ${emailId} not found.`);
        }      

        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 36);

        await prisma.verificationToken.create ({
            data: {
                token: hashToken,
                userId: user.id,
                expiresAt: expirationDate,
            }
        });

        const transport = createTransport ({
            host: "smtp-relay.brevo.com",
            port: 587,
            auth: {
                user: "schoolportal.project@gmail.com",
                pass: process.env.SMTP_PASSWORD as string
            }
        });

        const messageData = {
            from: "schoolportal.project@gmail.com",
            to: "email",
            subject: "VERIFY YOUR MJA ACCOUNT",
            html: '<p> This is your activation link. Please click <a href="${process.env.domain}verifyemail?token=${hashToken}">here</a>to verify</p>'
        }

    
        const res = await transport.sendMail(messageData);
        return res;

    } catch (error:any) {
        throw new Error(error.message);        
    }
    
}






