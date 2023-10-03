import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { formSchema } from "@/app/(admin)/admin/manage-accounts/components/invite-new-account";
import { ZodEnum } from "zod";

export async function POST(request: NextRequest) {

    const body: unknown = await request.json();
    const result = formSchema.safeParse(body);

    // check out Zod's .flatten() method for an easier way to process errors
    let zodErrors = {};
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
        });
    } else {

        const userData = result.data // Extract validated user data
        try {

            const user = await prisma.user.create({
                data: {
                    email: userData.email,
                    role: userData.role,
                },
            });

            return NextResponse.json({
                message: "Ivited New Account Successfully!",
                success: true
            })

        } catch (error: any) {
            return NextResponse.json({ error: error.message },
                { status: 500 })
        }
    }
}

// Create a new API route in your Next.js project.
// You can do this by creating a new file in the pages/api directory with a name like invite.ts.

// import { NextApiRequest, NextApiResponse } from "next";
// import { hash } from "bcrypt";
// import { PrismaClient } from "@prisma/client";
// import nodemailer from "nodemailer";

// const prisma = new PrismaClient();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const { email } = req.body;

//     // Generate a unique token
//     const token = Math.random().toString(36).substring(2, 15);

//     // Hash the token for security
//     const hashToken = await hash(token, 10);

//     // Calculate the expiration date for the token
//     const expirationDate = new Date();
//     expirationDate.setDate(expirationDate.getDate() + 1);

//     // Store the token and user ID in the database
//     const invitation = await prisma.invitation.create({
//       data: {
//         token: hashToken,
//         userId: user.id,
//         expiresAt: expirationDate,
//       },
//     });

//     // Send an email to the user with the verification link
//     const transporter = nodemailer.createTransport({
//       host: "smtp-relay.brevo.com",
//       port: 587,
//       auth: {
//         user: "schoolportal.project@gmail.com",
//         pass: process.env.SMTP_PASSWORD as string,
//       },
//     });

//     const messageData = {
//       from: "schoolportal.project@gmail.com",
//       to: email,
//       subject: "VERIFY YOUR MJA ACCOUNT",
//       html: `<p> This is your activation link. Please click <a href="${process.env.NEXTAUTH_URL}/verifyemail?token=${token}">here</a> to verify</p>`,
//     };

//     const result = await transporter.sendMail(messageData);

//     res.status(200).json({ message: "Invitation sent successfully" });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// }

/********************************************************************************/
// Import the necessary modules for sending emails using Nodemailer.
// You can use the nodemailer module to send emails and the bcrypt module to hash the token for security.

// Define the API route handler function, which will receive the email address of the user to be invited as a parameter.
// Inside the handler function, generate a unique token for the user using a library like Math.random() or uuid.

// Hash the generated token using the bcrypt.hash() method to improve security.
// Calculate the expiration date for the token.
// In this example, we're setting the expiration date to one day after the invitation is sent.

// Store the hashed token and the user ID in the database.
// You can use a database like Prisma to store the data.

// Use Nodemailer to send an email to the user with a link to your web app's verification page.
// The link should include the generated token as a query parameter.

// In this example, we're using a Gmail SMTP server to send the email.
// You'll need to replace the placeholders like process.env.NEXTAUTH_URL and process.env.SMTP_PASSWORD with your own values.

// When the user clicks the link, your verification page should extract the token from the query parameter and check if it matches the hashed token stored in the database.
// If the tokens match and the invitation hasn't expired, mark the user as verified and allow them to use the web app.



// import { NextApiRequest, NextApiResponse } from "next";
// import { compare } from "bcrypt";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const { token } = req.query;

//     // Find the invitation with the matching token
//     const invitation = await prisma.invitation.findUnique({
//       where: {
//         token: await hash(token, 10),
//       },
//       include: {
//         user: true,
//       },
//     });

//     if (!invitation) {
//       return res.status(400).json({ message: "Invalid token" });
//     }

//     // Check if the invitation has expired
//     if (new Date(invitation.expiresAt) < new Date()) {
//       return res.status(400).json({ message: "Invitation has expired" });
//     }

//     // Mark the user as verified
//     await prisma.user.update({
//       where: {
//         id: invitation.userId,
//       },
//       data: {
//         isVerified: true,
//       },
//     });

//     res.status(200).json({ message: "Verification successful" });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// }

