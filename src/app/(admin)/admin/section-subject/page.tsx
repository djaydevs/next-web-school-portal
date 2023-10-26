"use client";

import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { fetchUserById } from "@/hooks/getUsers";
import { GradeSection, Subject, User } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import AddSectionForm from "@/components/add-section-form";
import AddSubjectForm from "./components/add-subject-form";
import { string } from "zod";

interface SectionandSubjectPageProps {
  params: {
    id: string;
  };
}

const SectionandSubjectPage: FC<SectionandSubjectPageProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();

  const { data: gradeSectionInfo, isPending: infoLoading } = useQuery<User>({
    queryKey: ["gradeSection", id],
    queryFn: async () => fetchUserById(id),
  });

  //Create a new grade section and strand
  const { mutate: addSection, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (add: GradeSection) => {
      return axios.post(`/api/section`, add);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          toast({
            title: "Error",
            description: "Something went wrong! Please try again later.",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Section added successfully!",
      });
      router.push("/admin/section-subject");
      router.refresh();
    },
  });

  const handleAddSection: SubmitHandler<GradeSection> = async (
    gradeSectionInfo,
  ) => {
    addSection(gradeSectionInfo);
  };

  //Create a new subject
  const { mutate: addSubject, isPending: loadingSubmit } = useMutation({
    mutationFn: (addSub: Subject) => {
      return axios.post(`/api/subject`, addSub);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          toast({
            title: "Error",
            description: "Something went wrong! Please try again later.",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Section added successfully!",
      });
      router.push("/admin/section-subject");
      router.refresh();
    },
  });

  const handleAddSubject: SubmitHandler<Subject> = async (data) => {
    addSubject(data);
  };

  return (
    <div className="w-full justify-between space-x-4 p-4 md:flex">
      {infoLoading}
      <AddSectionForm
        onSubmit={handleAddSection}
        isLoadingSubmit={isLoadingSubmit}
      />
      <AddSubjectForm
        onSubmit={handleAddSubject}
        loadingSubmit={loadingSubmit}
      />
    </div>
  );
};

export default SectionandSubjectPage;
