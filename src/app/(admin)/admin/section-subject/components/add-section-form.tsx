"use client";

import { FC } from "react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GradeSection, gradeSectionSchema } from "@/types";
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

interface AddSectionFormProps {
  onSubmit: SubmitHandler<GradeSection>;
  isLoadingSubmit: boolean;
}

const AddSectionForm: FC<AddSectionFormProps> = ({
  onSubmit,
  isLoadingSubmit,
}) => {
  const form = useForm<z.infer<typeof gradeSectionSchema>>({
    resolver: zodResolver(gradeSectionSchema),
    defaultValues: {
      gradeLevel: 11,
      strandCode: "",
      strandName: "",
      sectionName: "",
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Section</CardTitle>
        <CardDescription>
          Add section including grade level, strand code, and strand name.
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
              name="gradeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="strandCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Strand Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ABM, HUMSS, STEM, etc."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="strandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Strand Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Accountancy and Business Management"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sectionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between gap-4">
            <Button variant="outline" className="w-full">
              View Section
            </Button>
            <Button type="submit" disabled={isLoadingSubmit} className="w-full">
              {isLoadingSubmit ? (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}{" "}
              Add
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AddSectionForm;
