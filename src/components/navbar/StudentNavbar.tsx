import type { User } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MobileStudentSide } from "@/components/sidebar/MobileStudentSide";

type Props = {
  user: User;
};

export default async function StudentNavbar({ user }: Props) {
  return (
    <div className="flex items-center p-4">
      <MobileStudentSide />
      <div className="flex items-center w-full justify-end">
        <h3 className="me-2">{user?.name}</h3>
        {user?.image ? (
          <Avatar>
            <AvatarImage src={user?.image} alt="avatar image" />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
        ) : null}
        {/* <UserButton afterSignOutUrl="/" /> */}
      </div>
    </div>
  );
}
