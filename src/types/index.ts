import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    name: z.string().nullish(),
    email: z.string().email(),
    createdAt: z.string().nullish(),
    updatedAt: z.string().nullish(),
    image: z.string().url().nullish(),
    role: z.string(),
});

export type User = z.infer<typeof userSchema>
// export type user = User