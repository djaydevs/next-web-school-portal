// import { Faculty } from "@/types";

import { Section, Faculty, Student } from "@/types";

export const statuses = [
  {
    value: false,
    label: "Not verified",
  },
  {
    value: true,
    label: "Verified",
  },
]

export const roles = [
  {
    label: "Student",
    value: "student",
  },
  {
    label: "Faculty",
    value: "faculty",
  },
  {
    label: "Admin",
    value: "admin",
  },
]

// export const getStrandName = (strandCode: string): string => {
//   switch (strandCode) {
//     case "abm":
//       return "Accountancy and Business Management";
//     case "stem":
//       return "Science, Technology, Engineering, and Mathematics";
//     case "humss":
//       return "Humanities and Social Sciences";
//     case "gas":
//       return "General Academic Strand";
//     default:
//       return "";
//   }
// };

// Assuming faculties is your fetched data
export const generateSectionOptionsFaculty = (faculties: Faculty[]) => {
  const sections = faculties.reduce(
    (acc: { label: string; value: string }[], faculty: Faculty) => {
      faculty.facultyProfile?.section.forEach((sec) => {
        if (!acc.find((option) => option.value === sec.sectionName)) {
          acc.push({ label: sec.sectionName, value: sec.sectionName });
        }
      });
      return acc;
    },
    [],
  );

  return sections;
};

export const generateSectionOptionsStudent = (students: Student[]) => {
  const sections = students.reduce(
    (acc: { label: string; value: string }[], student: Student) => {
      const sec = student.studentProfile?.section;
      if (sec && !acc.find((option) => option.value === sec.sectionName)) {
        acc.push({ label: sec.sectionName, value: sec.sectionName });
      }
      return acc;
    },
    [],
  );

  return sections;
};