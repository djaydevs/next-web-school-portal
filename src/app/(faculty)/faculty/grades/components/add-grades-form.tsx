"use_client";

import { FC, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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
import { useToast } from "@/components/ui/use-toast";
import {
  AddFirstGrade,
  AddSecondGrade,
  Faculty,
  Student,
  addFirstGradeSchema,
  addSecondGradeSchema,
} from "@/types";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { getCurrentUser } from "@/hooks/getUsers";

interface AddGradesFormProps {
  params: {
    id: string;
  };
  initialValue?: Student;
}

const AddGradesForm: FC<AddGradesFormProps> = ({ params, initialValue }) => {
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();
  const [isFirstFormSubmitted, setIsFirstFormSubmitted] = useState(false);

  const {
    data: currentUser,
    isPending: isLoadingCurrentUser,
    isError: isErrorFetchingCurrentUser,
    error,
  } = useQuery<Faculty>({
    queryKey: ["currentUser"],
    queryFn: async () => getCurrentUser(),
  });

  const form1 = useForm<z.infer<typeof addFirstGradeSchema>>({
    resolver: zodResolver(addFirstGradeSchema),
    defaultValues: {
      studentId: initialValue?.studentProfile.id ?? "",
      section: initialValue?.studentProfile?.sectionId ?? "",
      subjectId: "",
      firstQuarter: undefined,
    },
  });

  const form2 = useForm<z.infer<typeof addSecondGradeSchema>>({
    resolver: zodResolver(addSecondGradeSchema),
    defaultValues: {
      studentId: initialValue?.studentProfile.id ?? "",
      section: initialValue?.studentProfile?.sectionId ?? "",
      subjectId: "",
      secondQuarter: undefined,
    },
  });

  const { mutate: addFirstGrade, isPending: isLoadingSubmit1 } = useMutation({
    mutationFn: (grade: AddFirstGrade) => {
      return axios.post(`/api/student/${id}/grades`, grade);
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
        description: "Grade added successfully!",
      });
      router.push("/faculty/grades");
      router.refresh();
    },
  });

  const { mutate: addSecondGrade, isPending: isLoadingSubmit2 } = useMutation({
    mutationFn: (grade: AddSecondGrade) => {
      return axios.post(`/api/student/${id}/grades`, grade);
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
        description: "Grade added successfully!",
      });
      router.push("/faculty/grades");
      router.refresh();
    },
  });

  const onSubmit1 = (data1: z.infer<typeof addFirstGradeSchema>) => {
    addFirstGrade(data1);
    setIsFirstFormSubmitted(true);
  };

  const onSubmit2 = (data2: z.infer<typeof addSecondGradeSchema>) => {
    addSecondGrade(data2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Grades</CardTitle>
        <CardDescription>
          Add first and second quarter grades to student.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex w-full flex-col items-center justify-center gap-4">
        <Dialog>
          <Form {...form1}>
            <form
              onSubmit={form1.handleSubmit(onSubmit1)}
              className="w-full space-y-6"
            >
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Icons.PlusCircle className="mr-2" />
                  First Quarter Grade
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add First Quarter Grade</DialogTitle>
                  <DialogDescription>
                    Edit first quarter grade to student.
                  </DialogDescription>
                </DialogHeader>
                <FormField
                  control={form1.control}
                  name="subjectId"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel>Subject</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        defaultValue={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject option..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currentUser?.facultyProfile?.subjects?.map((sub) => (
                            <SelectItem key={sub.id} value={sub.id}>
                              {sub.subjectName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form1.control}
                  name="firstQuarter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Quarter</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
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
                    disabled={isLoadingSubmit1}
                    className="w-full"
                  >
                    {isLoadingSubmit1 ? (
                      <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}{" "}
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Form>
        </Dialog>
        <Dialog>
          <Form {...form2}>
            <form
              onSubmit={form2.handleSubmit(onSubmit2)}
              className="w-full space-y-6"
            >
              <DialogTrigger asChild>
                <Button disabled={!isFirstFormSubmitted} className="w-full">
                  <Icons.PlusCircle className="mr-2" />
                  Second Quarter Grade
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Second Quarter Grade</DialogTitle>
                  <DialogDescription>
                    Edit second quarter grade to student.
                  </DialogDescription>
                </DialogHeader>
                <FormField
                  control={form2.control}
                  name="subjectId"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel>Subject</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        defaultValue={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject option..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currentUser?.facultyProfile?.subjects?.map((sub) => (
                            <SelectItem key={sub.id} value={sub.id}>
                              {sub.subjectName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form2.control}
                  name="secondQuarter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Second Quarter</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
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
                    disabled={isLoadingSubmit2}
                    className="w-full"
                  >
                    {isLoadingSubmit2 ? (
                      <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}{" "}
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Form>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AddGradesForm;
