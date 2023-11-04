import { FC } from "react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Faculty, facultySchema } from "@/types";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchSections } from "@/hooks/getInfos";
import { Section } from "@prisma/client";

interface FacultyAssignFormProps {
  onSubmit: SubmitHandler<Faculty>;
  isLoadingSubmit: boolean;
  initialValue?: Faculty;
}

const FacultyAssignForm: FC<FacultyAssignFormProps> = ({
  onSubmit,
  isLoadingSubmit,
  initialValue,
}) => {
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
                  {sections?.map((section) => (
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
                                    ? field.onChange([...field.value, section])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value.id !== section.id,
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
