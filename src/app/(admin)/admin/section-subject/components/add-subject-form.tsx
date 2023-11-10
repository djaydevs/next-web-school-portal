import { FC } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SchoolYear, Strand } from "@prisma/client";

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
import { useToast } from "@/components/ui/use-toast";
import { Subject, subjectSchema } from "@/types";
import { fetchSchoolYear, fetchStrands } from "@/hooks/getInfos";

interface AddSubjectFormProps {}

const AddSubjectForm: FC<AddSubjectFormProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();

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

  const form = useForm<z.infer<typeof subjectSchema>>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      id: "",
      subjectName: "",
      strandId: "",
      schoolYearId: "",
    },
  });

  //Create a new subject
  const { mutate: addSubject, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (addSub: Subject) => {
      return axios.post(`/api/subject`, addSub);
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
        description: "Subject added successfully!",
      });
      router.push("/admin/section-subject");
      router.refresh();
    },
  });

  const onSubmit = (data: z.infer<typeof subjectSchema>) => {
    addSubject(data);
  };

  if (isErrorFetchingStrands) {
    return <span>Error: {strandsError.message}</span>;
  }

  if (isErrorFetchingSchoolYears) {
    return <span>Error: {schoolYearsError.message}</span>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Icons.PlusCircle className="mr-2" />
          Add Subject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Subject</DialogTitle>
          <DialogDescription>Add new subject.</DialogDescription>
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
                              {/* {schoolYear.semester === 1
                                ? `(1st semester)`
                                : `(2nd semester)`} */}
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
              name="subjectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Name</FormLabel>
                  <FormControl>
                    <Input
                      required
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" "),
                        )
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
                Add Subject
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubjectForm;
