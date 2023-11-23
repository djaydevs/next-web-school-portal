"use client";

import { FC, useState, useCallback, useEffect } from "react";
import { Section, sectionSchema } from "@/types";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GradeLevel, SchoolYear, Strand } from "@prisma/client";
import axios, { AxiosError } from "axios";

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
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  fetchGradeLevel,
  fetchSchoolYear,
  fetchSectionById,
  fetchStrands,
} from "@/hooks/getInfos";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import Icons from "@/components/ui/icons";

interface SectionPageIdModalProps {
  params: {
    id: string;
  };
}

export default function SectionPageIdModal({
  params,
}: SectionPageIdModalProps) {
  const { id } = params;
  const { toast } = useToast();

  const {
    data: section,
    isPending: isLoadingSection,
    isError: isErrorFetchingSection,
    error: sectionsError,
  } = useQuery<Section>({
    queryKey: ["section", id],
    queryFn: async () => fetchSectionById(id),
  });

  const [sectionId, setSectionId] = useState({ id: section?.id });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setOpen(false);
    setSectionId((prev) => ({ ...prev, id: id }));
    router.push("/admin/section/");
  }, [id, router]);

  useEffect(() => {
    if (!open) {
      router.push("/admin/section/");
    }
  }, [open, router]);

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
    data: gradeLevels,
    isPending: isLoadingGradeLevels,
    isError: isErrorFetchingGradeLevels,
    error: gradeLevelsError,
  } = useQuery<GradeLevel[]>({
    queryKey: ["gradeLevel"],
    queryFn: async () => fetchGradeLevel(),
  });

  const {
    data: strands,
    isPending: isLoadingStrands,
    isError: isErrorFetchingStrands,
    error: strandsError,
  } = useQuery<Strand[]>({
    queryKey: ["strands"],
    queryFn: async () => fetchStrands(),
  });

  const form = useForm<z.infer<typeof sectionSchema>>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      id: section?.id,
      schoolYearId: section?.schoolYearId,
      gradeLevelId: section?.gradeLevelId,
      strandId: section?.strandId,
      sectionName: section?.sectionName,
      room: section?.room,
    },
  });

  const { mutate: editSection, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (section: Section) => {
      return axios.patch("/api/section", section);
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
        description: "Section added successfully!",
      });
      router.push("/admin/section-subject");
      router.refresh();
    },
  });

  const onSubmit = (data: z.infer<typeof sectionSchema>) => {
    editSection(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Link
          href={`/admin/section/${id}`}
          aria-label="Manage section details"
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
          <DialogTitle>Edit Section</DialogTitle>
          <DialogDescription>Edit section.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="schoolYearId"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>School Year</FormLabel>
                  {isLoadingSchoolYears ? (
                    "loading..."
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={section?.schoolYearId}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select school year..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {schoolYears?.map((schoolYear) => {
                          const from = new Date(schoolYear.from).getFullYear();
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
                      defaultValue={section?.gradeLevelId}
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
            <FormField
              control={form.control}
              name="strandId"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Strand</FormLabel>
                  {isLoadingStrands ? (
                    "loading..."
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={section?.strandId}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select strand option..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {strands?.map((strand) => (
                          <SelectItem key={strand.id} value={strand.id}>
                            {strand.strandCode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FormDescription>
                    {strands?.find(
                      (strand) => strand.id === form.getValues("strandId"),
                    )
                      ? `Add subject to ${strands.find(
                          (strand) => strand.id === form.getValues("strandId"),
                        )?.strandName}`
                      : "Select a strand"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sectionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Name</FormLabel>
                  <FormControl>
                    <Input
                      required
                      {...field}
                      defaultValue={section?.sectionName}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={section?.room}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
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
                Edit Section
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
