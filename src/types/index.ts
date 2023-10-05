import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    name: z.string().nullish(),
    email: z.string({
        required_error: "Email field is required",
        invalid_type_error: "This field must be in email format",
    }).email(),
    emailVerified: z.string().nullish(),
    createdAt: z.string().nullish(),
    updatedAt: z.string().nullish(),
    image: z.string().url().nullish(),
    role: z.string({
        required_error: "You need to select a role.",
    }),
    isVerified: z.boolean(),
});

export type User = z.infer<typeof userSchema>