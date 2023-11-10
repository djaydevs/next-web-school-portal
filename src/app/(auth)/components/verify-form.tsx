import { FC } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";

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
import { Verify, verifySchema } from "@/types";

interface VerifyFormProps {
  params: {
    id: string;
  };
}

const VerifyForm: FC<VerifyFormProps> = ({ params }) => {
  const { id } = params;
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      inputNumber: "",
    },
  });

  const { mutate: verifyUser, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (verify: Verify) => {
      return axios.post(`/api/verify/${id}`, verify);
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
        description: "User verified successfully!",
      });
      signIn("google");
    },
  });

  const onSubmit = (verifyInfo: z.infer<typeof verifySchema>) => {
    verifyUser(verifyInfo);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify your account</CardTitle>
        <CardDescription>
          If you&apos;re an existing student or faculty member, please verify
          your account by entering your student (LRN) or faculty ID number.
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
              name="inputNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student or Faculty Number</FormLabel>
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
            />
          </CardContent>
          <CardFooter className="flex w-full justify-end">
            <Button type="submit" disabled={isLoadingSubmit}>
              {isLoadingSubmit ? (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}{" "}
              Verify
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default VerifyForm;
