"use client";

import { FC } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { statuses, roles } from "@/lib/options";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { User, userSchema } from "@/types";

interface InviteNewAccountProps {
  onSubmit: SubmitHandler<User>;
  isLoadingSubmit: boolean;
  isEditing: boolean;
}

const InviteNewAccount: FC<InviteNewAccountProps> = ({
  onSubmit,
  isLoadingSubmit,
  isEditing,
}) => {
    const form = useForm<User>({
      resolver: zodResolver(userSchema),
  });

//  async function onSubmit(values: z.infer<typeof userSchema>) {

//  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-[200px]">
          <Icons.UserPlus2 className="mr-2" />
          Invite New Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite New Acount</DialogTitle>
          <DialogDescription>
            Add new user by inviting them with invitation link.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="some@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Choose a role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="STUDENT" />
                        </FormControl>
                        <FormLabel className="font-normal">student</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="FACULTY" />
                        </FormControl>
                        <FormLabel className="font-normal">faculty</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="ADMIN" />
                        </FormControl>
                        <FormLabel className="font-normal">admin</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Invite</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteNewAccount;
