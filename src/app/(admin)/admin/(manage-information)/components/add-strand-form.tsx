import { FC } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/components/ui/use-toast";
import { Strand, strandSchema } from "@/types";
import { GradeLevel } from "@prisma/client";
import { fetchGradeLevel } from "@/hooks/getInfos";

interface AddStrandFormProps {}

const AddStrandForm: FC<AddStrandFormProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    data: gradeLevels,
    isPending: isLoadingGradeLevels,
    isError: isErrorFetchingGradeLevels,
    error: gradeLevelsError,
  } = useQuery<GradeLevel[]>({
    queryKey: ["gradeLevel"],
    queryFn: async () => fetchGradeLevel(),
  });

  const form = useForm<z.infer<typeof strandSchema>>({
    resolver: zodResolver(strandSchema),
    defaultValues: {
      id: "",
      gradeLevelId: "",
      strandCode: "",
      strandName: "",
      subjects: [],
    },
  });

  const { mutate: addStrand, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (newStrand: Strand) => {
      return axios.post("/api/strand", newStrand);
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
      router.push("/admin/section-subject");
      router.refresh();
    },
  });

  const onSubmit = (data: z.infer<typeof strandSchema>) => {
    addStrand(data);
  };

  if (isErrorFetchingGradeLevels) {
    return <span>Error: {gradeLevelsError.message}</span>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Icons.PlusCircle className="mr-2" />
          Add Strand
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Strand</DialogTitle>
          <DialogDescription>Add new strand.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="strandCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Strand Code</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="ABM"
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
              name="strandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Strand Name</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Accountancy and Business Management"
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
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoadingSubmit}
                className="w-full"
              >
                {isLoadingSubmit ? (
                  <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : null}{" "}
                Add Strand
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStrandForm;
