import { MobileAdminSide } from "@/components/sidebar/MobileAdminSide";

const AdminNavbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobileAdminSide />
      {/* <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div> */}
    </div>
  );
};

export default AdminNavbar;
