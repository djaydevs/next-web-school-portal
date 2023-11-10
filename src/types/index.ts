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
    adminProfile: z.object({}).nullish(),
    facultyProfile: z.object({}).nullish(),
    studentProfile: z.object({}).nullish(),
});
export type User = z.infer<typeof userSchema>

export const facultySchema = z.object({
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
    facultyProfile: z.object({
        lastName: z.string({
            required_error: "Last name is required",
        }),
        firstName: z.string({
            required_error: "First name is required",
        }),
        middleName: z.string().nullish(),
        age: z.number({
            required_error: "Age is required",
            invalid_type_error: "Age must be a number",
        }).int(),
        dateOfBirth: z.date({
            required_error: "Date of birth is required",
        }),
        gender: z.string({
            required_error: "Gender is required",
        }),
        address: z.string({
            required_error: "Address is required",
        }),
        contactNumber: z.string().nullish(),
        section: z.array(z.object({
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
        }), z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
        }),
        subjects: z.array(z.object({
            id: z.string(),
            subjectName: z.string({
                required_error: "Subject name is required",
            }),
            schoolYearId: z.string({
                required_error: "School Year name is required",
            }),
            strandId: z.string({
                required_error: "Strand is required",
            }),
            studentId: z.string({
                required_error: "Student is required",
            }),
        })),
        gradeLevel: z.array(z.object({
            id: z.string(),
            gradeLevel: z.number().int()
        }))
    })
});
export type Faculty = z.infer<typeof facultySchema>

export const studentSchema = z.object({
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
    studentProfile: z.object({
        id: z.string(),
        lrnNumber: z.string(),
        sex: z.string(),
        age: z.number({
            required_error: "Age is required",
            invalid_type_error: "Age must be a number",
        }).int(),
        lastName: z.string({
            required_error: "Last name is required",
        }),
        firstName: z.string({
            required_error: "First name is required",
        }),
        middleName: z.string().nullish(),
        dateOfBirth: z.date({
            required_error: "Date of birth is required",
        }),
        gender: z.string({
            required_error: "Gender is required",
        }),
        genAveJHS: z.number(),
        nameofJHS: z.string(),
        address: z.string({
            required_error: "Address is required",
        }),
        jhsCompleted: z.number().int(),
        province: z.string().nullish(),
        town: z.string().nullish(),
        barangay: z.string().nullish(),
        parentGuardianName: z.string().nullish(),
        parentGuardianAddress: z.string().nullish(),
        parentGuardianOccupation: z.string().nullish(),
        workImmersion: z.string().nullish(),
        contactNumber: z.string().nullish(),
        gradeLevel: z.object({
            id: z.string(),
            gradeLevel: z.number().int()
        }),
        gradeLevelId: z.string({
            required_error: "Grade level is required",
        }),
        strand: z.object({
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
        }),
        strandId: z.string({
            required_error: "Strand is required",
        }),
        section: z.object({
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
        }),
        sectionId: z.string({
            required_error: "Section is required",
        }),
        grades: z.array(z.object({
            id: z.string(),
            firstQuarter: z.number(),
            secondQuarter: z.number(),
            finalGrade: z.number(),
            genAverage: z.number(),
            remarks: z.string(),
            studentId: z.string(),
        })),
        subjects: z.array(z.object({
            id: z.string(),
            subjectName: z.string({
                required_error: "Subject name is required",
            }),
            schoolYearId: z.string({
                required_error: "School Year name is required",
            }),
            strandId: z.string({
                required_error: "Strand is required",
            }),
            studentId: z.string({
                required_error: "Student is required",
            }),
        })),
    })
});
export type Student = z.infer<typeof studentSchema>

export const studentProfileSchema = z.object({
    gradeLevelId: z.string({
        required_error: "Grade level is required",
    }),
    strandId: z.string({
        required_error: "Strand is required",
    }),
    sectionId: z.string({
        required_error: "Section is required",
    }),
});
export type StudentProfile = z.infer<typeof studentProfileSchema>

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

export const verifySchema = z.object({
    inputNumber: z.string({
        required_error: "LRN or Employee number is required",
    }),
});
export type Verify = z.infer<typeof verifySchema>