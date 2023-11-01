"use client";

import { FC } from "react";
import * as z from "zod";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { fetchUserById } from "@/hooks/getUsers";
import {
  GradeSection,
  SchoolYear,
  Subject,
  User,
  schoolYearSchema,
} from "@/types";
import { useToast } from "@/components/ui/use-toast";
import AddSectionForm from "@/components/add-section-form";
import AddSubjectForm from "@/components/add-subject-form";
import AddSchoolYearForm from "@/components/add-schoolyear-form";

interface SectionandSubjectPageProps {
  params: {
    id: string;
  };
}

const SectionandSubjectPage: FC<SectionandSubjectPageProps> = ({ params }) => {
  const { id } = params;

  // const { data: gradeSectionInfo, isPending: infoLoading } = useQuery<User>({
  //   queryKey: ["gradeSection", id],
  //   queryFn: async () => fetchUserById(id),
  // });

  //Create a new grade section and strand
  // const { mutate: addSection, isPending: isLoadingSubmit } = useMutation({
  //   mutationFn: (add: GradeSection) => {
  //     return axios.post(`/api/section`, add);
  //   },
  //   onError: (error) => {
  //     if (error instanceof AxiosError) {
  //       if (error.response?.status === 500) {
  //         toast({
  //           title: "Error",
  //           description: "Something went wrong! Please try again later.",
  //           variant: "destructive",
  //         });
  //       }
  //     }
  //   },
  //   onSuccess: () => {
  //     toast({
  //       title: "Success",
  //       description: "Section added successfully!",
  //     });
  //     router.push("/admin/section-subject");
  //     router.refresh();
  //   },
  // });

  // const handleAddSection: SubmitHandler<GradeSection> = async (
  //   gradeSectionInfo,
  // ) => {
  //   addSection(gradeSectionInfo);
  // };

  return (
    <div className="space-x-4 px-4">
      <AddSchoolYearForm />
      <AddSubjectForm />
      <div className="w-full justify-between space-x-4 p-4 md:flex">
        {/* {infoLoading}
        <AddSectionForm
          onSubmit={handleAddSection}
          isLoadingSubmit={isLoadingSubmit}
        /> */}
      </div>
    </div>
  );
};

export default SectionandSubjectPage;
