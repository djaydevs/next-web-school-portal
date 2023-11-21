import { Faculty, Student } from "@/types";

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

export const enrollmentStatus = [
  {
    value: "Enrolled",
    label: "Enrolled",
  },
  {
    value: "Pending",
    label: "Pending",
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

export const generateSubjectOptionsFaculty = (faculties: Faculty[]) => {
  const subjects = faculties.reduce(
    (acc: { label: string; value: string }[], faculty: Faculty) => {
      faculty.facultyProfile?.subjects.forEach((sub) => {
        if (!acc.find((option) => option.value === sub.subjectName)) {
          acc.push({ label: sub.subjectName, value: sub.subjectName });
        }
      });
      return acc;
    },
    [],
  );

  return subjects;
};

export const generateGradeLevelOptionsStudent = (students: Student[]) => {
  const grades = students.reduce(
    (acc: { label: string; value: string }[], student: Student) => {
      const grd = student.studentProfile?.gradeLevel;
      if (grd && !acc.find((option) => option.value === grd.id)) {
        acc.push({ label: grd.gradeLevel.toString(), value: grd.id });
      }
      return acc;
    },
    [],
  );

  return grades;
};

export const generateStrandOptionsStudent = (students: Student[]) => {
  const strands = students.reduce(
    (acc: { label: string; value: string }[], student: Student) => {
      const str = student.studentProfile?.strand;
      if (str && !acc.find((option) => option.value === str.strandCode)) {
        acc.push({ label: str.strandCode, value: str.strandCode });
      }
      return acc;
    },
    [],
  );

  return strands;
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