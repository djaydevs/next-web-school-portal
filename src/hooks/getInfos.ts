import { Section } from "@/types";
import axios from "axios";

export const fetchSchoolYear = async () => {
    const res = await axios.get("/api/school-year");
    return res.data;
};

export const fetchGradeLevel = async () => {
    const res = await axios.get("/api/grade-level");
    return res.data;
};

export const fetchStrands = async () => {
    const res = await axios.get("/api/strand");
    return res.data;
};

export const fetchSections = async () => {
    const res = await axios.get("/api/section");
    return res.data;
};

export const fetchSectionsByStrand = async (strandId: string) => {
    const res = await axios.get(`/api/section-by-strand?strandId=${strandId}`);
    const sections = res.data

    return sections as Section[];
};

export const fetchSubjects = async () => {
    const res = await axios.get("/api/subject");
    return res.data;
};