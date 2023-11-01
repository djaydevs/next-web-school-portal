import axios from "axios";

export const fetchSchoolYear = async () => {
    const res = await axios.get("/api/school-year");
    return res.data;
};

export const fetchStrands = async () => {
    const res = await axios.get("/api/strand");
    return res.data;
};