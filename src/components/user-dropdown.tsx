import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import SignoutModal from "@/components/auth/signout-modal";

export default async function UserAccountDrop() {
  const currentUser = await getCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
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
            {currentUser?.name && (
              <p className="font-medium">{currentUser.name}</p>
            )}
            {currentUser?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {currentUser.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/help">Help</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <SignoutModal className="w-full justify-start" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
