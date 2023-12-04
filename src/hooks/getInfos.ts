import axios from "axios";
import { Section, Grades } from "@/types";

export const fetchSchoolYear = async () => {
    const res = await axios.get("/api/school-year");
    return res.data;
};

export const fetchSchoolYearById = async (schoolYearId: string) => {
    const res = await axios.get(`/api/school-year/${schoolYearId}`)
    return res.data
}

export const fetchGradeLevel = async () => {
    const res = await axios.get("/api/grade-level");
    return res.data;
};

export const fetchStrands = async () => {
    const res = await axios.get("/api/strand");
    return res.data;
};

export const fetchStrandById = async (strandId: string) => {
    const res = await axios.get(`/api/strand/${strandId}`)
    return res.data
}

export const fetchSections = async () => {
    const res = await axios.get("/api/section");
    return res.data;
};

export const fetchSectionById = async (sectionId: string) => {
    const res = await axios.get(`/api/section/${sectionId}`)
    return res.data
}

export const fetchSectionsByStrand = async (strandId: string) => {
    const res = await axios.get(`/api/section-by-strand?strandId=${strandId}`);
    const sections = res.data

    return sections as Section[];
};

export const fetchSubjects = async () => {
    const res = await axios.get("/api/subject");
    return res.data;
};

export const fetchSubjectById = async (subjectId: string) => {
    const res = await axios.get(`/api/subject/${subjectId}`)
    return res.data
}

export const fetchGrades = async () => {
    const res = await axios.get("/api/grades");
    return res.data;
};

export const fetchGradesBySchoolYear = async (userId: string, schoolYearId: string) => {
    const res = await axios.get(`/api/student/${userId}/grades?schoolYearId=${schoolYearId}`);
    const grades = res.data

    return grades as Grades[];
};