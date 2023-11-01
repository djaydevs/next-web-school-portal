import { FC } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isValid } from "date-fns";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { SchoolYear, schoolYearSchema } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface AddSchoolYearFormProps {}

const AddSchoolYearForm: FC<AddSchoolYearFormProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schoolYearSchema>>({
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

  const { mutate: addSchoolYear, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (newSchoolYear: SchoolYear) => {
      return axios.post("/api/school-year", newSchoolYear);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          toast({
            title: "Error",
            description: "Something went wrong! Please try again later.",
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
      router.push("/admin/section-subject");
      router.refresh();
    },
  });

  const onSubmit = (data: z.infer<typeof schoolYearSchema>) => {
    addSchoolYear(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-[200px]">
          <Icons.PlusCircle className="mr-2" />
          Add School Year
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New School Year</DialogTitle>
          <DialogDescription>
            Add new school year and semester.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="schoolYear"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col space-y-2">
                  <FormLabel>School Year</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <Icons.CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                          {field.value &&
                          typeof field.value === "object" &&
                          "from" in field.value &&
                          typeof field.value === "object" &&
                          "to" in field.value &&
                          isValid((field.value as { from: Date }).from) &&
                          isValid((field.value as { to: Date }).to) ? (
                            `${format(
                              field.value.from as Date,
                              "LLL dd, y",
                            )} - ${format(field.value.to as Date, "LLL dd, y")}`
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={
                          field.value instanceof Date
                            ? {
                                from: field.value.from,
                                to: field.value.to,
                              }
                            : field.value
                        }
                        onSelect={field.onChange}
                        numberOfMonths={2}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col space-y-2">
                  <FormLabel>Semester</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value ? String(field.value) : undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1st Semester</SelectItem>
                      <SelectItem value="2">2nd Semester</SelectItem>
                    </SelectContent>
                  </Select>
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
                Add School Year
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSchoolYearForm;
