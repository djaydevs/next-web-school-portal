"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { fetchUserById } from "@/hooks/getUsers";
import { User, userSchema } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/user-avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface ManageAccountIdPageProps {
  params: {
    id: string;
  };
}

const ManageAccountIdPage: FC<ManageAccountIdPageProps> = ({ params }) => {
  const { id } = params;

  const { data: userInfo, isLoading } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: async () => fetchUserById(id),
  });

  // const handleRoleChange: SubmitHandler<FormInputPost> = async (data) => {
  // TODO: handle role change in this section
  // }
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });

  function onSubmit(data: z.infer<typeof userSchema>) {
    console.log(data);
  }

  return (
    <>
      <h2 className="px-4 text-2xl font-bold tracking-tight">
        Manage Account Details
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex w-full justify-between space-x-4 p-4">
          <Card className="my-auto w-2/4">
            <CardHeader className="space-y-4">
              <UserAvatar
                user={{
                  name: userInfo?.name || null,
                  image: userInfo?.image || null,
                }}
                className="mx-auto my-2 h-28 w-28"
              />
              <div className="flex flex-nowrap items-center justify-between">
                <CardTitle>{userInfo?.name}</CardTitle>
                {userInfo?.isVerified === true ? (
                  <Badge variant="secondary">Verified</Badge>
                ) : (
                  <Badge variant="destructive">Not verified</Badge>
                )}
              </div>
              <Badge variant="outline" className="my-2 p-2">
                <p className="mx-auto">{userInfo?.role.toUpperCase()}</p>
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-nowrap items-center justify-between">
                  <Label>Email:</Label>
                  <Label>{userInfo?.email}</Label>
                </div>
                <div className="flex flex-nowrap items-center justify-between">
                  <Label>Email Verified:</Label>
                  <Label>{userInfo?.emailVerified}</Label>
                </div>
                <div className="flex flex-nowrap items-center justify-between">
                  <Label>Created:</Label>
                  <Label>{userInfo?.createdAt}</Label>
                </div>
                <div className="flex flex-nowrap items-center justify-between">
                  <Label>Updated:</Label>
                  <Label>{userInfo?.updatedAt}</Label>
                </div>
              </div>
              {userInfo?.role === "student" ? (
                <Link
                  href={`/admin/student-record`}
                  aria-label="Manage account details"
                  className={cn(
                    buttonVariants({
                      variant: "secondary",
                      size: "sm",
                    }),
                    "w-full",
                  )}
                >
                  Student Record
                </Link>
              ) : null}
            </CardContent>
          </Card>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option to change role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="faculty">Faculty</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
};

export default ManageAccountIdPage;
