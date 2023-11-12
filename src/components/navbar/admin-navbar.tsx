import { MobileAdminSide } from "@/components/sidebar/mobile-admin-sidebar";
import UserAccountDrop from "@/components/user-dropdown";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function AdminNavbar() {
  return (
    <div className="flex items-center p-4">
      <MobileAdminSide />
      <div className="flex w-full items-center justify-end gap-2">
        <ThemeToggle />
        <UserAccountDrop />
      </div>
    </div>
  );
}
