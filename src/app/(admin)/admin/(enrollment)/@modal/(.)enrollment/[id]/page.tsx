"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { GradeLevel } from "@prisma/client";

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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EnrollmentAdmin,
  Section,
  Student,
  enrollmentAdminSchema,
} from "@/types";
import {
  fetchGradeLevel,
  fetchSections,
  fetchSectionsByStrand,
} from "@/hooks/getInfos";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { fetchStudentById } from "@/hooks/getUsers";
import Icons from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";

interface EnrollmentPageIdModalProps {
  params: {
    id: string;
  };
}

export default function EnrollmentPageIdModal({
  params,
}: EnrollmentPageIdModalProps) {
  const { id } = params;
  const { toast } = useToast();

  const {
    data: student,
    isPending: isLoadingStudent,
    isError: isErrorFetchingStudent,
    error,
  } = useQuery<Student>({
    queryKey: ["student", id],
    queryFn: async () => fetchStudentById(id),
  });

  const {
    data: section,
    isPending: isLoadingSection,
    isError: isErrorFetchingSection,
    error: sectionError,
  } = useQuery<Section[]>({
    queryKey: ["strands"],
    queryFn: async () => fetchSections(),
  });

  const {
    data: gradeLevels,
    isPending: isLoadingGradeLevels,
    isError: isErrorFetchingGradeLevels,
    error: gradeLevelsError,
  } = useQuery<GradeLevel[]>({
    queryKey: ["gradeLevel"],
    queryFn: async () => fetchGradeLevel(),
  });

  const [studentId, setStudentId] = useState({ id: student?.id });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const strandId = student?.studentProfile?.strandId || "";
  const [sections, setSections] = useState(section || []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setStudentId((prev) => ({ ...prev, id: id }));
    router.push("/admin/enrollment/");
  }, [id, router]);

  useEffect(() => {
    fetchSectionsByStrand(strandId).then((sections) => {
      setSections(sections);
    });

    if (!open) {
      router.push("/admin/enrollment/");
    }
  }, [open, router, strandId]);

  const form = useForm<z.infer<typeof enrollmentAdminSchema>>({
    resolver: zodResolver(enrollmentAdminSchema),
    defaultValues: {
      sectionId: "",
      gradeLevelId: "",
    },
  });

  const { mutate: verifyEnrollment, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (enrollment: EnrollmentAdmin) => {
      return axios.put(`/api/student/${params.id}/enrollment`, enrollment);
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
        description: "Enrollment added successfully!",
      });
      router.push("/admin/enrollment");
      router.refresh();
    },
  });

  const onSubmit = (data: z.infer<typeof enrollmentAdminSchema>) => {
    verifyEnrollment(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Link
          href={`/admin/enrollment/${id}`}
          aria-label="Manage enrollment details"
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
          <DialogTitle>Verify Student Enrollment</DialogTitle>
          <DialogDescription>Select section and grade level.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="sectionId"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Section</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section option..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sections.map((section) => {
                        return (
                          <SelectItem key={section.id} value={section.id}>
                            {section.sectionName}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gradeLevelId"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Grade Level</FormLabel>
                  {isLoadingGradeLevels ? (
                    "loading..."
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade level option..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gradeLevels?.map((gradeLevel) => (
                          <SelectItem key={gradeLevel.id} value={gradeLevel.id}>
                            {gradeLevel.gradeLevel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-between gap-4">
              <Button
                type="submit"
                disabled={isLoadingSubmit}
                className="w-full"
              >
                {isLoadingSubmit ? (
                  <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : null}{" "}
                Verify
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
