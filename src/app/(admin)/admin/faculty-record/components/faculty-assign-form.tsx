import { FC } from "react";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Section, Subject } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Faculty, FacultyAssign, facultyAssignSchema } from "@/types";
import { fetchSections, fetchSubjects } from "@/hooks/getInfos";

interface FacultyAssignFormProps {
  params: {
    id: string;
  };
  initialValue?: Faculty;
}

const FacultyAssignForm: FC<FacultyAssignFormProps> = ({
  params,
  initialValue,
}) => {
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();

  const {
    data: sections,
    isPending: isLoadingSections,
    isError: isErrorFetchingSections,
    error: sectionsError,
  } = useQuery<Section[]>({
    queryKey: ["sections"],
    queryFn: async () => fetchSections(),
  });

  const {
    data: subjects,
    isPending: isLoadingSubjects,
    isError: isErrorFetchingSubjects,
    error: subjectsError,
  } = useQuery<Subject[]>({
    queryKey: ["subjects"],
    queryFn: async () => fetchSubjects(),
  });

  const form = useForm<z.infer<typeof facultyAssignSchema>>({
    resolver: zodResolver(facultyAssignSchema),
    defaultValues: {
      gradeLevelIds: initialValue?.facultyProfile.gradeLevel.map(
        (gradeLevel) => gradeLevel.id,
      ),
      sectionIds: initialValue?.facultyProfile.section.map(
        (section) => section.id,
      ),
      subjectIds: initialValue?.facultyProfile.subjects.map(
        (subject) => subject.id,
      ),
    },
  });

  const { mutate: updateFaculty, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (update: FacultyAssign) => {
      console.log("Sending PATCH request with data:", update);
      return axios.patch(`/api/faculty/${id}`, update);
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
        description: "Faculty updated successfully!",
      });
      router.push("/admin/faculty-record");
      router.refresh();
    },
  });

  const onSubmit = async (updateInfo: z.infer<typeof facultyAssignSchema>) => {
    updateFaculty(updateInfo);
  };

  if (isErrorFetchingSections) {
    return <span>Error: {sectionsError.message}</span>;
  }

  if (isErrorFetchingSubjects) {
    return <span>Error: {subjectsError.message}</span>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Assign Faculty</CardTitle>
        <CardDescription>
          Assign subjects and section to faculty.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="sectionIds"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Section</FormLabel>
                    <FormDescription>
                      Select the section you want to assign to .
                    </FormDescription>
                  </div>
                  {isLoadingSections
                    ? "loading"
                    : sections?.map((section) => (
                        <FormItem
                          key={section.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={
                                Array.isArray(field.value) &&
                                field.value.includes(section.id)
                              }
                              onChange={(event) => {
                                const isChecked = (
                                  event.target as HTMLInputElement
                                ).checked;

                                if (isChecked) {
                                  field.onChange([
                                    ...(field.value || []),
                                    section.id,
                                  ]);
                                } else {
                                  field.onChange(
                                    (field.value || []).filter(
                                      (value) => value !== section.id,
                                    ),
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {section.sectionName}
                          </FormLabel>
                        </FormItem>
                      ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subjectIds"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Subject</FormLabel>
                    <FormDescription>
                      Select the subject you want to assign to .
                    </FormDescription>
                  </div>
                  {isLoadingSubjects
                    ? "loading"
                    : subjects?.map((subject) => (
                        <FormItem
                          key={subject.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={
                                Array.isArray(field.value) &&
                                field.value.includes(subject.id)
                              }
                              onChange={(event) => {
                                const isChecked = (
                                  event.target as HTMLInputElement
                                ).checked;

                                if (isChecked) {
                                  field.onChange([
                                    ...(field.value || []),
                                    subject.id,
                                  ]);
                                } else {
                                  field.onChange(
                                    (field.value || []).filter(
                                      (value) => value !== subject.id,
                                    ),
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {subject.subjectName}
                          </FormLabel>
                        </FormItem>
                      ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between gap-4">
            <Button type="submit" disabled={isLoadingSubmit} className="w-full">
              {isLoadingSubmit ? (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}{" "}
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FacultyAssignForm;
