"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { fetchUserById } from "@/hooks/getUsers";
import { User, userSchema } from "@/types";
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
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import UserInfoCard from "@/components/user-info-card";

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
        <div className="w-full justify-between space-x-4 p-4 md:flex">
          <UserInfoCard userInfo={userInfo} />
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
