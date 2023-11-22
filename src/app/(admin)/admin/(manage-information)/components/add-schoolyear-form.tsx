"use client";

import * as React from "react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { SchoolYear, schoolYearSchema } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

interface AddSchoolYearFormProps {}

const AddSchoolYearForm: React.FC<AddSchoolYearFormProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SchoolYear>({
    resolver: zodResolver(schoolYearSchema),
    defaultValues: {
      id: "",
      schoolYear: {
        from: new Date(),
        to: new Date(),
      },
      semester: 1,
    },
  });

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const { mutate: addSchoolYear, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (newSchoolYear: SchoolYear) => {
      return axios.post("/api/school-year", newSchoolYear);
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
        description: "School year added successfully!",
      });
      router.push("/admin/school-year");
      router.refresh();
    },
  });

  const onSubmit = (data: z.infer<typeof schoolYearSchema>) => {
    addSchoolYear(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Icons.PlusCircle className="mr-2" />
          Add School Year
        </Button>
      </DialogTrigger>
      <DialogContent className="absolute top-48 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New School Year</DialogTitle>
          <DialogDescription>
            Add new school year and semester.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div className="flex w-full flex-col space-y-2">
            <Label>School Year</Label>
            <Controller
              control={control}
              name="schoolYear"
              render={({ field: { onChange, value } }) => (
                <DateRangePicker
                  onUpdate={(values) => {
                    if (values) {
                      const from = values.from || new Date();
                      const to = values.to || new Date();
                      setDate({ from, to });
                      onChange({ from, to });
                    } else {
                      const defaultDate = { from: new Date(), to: new Date() };
                      setDate(defaultDate);
                      onChange(defaultDate);
                    }
                  }}
                  initialDateFrom={value?.from}
                  initialDateTo={value?.to}
                  align="start"
                  locale="en-GB"
                  showCompare={false}
                />
              )}
            />
          </div>
          <div className="flex w-full flex-col space-y-2">
            <Label>Semester</Label>
            <div className="mt-2">
              <Controller
                control={control}
                name="semester"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value ? String(field.value) : undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sex option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Semester</SelectItem>
                      <SelectItem value="2">2nd Semester</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.semester?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.semester.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="flex justify-between gap-4">
            <Button type="submit" disabled={isLoadingSubmit} className="w-full">
              {isLoadingSubmit ? (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}{" "}
              Add School Year
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSchoolYearForm;
