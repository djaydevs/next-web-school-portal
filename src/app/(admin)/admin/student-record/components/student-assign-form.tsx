import { FC, useEffect, useState } from "react";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GradeLevel, Section, Strand } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Student, StudentAssign, studentAssignSchema } from "@/types";
import {
  fetchGradeLevel,
  fetchSections,
  fetchSectionsByStrand,
  fetchStrands,
} from "@/hooks/getInfos";

interface StudentAssignFormProps {
  params: {
    id: string;
  };
  initialValue?: Student;
}

const StudentAssignForm: FC<StudentAssignFormProps> = ({
  params,
  initialValue,
}) => {
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();

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
    queryKey: ["strand"],
    queryFn: async () => fetchStrands(),
  });

  const {
    data: section,
    isPending: isLoadingSections,
    isError: isErrorFetchingSections,
    error: sectionsError,
  } = useQuery<Section[]>({
    queryKey: ["sections"],
    queryFn: async () => fetchSections(),
  });

  const form = useForm<z.infer<typeof studentAssignSchema>>({
    resolver: zodResolver(studentAssignSchema),
    defaultValues: {
      gradeLevelId: initialValue?.studentProfile.gradeLevelId ?? "",
      strandId: initialValue?.studentProfile.strandId ?? "",
      sectionId: initialValue?.studentProfile.sectionId ?? "",
    },
  });

  // get section based on selected strand
  const selectedStrandId = form.watch("strandId");
  const [sections, setSections] = useState(section || []);

  useEffect(() => {
    fetchSectionsByStrand(selectedStrandId).then((sections) => {
      setSections(sections);
    });
  }, [selectedStrandId]);

  const { mutate: updateStudent, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (update: StudentAssign) => {
      return axios.patch(`/api/student/${id}`, update);
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
        description: "Student updated successfully!",
      });
      router.push("/admin/student-record");
      router.refresh();
    },
  });

  const onSubmit = (updateInfo: z.infer<typeof studentAssignSchema>) => {
    console.log("Submitting form with data:", updateInfo);
    updateStudent(updateInfo);
  };

  if (isErrorFetchingGradeLevels) {
    return <span>Error: {gradeLevelsError.message}</span>;
  }

  if (isErrorFetchingStrands) {
    return <span>Error: {strandsError.message}</span>;
  }

  if (isErrorFetchingSections) {
    return <span>Error: {sectionsError.message}</span>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Assign Student</CardTitle>
        <CardDescription>
          Assign grade level, strand, and section to student.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <CardContent>
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
                      defaultValue={field.value ?? ""}
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
                      defaultValue={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select section option..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {strands?.map((strand) => (
                          <SelectItem key={strand.id} value={strand.id}>
                            {strand.strandCode}
                            <Badge variant="outline" className="ml-2">
                              {strand.strandName}
                            </Badge>
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
              name="sectionId"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Section</FormLabel>
                  {isLoadingSections ? (
                    "loading..."
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select section option..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sections?.length > 0 ? (
                          sections.map((section) => (
                            <SelectItem key={section.id} value={section.id}>
                              {section.sectionName}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="flex items-center justify-center p-4">
                            <Badge variant="destructive">
                              No sections found
                            </Badge>
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default StudentAssignForm;
