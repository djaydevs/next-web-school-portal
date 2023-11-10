import { FC } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { User } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/user-avatar";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserInfoCardProps {
  userInfo?: User;
}

const UserInfoCard: FC<UserInfoCardProps> = ({ userInfo }) => {
  return (
    <Card className="my-auto w-full md:w-2/4">
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
            <Label>
              {new Date(userInfo?.emailVerified as string).toLocaleDateString()}
            </Label>
          </div>
          <div className="flex flex-nowrap items-center justify-between">
            <Label>Created:</Label>
            <Label>
              {new Date(userInfo?.createdAt as string).toLocaleDateString()}
            </Label>
          </div>
          <div className="flex flex-nowrap items-center justify-between">
            <Label>Updated:</Label>
            <Label>
              {new Date(userInfo?.updatedAt as string).toLocaleDateString()}
            </Label>
          </div>
        </div>
        {userInfo?.role === "student" ? (
          <Link
            href={`/admin/student-record/${userInfo?.id}`}
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
        {userInfo?.role === "faculty" ? (
          <Link
            href={`/admin/faculty-record/${userInfo?.id}`}
            aria-label="Manage account details"
            className={cn(
              buttonVariants({
                variant: "secondary",
                size: "sm",
              }),
              "w-full",
            )}
          >
            Faculty Record
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
