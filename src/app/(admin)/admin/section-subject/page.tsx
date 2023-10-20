"use client";

import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { GradeSection, Subject } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import AddSectionForm from "@/components/add-section-form";
import AddSubjectForm from "./components/add-subject-form";

interface SectionandSubjectPageProps {}

const SectionandSubjectPage: FC<SectionandSubjectPageProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();

  const { data: gradeSectionInfo, isLoading: infoLoading } = useQuery({
    queryKey: ["gradeSection"],
    // queryFn: async () => fetchUserById(id),
  });

  const { mutate: addSection, isLoading: isLoadingSubmit } = useMutation({
    mutationFn: (add: GradeSection) => {
      return axios.post(`/api/user/`, add);
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

  const handleAddSection: SubmitHandler<GradeSection> = async (data) => {
    addSection(data);
  };

  const handleAddSubject: SubmitHandler<Subject> = async (data) => {
    // addSection(data);
  };

  return (
    <div className="w-full justify-between space-x-4 p-4 md:flex">
      <AddSectionForm
        onSubmit={handleAddSection}
        isLoadingSubmit={isLoadingSubmit}
      />
      <AddSubjectForm
        onSubmit={handleAddSubject}
        isLoadingSubmit={isLoadingSubmit}
      />
    </div>
  );
};

export default SectionandSubjectPage;
