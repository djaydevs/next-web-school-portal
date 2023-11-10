"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icons from "@/components/ui/icons";
import { UserAvatar } from "@/components/user-avatar";
import { getCurrentUser } from "@/hooks/getUsers";
import SignoutModal from "@/components/signout-modal";
import { User } from "@/types";

export default function UserAccountDrop() {
  const router = useRouter();

  const {
    data: currentUser,
    isPending: isLoadingCurrentUser,
    isError: isErrorFetchingCurrentUser,
    error,
  } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: async () => getCurrentUser(),
  });

  const handleProfileRedirect = () => {
    if (currentUser?.role === "admin") {
      router.push(`/admin/profile`);
    }
    if (currentUser?.role === "faculty") {
      router.push(`/faculty/profile`);
    }
    if (currentUser?.role === "student") {
      router.push(`/student/profile`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger title="Account" aria-label="Account">
        <UserAvatar
          user={{
            name: currentUser?.name || null,
            image: currentUser?.image || null,
          }}
          className="h-10 w-10"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {currentUser?.name ? (
              <p className="font-medium">{currentUser.name}</p>
            ) : null}
            {currentUser?.email ? (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {currentUser.email}
              </p>
            ) : null}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleProfileRedirect}
          className="cursor-pointer"
        >
          <Icons.UserSquare2 className="mr-2 h-4 w-4" />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/help">
            <Icons.HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings">
            <Icons.Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <SignoutModal className="w-full justify-start" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
