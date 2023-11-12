import { MobileStudentSide } from "@/components/sidebar/mobile-student-sidebar";
import UserAccountDrop from "@/components/user-dropdown";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function StudentNavbar() {
  return (
    <div className="flex items-center p-4">
      <MobileStudentSide />
      <div className="flex w-full items-center justify-end gap-2">
        <ThemeToggle />
        <UserAccountDrop />
      </div>
    </div>
  );
}
