import { MobileAdminSide } from "@/components/sidebar/MobileAdminSide";
import UserAccountDrop from "@/components/user-dropdown";

export default function AdminNavbar() {
  return (
    <div className="flex items-center p-4">
      <MobileAdminSide />
      <div className="flex items-center w-full justify-end">
        <UserAccountDrop />
      </div>
    </div>
  );
}
