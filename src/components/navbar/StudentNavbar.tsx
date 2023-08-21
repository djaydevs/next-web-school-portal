import { MobileStudentSide } from "@/components/sidebar/MobileStudentSide";

const StudentNavbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobileStudentSide />
      {/* <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div> */}
    </div>
  );
};

export default StudentNavbar;
