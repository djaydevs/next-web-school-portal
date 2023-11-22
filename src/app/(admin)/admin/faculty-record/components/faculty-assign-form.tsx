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
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
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
            <ScrollArea className="h-full space-y-2 p-4 md:h-[330px]">
              <FormField
                control={form.control}
                name="sectionIds"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-2 mt-4">
                      <FormLabel className="text-base">Section</FormLabel>
                      <FormDescription>
                        Select the sections you want to assign to the faculty.
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
                                checked={field.value?.includes(section.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, section.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== section.id,
                                        )
                                      )
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
                    <div className="mb-2 mt-4">
                      <FormLabel className="text-base">Subject</FormLabel>
                      <FormDescription>
                        Select the subjects you want to assign to the faculty.
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
                                checked={field.value?.includes(subject.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, subject.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== subject.id,
                                        )
                                      )
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
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex w-full justify-end">
            <Button type="submit" disabled={isLoadingSubmit}>
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
