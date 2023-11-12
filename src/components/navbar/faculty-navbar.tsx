import { MobileFacultySide } from "@/components/sidebar/mobile-faculty-sidebar";
import UserAccountDrop from "@/components/user-dropdown";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function FacultyNavbar() {
  return (
    <div className="flex items-center p-4">
      <MobileFacultySide />
      <div className="flex w-full items-center justify-end gap-2">
        <ThemeToggle />
        <UserAccountDrop />
      </div>
    </div>
  );
}
