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

export const schoolYearSchema = z.object({
    id: z.string(),
    schoolYear: z.object({
        from: z.date({
            required_error: "School year start is required",
        }),
        to: z.date({
            required_error: "School year end is required",
        }),
    }),
    semester: z.number({
        required_error: "Semester is required",
        invalid_type_error: "Semester must be a number",
    }).int(),
});
export type SchoolYear = z.infer<typeof schoolYearSchema>

export const strandSchema = z.object({
    id: z.string(),
    gradeLevelId: z.string({
        required_error: "Grade level is required",
    }),
    strandCode: z.string({
        required_error: "Strand code is required",
    }),
    strandName: z.string({
        required_error: "Strand name is required",
    }),
});
export type Strand = z.infer<typeof strandSchema>

export const sectionSchema = z.object({
    id: z.string(),
    schoolYearId: z.string({
        required_error: "School Year is required",
    }),
    gradeLevelId: z.string({
        required_error: "Grade level is required",
    }),
    strandId: z.string({
        required_error: "Strand code is required",
    }),
    sectionName: z.string({
        required_error: "Grade section is required",
    }),
    room: z.string(),
});
export type Section = z.infer<typeof sectionSchema>

export const subjectSchema = z.object({
    id: z.string(),
    subjectName: z.string({
        required_error: "Subject name is required",
    }),
    strandId: z.string({
        required_error: "Strand is required",
    }),
    schoolYearId: z.string({
        required_error: "School Year name is required",
    }),
});
export type Subject = z.infer<typeof subjectSchema>