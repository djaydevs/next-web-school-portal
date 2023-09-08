import { MobileFacultySide } from "@/components/sidebar/MobileFacultySide";
import UserAccountDrop from "@/components/user-dropdown";

export default function FacultyNavbar() {
  return (
    <div className="flex items-center p-4">
      <MobileFacultySide />
      <div className="flex items-center w-full justify-end">
        <UserAccountDrop />
      </div>
    </div>
  );
}
