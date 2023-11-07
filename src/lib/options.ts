// import { Faculty } from "@/types";

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

// // Assuming faculties is your fetched data
// export const generateSectionOptions = (faculties: Faculty[]) => {
//   const sections = faculties.reduce(
//     (acc: { label: string; value: string }[], faculty: Faculty) => {
//       faculty.facultyProfile?.section.forEach((sec) => {
//         if (!acc.find((option) => option.value === sec.id)) {
//           acc.push({ label: sec.sectionName, value: sec.id });
//         }
//       });
//       return acc;
//     },
//     [],
//   );

//   return sections;
// };