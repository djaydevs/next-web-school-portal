import { z } from "zod";
import { User } from "@prisma/client";

export const userSchema = z.object({
    id: z.string(),
    name: z.string().nullish(),
    email: z.string().email(),
    createdAt: z.string().nullish(),
    updatedAt: z.string().nullish(),
    image: z.string().url().nullish(),
    role: z.enum(["STUDENT", "FACULTY", "ADMIN"]),
});

export type user = z.infer<typeof userSchema>
// export type user = User