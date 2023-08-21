import { MobileFacultySide } from "@/components/sidebar/MobileFacultySide";

const FacultyNavbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobileFacultySide />
      {/* <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div> */}
    </div>
  );
};

export default FacultyNavbar;
