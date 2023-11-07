import { FC } from "react";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Section } from "@prisma/client";
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
import { Faculty, facultySchema } from "@/types";
import { fetchSections } from "@/hooks/getInfos";

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

  const form = useForm<z.infer<typeof facultySchema>>({
    resolver: zodResolver(facultySchema),
    defaultValues: initialValue,
  });

  const { mutate: updateFaculty, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (update: Faculty) => {
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

  const onSubmit = (updateInfo: z.infer<typeof facultySchema>) => {
    console.log("Submitting form with data:", updateInfo);
    updateFaculty(updateInfo);
  };

  if (isErrorFetchingSections) {
    return <span>Error: {sectionsError.message}</span>;
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
          <CardContent>
            {/* <FormField
              control={form.control}
              name="facultyProfile.lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={field.value ?? ""}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="facultyProfile.section"
              render={() => (
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
                        <FormField
                          key={section.id}
                          control={form.control}
                          name="facultyProfile.section"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={section.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value
                                      ?.map((section) => section.id)
                                      .includes(section.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            section,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value.id !== section.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {section.sectionName}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
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
