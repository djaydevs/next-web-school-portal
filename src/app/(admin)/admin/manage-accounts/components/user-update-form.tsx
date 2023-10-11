import { FC } from "react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import Icons from "@/components/ui/icons";

interface UserUpdateFormProps {
  onSubmit: SubmitHandler<User>;
  isEditing: boolean;
  isLoadingSubmit: boolean;
  initialValue?: User;
}

const UserUpdateForm: FC<UserUpdateFormProps> = ({
  onSubmit,
  isEditing,
  isLoadingSubmit,
  initialValue,
}) => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: initialValue,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Change Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <Button type="submit" disabled={!isEditing}>
          {isLoadingSubmit ? (
            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : null}{" "}
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default UserUpdateForm;
