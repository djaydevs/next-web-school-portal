import { MobileStudentSide } from "@/components/sidebar/mobile-student-sidebar";
import UserAccountDrop from "@/components/user-dropdown";

export default function StudentNavbar() {
  return (
    <div className="flex items-center p-4">
      <MobileStudentSide />
      <div className="flex items-center w-full justify-end">
        <UserAccountDrop />
      </div>
    </div>
  );
}
