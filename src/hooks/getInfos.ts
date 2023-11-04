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