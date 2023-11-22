import { FC } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GradeLevel, SchoolYear, Strand } from "@prisma/client";

import { Section, sectionSchema } from "@/types";
import {
  fetchGradeLevel,
  fetchSchoolYear,
  fetchStrands,
} from "@/hooks/getInfos";
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
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface AddSectionFormProps {}

const AddSectionForm: FC<AddSectionFormProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();

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
      id: "",
      schoolYearId: "",
      gradeLevelId: "",
      strandId: "",
      sectionName: "",
      room: "",
    },
  });

  const { mutate: addSection, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (newSection: Section) => {
      return axios.post("/api/section", newSection);
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
    addSection(data);
  };

  if (isErrorFetchingSchoolYears) {
    return <span>Error: {schoolYearsError.message}</span>;
  }

  if (isErrorFetchingGradeLevels) {
    return <span>Error: {gradeLevelsError.message}</span>;
  }

  if (isErrorFetchingStrands) {
    return <span>Error: {strandsError.message}</span>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Icons.PlusCircle className="mr-2" />
          Add Section
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Section</DialogTitle>
          <DialogDescription>Add new section.</DialogDescription>
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
                      defaultValue={field.value}
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
                      defaultValue={field.value}
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
                Add Section
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSectionForm;
