"use client";

import * as z from "zod";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SchoolYear, Strand } from "@prisma/client";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchSchoolYear,
  fetchStrands,
  fetchSubjectById,
} from "@/hooks/getInfos";
import { Subject, SubjectForm, subjectFormSchema } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SubjectPageIdModalProps {
  params: {
    id: string;
  };
}

export default function SubjectPageIdModal({
  params,
}: SubjectPageIdModalProps) {
  const { id } = params;
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    data: subject,
    isPending: isLoadingSubject,
    isError: isErrorFetchingSubject,
    error: subjectsError,
  } = useQuery<Subject>({
    queryKey: ["subject", id],
    queryFn: async () => fetchSubjectById(id),
  });

  const [subjectId, setSubjectId] = useState({ id: subject?.id });

  const handleClose = useCallback(() => {
    setOpen(false);
    setSubjectId((prev) => ({ ...prev, id: id }));
    router.push("/admin/subject/");
  }, [id, router]);

  useEffect(() => {
    if (!open) {
      router.push("/admin/subject/");
    }
  }, [open, router]);

  const {
    data: strands,
    isPending: isLoadingStrands,
    isError: isErrorFetchingStrands,
    error: strandsError,
  } = useQuery<Strand[]>({
    queryKey: ["strands"],
    queryFn: async () => fetchStrands(),
  });

  const {
    data: schoolYears,
    isPending: isLoadingSchoolYears,
    isError: isErrorFetchingSchoolYears,
    error: schoolYearsError,
  } = useQuery<SchoolYear[]>({
    queryKey: ["schoolYears"],
    queryFn: async () => fetchSchoolYear(),
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<SubjectForm>({
    resolver: zodResolver(subjectFormSchema),
    // defaultValues: {
    //   ...subject,
    // },
  });

  //Create a new subject
  const { mutate: updateSubject, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (editSub: SubjectForm) => {
      return axios.put(`/api/subject/${id}`, editSub);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          toast({
            title: "Error",
            description:
              "Something went wrong! Please check if required fields are answered, or try again later.",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Subject updated successfully!",
      });
      router.push("/admin/subject");
      router.refresh();
    },
  });

  const onSubmit = (data: z.infer<typeof subjectFormSchema>) => {
    updateSubject(data);
  };

  if (isErrorFetchingStrands) {
    return <span>Error: {strandsError.message}</span>;
  }

  if (isErrorFetchingSchoolYears) {
    return <span>Error: {schoolYearsError.message}</span>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Link
          href={`/admin/subject/${id}`}
          aria-label="Manage subject details"
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "sm",
            }),
            "w-full rounded-md px-2 py-1",
          )}
        >
          Details
        </Link>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Subject</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <Label>School Year</Label>
            <div className="mt-2">
              <Controller
                control={control}
                name="schoolYearId"
                defaultValue={subject?.schoolYearId ?? ""}
                render={({ field }) => (
                  <div>
                    {isLoadingSchoolYears ? (
                      "loading..."
                    ) : (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select school year..." />
                        </SelectTrigger>
                        <SelectContent>
                          {schoolYears?.map((schoolYear) => {
                            const from = new Date(
                              schoolYear.from,
                            ).getFullYear();
                            const to = new Date(schoolYear.to).getFullYear();
                            return (
                              <SelectItem
                                key={schoolYear.id}
                                value={schoolYear.id}
                              >
                                {from} - {to}{" "}
                                {schoolYear.semester === 1
                                  ? `(1st semester)`
                                  : `(2nd semester)`}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}
              />
              {errors.schoolYearId?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.schoolYearId.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label>Strand</Label>
            <div className="mt-2">
              <Controller
                control={control}
                name="strandId"
                defaultValue={subject?.strandId ?? ""}
                render={({ field }) => (
                  <div>
                    {isLoadingStrands ? (
                      "loading..."
                    ) : (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a strand..." />
                        </SelectTrigger>
                        <SelectContent>
                          {strands?.map((strand) => (
                            <SelectItem key={strand.id} value={strand.id}>
                              {strand.strandCode}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}
              />
              {errors.strandId?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.strandId.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label>Subject</Label>
            <div className="mt-2">
              <Input
                type="text"
                defaultValue={subject?.subjectName ?? ""}
                {...register("subjectName")}
              />
              {errors.subjectName?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.subjectName.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="flex justify-between gap-4">
            <Button type="submit" disabled={isLoadingSubmit} className="w-full">
              {isLoadingSubmit ? (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}{" "}
              Update Subject
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
