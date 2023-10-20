"use client";

import { FC, useState } from "react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Subject, subjectSchema } from "@/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStrandName } from "@/lib/options";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AddSubjectFormProps {
  onSubmit: SubmitHandler<Subject>;
  isLoadingSubmit: boolean;
}

const AddSubjectForm: FC<AddSubjectFormProps> = ({
  onSubmit,
  isLoadingSubmit,
}) => {
  const [strandName, setStrandName] = useState("");

  const form = useForm<z.infer<typeof subjectSchema>>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      subjectCode: "",
      subjectName: "",
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Subject</CardTitle>
        <CardDescription>Add subjects</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="strandCode"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Strand</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setStrandName(getStrandName(value)); // set the strandName based on the selected strandCode
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select strand option..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="abm">ABM</SelectItem>
                      <SelectItem value="stem">STEM</SelectItem>
                      <SelectItem value="humss">HUMSS</SelectItem>
                      <SelectItem value="gas">GAS</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Label className="mb-4">Add subject to {strandName}.</Label>
            <Separator />
            <FormField
              control={form.control}
              name="subjectCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Code</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
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
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between gap-4">
            <Button variant="outline" className="w-full">
              View Subject
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

export default AddSubjectForm;
