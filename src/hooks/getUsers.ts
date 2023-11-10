import axios from "axios";
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getSession = async () => {
  return await getServerSession(authOptions)
}

export const fetchUsers = async () => {
  const res = await axios.get("/api/user");
  return res.data;
};

export const fetchUserById = async (userId: string) => {
  const res = await axios.get(`/api/user/${userId}`)
  return res.data
}

export const fetchFaculty = async () => {
  const res = await axios.get("/api/faculty");
  return res.data;
};

export const fetchFacultyById = async (userId: string) => {
  const res = await axios.get(`/api/faculty/${userId}`)
  return res.data
}

export const fetchStudent = async () => {
  const res = await axios.get("/api/student");
  return res.data;
};

export const fetchStudentById = async (userId: string) => {
  const res = await axios.get(`/api/student/${userId}`)
  return res.data
}