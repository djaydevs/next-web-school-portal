import { getServerSession } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MobileAdminSide } from "@/components/sidebar/MobileAdminSide";
import { authOptions } from "@/lib/auth";

export default async function AdminNavbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center p-4">
      <MobileAdminSide />
      <div className="flex items-center w-full justify-end">
        <h3 className="me-2">{session?.user?.name}</h3>
        <Avatar>
          <AvatarImage src={session?.user?.image} alt="avatar image" />
          <AvatarFallback>{session?.user?.name}</AvatarFallback>
        </Avatar>
        {/* <UserButton afterSignOutUrl="/" /> */}
      </div>
    </div>
  );
}
