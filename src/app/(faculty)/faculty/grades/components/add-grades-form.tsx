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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { AddGrade, Strand, Student, addGradeSchema } from "@/types";
import { fetchStrands } from "@/hooks/getInfos";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";

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

  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(
    undefined,
  );

  const subject = initialValue?.studentProfile?.strand?.subjects?.find(
    (sub) => sub.id === selectedSubject,
  );

  const form = useForm<z.infer<typeof addGradeSchema>>({
    resolver: zodResolver(addGradeSchema),
    defaultValues: {
      studentId: initialValue?.studentProfile.id ?? "",
      section: initialValue?.studentProfile?.sectionId ?? "",
      subjectId: "",
      grades: {
        firstQuarter: undefined,
        secondQuarter: undefined,
      },
    },
  });

  const { mutate: addGrade, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (grade: AddGrade) => {
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
        description: "Strand added successfully!",
      });
      router.push("/faculty/grades");
      router.refresh();
    },
  });

  const onSubmit = (data: z.infer<typeof addGradeSchema>) => {
    addGrade(data);
    console.log(data);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Grade</CardTitle>
        <CardDescription>Add grades to student.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <CardContent>
            <FormField
              control={form.control}
              name="subjectId"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Subject</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedSubject(value);
                    }}
                    defaultValue={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject option..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {initialValue?.studentProfile?.strand?.subjects?.map(
                        (sub) => (
                          <SelectItem key={sub.id} value={sub.id}>
                            {sub.subjectName}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grades.firstQuarter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Quarter</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues("grades.firstQuarter") ? (
              <FormField
                control={form.control}
                name="grades.secondQuarter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Second Quarter</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
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

export default AddGradesForm;
